# Vision WRLD

Marketing site for Vision WRLD, a web design and development studio. Plain HTML, CSS, and JavaScript (no build step), with a single-page client-side router, a custom-quote scope estimator, a blog, a Web3Forms-powered contact form, and **ATLAS**, an AI business assistant backed by Google Gemini through a Cloudflare Pages Function.

## Project structure

```
index.html              Markup for every page (home, services, blog, post, contact)
style.css               Legacy base styles
site.css                Site-wide styling (pages, components, ATLAS widget)
hero.css                Cinematic hero module
site.js                 Router, content, contact form, ATLAS widget
hero.js                 Hero terminal, parallax, background video
functions/api/atlas.js  Cloudflare Pages Function: ATLAS -> Gemini proxy (key stays server-side)
```

## Local preview

It's a static site, so any static server works:

```bash
npx serve .
```

To exercise the ATLAS function locally (needs the Gemini key), use Wrangler:

```bash
echo "GEMINI_API_KEY=your_key_here" > .dev.vars   # git-ignored
npx wrangler pages dev .
```

Without a running function, ATLAS falls back to built-in pattern-based replies.

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub and connect it as a Cloudflare Pages project (framework preset: **None**, build command: none, output directory: `/`).
2. Get a free key from Google AI Studio.
3. In the Pages project: **Settings -> Variables and Secrets -> Add -> Secret**, name `GEMINI_API_KEY`, paste the key, save, then redeploy.
4. `functions/api/atlas.js` is picked up automatically and served at `/api/atlas`.

The Gemini key is read only inside the Cloudflare Function via `env.GEMINI_API_KEY`. It is never in the frontend, never logged, and `.env` / `.dev.vars` are git-ignored.

## Contact form

Submissions POST to Web3Forms. The `access_key` in `site.js` is a public submit key (safe to expose); replace it with your own from web3forms.com.
