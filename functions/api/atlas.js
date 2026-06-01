/* ============================================================
   Cloudflare Pages Function  ->  route: /api/atlas
   Powers ATLAS with Cloudflare Workers AI (built-in, free tier).
   No external API key: it uses the bound `AI` resource on your
   own Cloudflare account (Pages -> Settings -> Functions ->
   Bindings -> Workers AI -> Variable name: AI).
   ============================================================ */

const MODEL = '@cf/meta/llama-3.1-8b-instruct';

// ---- abuse protection ----
const RATE_LIMIT = 15;          // requests...
const WINDOW_MS = 60_000;       // ...per IP per minute (best-effort, per isolate)
const MAX_MSG_CHARS = 2000;     // per message
const MAX_TOTAL_CHARS = 12000;  // whole conversation
const MAX_MESSAGES = 20;        // history depth
const HITS = new Map();

// Only your own site may use this endpoint from a browser.
function isAllowedOrigin(origin) {
  if (!origin) return true;     // same-origin / non-browser; still rate-limited
  try {
    const h = new URL(origin).hostname;
    return h === 'visionwrld.com' || h === 'www.visionwrld.com' || h.endsWith('.pages.dev');
  } catch { return false; }
}

function corsHeaders(origin) {
  const h = {
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
  };
  if (origin && isAllowedOrigin(origin)) h['Access-Control-Allow-Origin'] = origin;
  return h;
}
function json(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff', ...corsHeaders(origin) },
  });
}

export async function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('Origin')) });
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin');
  try {
    // block browsers on other sites from calling this (would spend your AI quota)
    if (origin && !isAllowedOrigin(origin)) {
      return json({ error: 'Forbidden.' }, 403, origin);
    }
    if (!env.AI) {
      return json({ error: 'ATLAS is not configured.' }, 500, origin); // frontend falls back to canned
    }

    // rate limit per IP
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    if (HITS.size > 5000) HITS.clear(); // crude memory guard
    const recent = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= RATE_LIMIT) {
      return json({ error: 'You are sending messages too quickly. Please wait a moment.' }, 429, origin);
    }
    recent.push(now);
    HITS.set(ip, recent);

    // reject oversized bodies early
    const len = +request.headers.get('Content-Length') || 0;
    if (len > 64_000) return json({ error: 'Message too large.' }, 413, origin);

    const body = await request.json().catch(() => ({}));
    const system = typeof body.system === 'string' ? body.system.slice(0, 6000) : '';
    const incoming = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : [];
    if (!incoming.length) return json({ error: 'No message to send.' }, 400, origin);

    // sanitize + bound the conversation
    let total = 0;
    const history = [];
    for (const m of incoming) {
      if (!m || typeof m.content !== 'string') continue;
      const content = m.content.trim();
      if (!content) continue;
      if (content.length > MAX_MSG_CHARS) return json({ error: 'Message too long.' }, 400, origin);
      total += content.length;
      if (total > MAX_TOTAL_CHARS) break;
      history.push({ role: m.role === 'assistant' || m.role === 'model' ? 'assistant' : 'user', content });
    }
    if (!history.length) return json({ error: 'No message to send.' }, 400, origin);

    const dateLine = 'Current date and time for reference: ' + new Date().toUTCString();
    const messages = [{ role: 'system', content: (system ? system + '\n\n' : '') + dateLine }, ...history];

    const out = await env.AI.run(MODEL, { messages, max_tokens: 300, temperature: 0.5 });
    const reply = (out && (out.response || out.result || '')).toString().trim();
    if (!reply) return json({ error: 'No reply.' }, 502, origin);

    return json({ reply }, 200, origin);
  } catch (err) {
    // never leak internals
    return json({ error: 'ATLAS is unavailable right now.' }, 500, origin);
  }
}
