/* ============================================================
   Cloudflare Pages Function  ->  route: /api/atlas
   Powers ATLAS with Cloudflare Workers AI (built-in, free tier).
   No external API key: it uses the bound `AI` resource on your
   own Cloudflare account. Add the binding in the dashboard:
   Pages project -> Settings -> Functions -> Bindings ->
   Add -> Workers AI -> Variable name: AI
   ============================================================ */

// Model. 8B is fast and easy on the free daily allowance.
// For higher-quality answers, swap to '@cf/meta/llama-3.3-70b-instruct-fp8-fast'
// (better, but uses more of the free Neurons per day).
const MODEL = '@cf/meta/llama-3.1-8b-instruct';

// --- simple per-IP rate limit (best-effort, in-memory per worker isolate) ---
const RATE_LIMIT = 20;
const WINDOW_MS = 60_000;
const HITS = new Map();

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
  };
}
function jsonResponse(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

export async function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('Origin')) });
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin');
  try {
    if (!env.AI) {
      // binding not added yet -> frontend falls back to the canned engine
      return jsonResponse({ error: 'Workers AI binding (AI) is not configured.' }, 500, origin);
    }

    // ---- rate limit ----
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    const recent = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= RATE_LIMIT) {
      return jsonResponse({ error: 'You are sending messages too quickly. Please wait a moment.' }, 429, origin);
    }
    recent.push(now);
    HITS.set(ip, recent);

    // ---- read frontend payload ----
    const body = await request.json().catch(() => ({}));
    const system = typeof body.system === 'string' ? body.system : '';
    const incoming = Array.isArray(body.messages) ? body.messages : [];
    if (!incoming.length) return jsonResponse({ error: 'No message to send.' }, 400, origin);

    // ---- build the chat messages: system + full history ----
    const dateLine = 'Current date and time for reference: ' + new Date().toUTCString();
    const messages = [{ role: 'system', content: (system ? system + '\n\n' : '') + dateLine }];
    for (const m of incoming) {
      if (!m || typeof m.content !== 'string' || !m.content.trim()) continue;
      messages.push({
        role: m.role === 'assistant' || m.role === 'model' ? 'assistant' : 'user',
        content: m.content,
      });
    }
    // keep the prompt bounded (last ~16 turns)
    const trimmed = [messages[0], ...messages.slice(1).slice(-16)];

    // ---- run the model on Cloudflare Workers AI ----
    const out = await env.AI.run(MODEL, { messages: trimmed, max_tokens: 300, temperature: 0.5 });
    const reply = (out && (out.response || out.result || '')).toString().trim();
    if (!reply) return jsonResponse({ error: 'Empty reply from model.' }, 502, origin);

    return jsonResponse({ reply }, 200, origin);
  } catch (err) {
    return jsonResponse({ error: 'ATLAS model call failed.', detail: String(err && err.message || err).slice(0, 200) }, 500, origin);
  }
}
