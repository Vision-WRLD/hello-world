/* ============================================================
   Cloudflare Pages Function  ->  route: /api/atlas
   Proxies the ATLAS chatbot to Google Gemini.
   The API key NEVER reaches the browser: it is read from the
   GEMINI_API_KEY secret (set in the Cloudflare dashboard) and
   used only here, server-side. It is never logged or returned.
   ============================================================ */

// Current free-tier flash model. If Google retires it, change this one line
// (e.g. 'gemini-2.0-flash-001' or 'gemini-1.5-flash').
const MODEL = 'gemini-2.0-flash-lite';

// --- simple per-IP rate limit (best-effort, in-memory per worker isolate) ---
const RATE_LIMIT = 15;        // max requests...
const WINDOW_MS = 60_000;     // ...per IP per 60s
const HITS = new Map();       // ip -> [timestamps]

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

// CORS preflight
export async function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('Origin')) });
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin');
  try {
    if (!env.GEMINI_API_KEY) {
      return jsonResponse({ error: 'ATLAS is not configured yet (missing API key).' }, 500, origin);
    }

    // ---- rate limit ----
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    const recent = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= RATE_LIMIT) {
      return jsonResponse({ error: 'You are sending messages too quickly. Please wait a moment and try again.' }, 429, origin);
    }
    recent.push(now);
    HITS.set(ip, recent);

    // ---- read frontend payload ----
    const body = await request.json().catch(() => ({}));
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const system = typeof body.system === 'string' ? body.system : '';
    if (!messages.length) {
      return jsonResponse({ error: 'No message to send.' }, 400, origin);
    }

    // ---- map chat history -> Gemini "contents" (assistant -> model) ----
    const contents = messages
      .filter((m) => m && typeof m.content === 'string' && m.content.trim())
      .map((m) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

    // ---- inject current date/time into the system instruction (server-side) ----
    const dateLine = 'Current date and time for reference: ' + new Date().toUTCString();
    const systemText = (system ? system + '\n\n' : '') + dateLine;

    const geminiPayload = {
      contents,
      systemInstruction: { parts: [{ text: systemText }] },
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    };

    // ---- forward to Gemini (key only in the URL, server-side) ----
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`;
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload),
    });

    if (!upstream.ok) {
      // Google's error body never contains the key, but trim it just in case.
      const detail = (await upstream.text().catch(() => '')).slice(0, 300);
      return jsonResponse({ error: 'ATLAS upstream error.', status: upstream.status, detail }, 502, origin);
    }

    const data = await upstream.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim();

    if (!reply) {
      // e.g. safety block or empty candidate
      const reason = data?.promptFeedback?.blockReason || data?.candidates?.[0]?.finishReason || 'empty';
      return jsonResponse({ error: 'ATLAS had no reply.', reason }, 502, origin);
    }

    return jsonResponse({ reply }, 200, origin);
  } catch (err) {
    // never expose internals / the key
    return jsonResponse({ error: 'ATLAS proxy failed. Please try again.' }, 500, origin);
  }
}
