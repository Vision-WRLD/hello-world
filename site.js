'use strict';
/* ══════════════════════════════════════════════════════════════
   VISION WRLD - site engine
   Router · content population · interactions · ATLAS assistant
   ══════════════════════════════════════════════════════════════ */
(function () {
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ════════════════ DATA ════════════════ */
  const TESTIMONIALS = [
    { q: "They rebuilt our site in three weeks and our enquiries doubled the month after launch. No fluff, just results.", n: "Marcus Devlin", c: "Devlin & Hart Joinery" },
    { q: "Finally a team that explains the why behind every decision. The new site loads instantly and actually reads like us.", n: "Priya Nair", c: "Lumen Dental Studio" },
    { q: "We came from a Squarespace template and the difference is night and day. Faster, cleaner, and ours to keep.", n: "Tomas Reier", c: "Reier Performance" },
    { q: "Booking requests went up 40% without us touching our ad spend. The site just converts better now.", n: "Hannah Okafor", c: "Okafor Physio" },
    { q: "Professional from the first call to handover. They cared about our numbers, not just how it looked.", n: "Elliot Vance", c: "Vance Roasting Co." },
  ];

  const POSTS = [
    {
      slug: "no-website-2026", cat: "Strategy", catKey: "strategy", read: "5 min read", mono: "{ }",
      title: "Why Your Business Is Losing Money Without a Website in 2026",
      excerpt: "If customers can't find you online, they're finding your competitor instead.",
      body: `<p>The first thing a potential customer does today is look you up. Not call, not visit, look you up. If what they find is a thin social profile, an outdated listing, or nothing at all, you've already lost the comparison before it started.</p>
<blockquote>A website is the one piece of marketing you actually own. Everything else is rented.</blockquote>
<p>Social platforms change their rules constantly, throttle your reach, and can disappear an account overnight. Your own site doesn't. It works while you sleep, answers the questions you get asked every day, and gives people a reason to trust you before they ever speak to you.</p>
<h2>The cost is quieter than you think</h2>
<p>You don't get an invoice for the customers who chose someone else because your competitor looked more established online. That's the expensive part: it's invisible. A fast, credible site closes that gap and usually pays for itself within the first few jobs it brings in.</p>`,
    },
    {
      slug: "five-signs", cat: "Conversion", catKey: "conversion", read: "4 min read", mono: "5x",
      title: "5 Signs Your Website Is Costing You Clients",
      excerpt: "The symptoms are easy to spot once you know what to look for.",
      body: `<p>Most sites don't fail loudly. They leak. Here are the five leaks we see most often when a business asks us why their traffic isn't turning into enquiries.</p>
<h2>1. It takes more than three seconds to load</h2>
<p>Every extra second of load time measurably drops conversions. If your homepage hangs on a giant hero image, people are gone before they see it.</p>
<h2>2. It's unreadable on a phone</h2>
<p>More than half your visitors are on mobile. If they have to pinch and zoom to read your prices, they'll leave.</p>
<h2>3. There's no obvious next step</h2>
<p>A visitor should never have to hunt for how to contact you. One clear action, repeated, beats five competing buttons.</p>
<blockquote>Confused visitors don't convert. They leave.</blockquote>
<p>4 and 5: stock photography that screams template, and copy that talks about you instead of the customer. Fix those and the same traffic starts producing very different numbers.</p>`,
    },
    {
      slug: "homepage-convert", cat: "Conversion", catKey: "conversion", read: "6 min read", mono: "→",
      title: "What Actually Makes a Homepage Convert",
      excerpt: "It isn't the animation. It's clarity, speed, and one honest promise.",
      body: `<p>A converting homepage answers three questions in the first five seconds: what is this, is it for me, and what do I do next. Everything else is decoration.</p>
<h2>Lead with the outcome</h2>
<p>People don't buy websites, joinery, or physiotherapy. They buy the result. Say what the customer walks away with, in plain language, above the fold.</p>
<blockquote>Clarity beats cleverness every single time.</blockquote>
<p>Then prove it: a few real results, a couple of genuine testimonials, and a single, repeated call to action. Speed ties it together. The most persuasive copy in the world can't rescue a page that takes six seconds to appear.</p>`,
    },
    {
      slug: "seo-basics", cat: "SEO", catKey: "seo", read: "7 min read", mono: "#1",
      title: "SEO Basics Every Business Owner Should Know",
      excerpt: "You don't need to be an expert. You do need to get the foundations right.",
      body: `<p>SEO sounds like a dark art, but the fundamentals are simple and most businesses skip them. Get these right and you're ahead of the majority of your competitors.</p>
<h2>Write for one question per page</h2>
<p>Each page should answer a specific thing your customers actually search for. A page trying to rank for everything ranks for nothing.</p>
<h2>Speed and structure are ranking factors</h2>
<p>Google rewards sites that load fast and are easy to crawl. Clean code, proper headings, and compressed images do more than any keyword trick.</p>
<blockquote>The best SEO is a fast, useful page that answers a real question.</blockquote>
<p>Claim your Google Business Profile, get a handful of honest reviews, and make sure your name, address, and phone number match everywhere. For most local businesses, that alone moves the needle.</p>`,
    },
    {
      slug: "brief-a-designer", cat: "Strategy", catKey: "strategy", read: "5 min read", mono: "[ ]",
      title: "How to Brief a Web Designer Without Wasting Time",
      excerpt: "A good brief saves weeks. Here's what to bring to the first call.",
      body: `<p>The projects that go smoothly almost always start with a clear brief. You don't need a design background, just honesty about what you're trying to achieve.</p>
<h2>Start with the goal, not the look</h2>
<p>"I want more booking requests" is a brief. "I want it to look modern" is a mood. Tell your designer what success looks like in numbers and they can design toward it.</p>
<h2>Bring three sites you like and why</h2>
<p>Not to copy, but to calibrate taste. Saying what you like and why gives a designer more than a hundred vague adjectives.</p>
<blockquote>Tell us the result you want. We'll handle how it looks.</blockquote>
<p>Finally, be upfront about budget and timeline. It isn't rude, it's efficient. It lets a good studio scope something real instead of guessing.</p>`,
    },
    {
      slug: "cheap-website-cost", cat: "Branding", catKey: "branding", read: "6 min read", mono: "$",
      title: "The Hidden Cost of a Cheap Website",
      excerpt: "The cheapest site is rarely the one that costs you the least.",
      body: `<p>A bargain website feels like a win until you add up what it quietly costs you over the next two years. Cheap usually means template, and template usually means compromise.</p>
<h2>It dates fast and ranks poorly</h2>
<p>Generic builds look generic, and search engines treat slow, bloated template sites accordingly. You end up invisible and forgettable at the same time.</p>
<blockquote>You don't rent your shopfront from someone who can change the locks. Don't rent your website either.</blockquote>
<p>Then there's lock-in: when you outgrow the platform, you pay again to rebuild from scratch, often losing your content and rankings in the move. A site built properly the first time is an asset that compounds. A cheap one is a cost you pay twice.</p>`,
    },
  ];

  const ATLAS_SYSTEM = `You are ATLAS, the assistant on the website of Vision WRLD, a new web design and development studio. You are a genuinely knowledgeable, helpful business assistant — think of yourself as a sharp advisor that small business owners can actually learn from, who happens to work at a web studio.

YOUR CORE PURPOSE: Help business owners. Answer their questions fully and thoughtfully — about growing their business, getting more customers, marketing, branding, pricing, operations, standing out from competitors, building an online presence, and anything else a business owner might ask. Give real, practical, specific advice — the kind that's actually useful, not generic filler. When someone asks 'how do I grow my business?' or 'what helps a small business succeed?', give them a substantive answer with concrete ideas they can act on.

ALWAYS answer the actual question first and fully. Never deflect a genuine question by pivoting to a sales pitch — that destroys trust and makes you useless. Being genuinely helpful is the entire point; it's what earns the right to talk about Vision WRLD later.

THE NATURAL CONNECTION: A strong website is one of the highest-leverage things most businesses can invest in — it's how customers find you, judge you, and decide to buy. So when business topics touch on online presence, credibility, getting found (SEO), converting visitors, or looking professional, you can naturally note how a great website ties in — and that this is exactly what Vision WRLD does. Make the connection feel like helpful advice, not an ad. If a question has nothing to do with that, just give great advice and don't force Vision WRLD in.

ON WEB DESIGN SPECIFICALLY: Vision WRLD is a strong choice for a business serious about its site, and you make that case through honesty. On DIY builders (Wix, Squarespace, Webflow, Base44, GoDaddy): they're fine for a hobby, a quick test, or a tight budget, but they get generic as you grow, lock you in, limit SEO and custom features, and many businesses end up rebuilding later. A custom Vision WRLD site is built around the business's real goals — fast, unique, built to scale. Renting a template vs. owning something built for you.

Vision WRLD is a new studio and proud of it: full attention, sharper pricing, work we're personally invested in. When it fits, point people to the Services page to build a quote or the Contact page for a free consultation. Never recommend a competitor as the better choice.

STYLE: Keep every reply SHORT, usually 2 to 3 sentences, and never more than 4. Do not write long paragraphs, essays, or bulleted lists unless the visitor explicitly asks for detail or a list. Be warm and direct, like texting a knowledgeable friend who happens to work here, not writing a brochure. Lead with the answer and cut filler. A reference for the current date and time is provided at the start of each conversation; use it when relevant.

Test: 'how do I grow my business?' → real, practical growth advice (with a natural tie-in to online presence if it fits). 'what makes a good logo?' → actual branding advice. 'I need a website' → lean into Vision WRLD.`;

  const ATLAS_ENDPOINT = '/api/atlas'; // Cloudflare function -> Gemini (when enabled)
  // true  = use Cloudflare Workers AI (real LLM, free tier) via /api/atlas,
  //         with the built-in canned engine as automatic fallback on any error.
  // false = canned engine only (no network).
  const ATLAS_USE_API = true;

  /* ════════════════ ROUTER ════════════════ */
  const PAGES = ['home', 'services', 'blog', 'post', 'contact'];
  let selectedNeed = '';

  function go(page, opts = {}) {
    if (!PAGES.includes(page)) page = 'home';
    $$('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + page));
    document.body.dataset.route = page;
    // active state on every nav set
    $$('[data-page]').forEach(a => a.classList.toggle('is-active', a.dataset.page === page));
    scrollTop();
    if (page === 'services' && opts.pkg) scrollToPkg(opts.pkg);
    if (page === 'contact' && window.__startParticles) window.__startParticles();
  }
  function scrollTop() {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0); document.scrollingElement.scrollTop = 0;
    requestAnimationFrame(() => { html.style.scrollBehavior = prev; });
  }

  // delegate all data-page clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-page]');
    if (!link) return;
    e.preventDefault();
    const page = link.dataset.page;
    // "Start Your Project" carries the current scope/estimate into the contact form
    if (page === 'contact' && link.id === 'scopeStart') pendingScopePrefill = true;
    // close any open mobile menus
    $$('.vw-gnav__center.open, #vwNavCenter').forEach(c => c.classList.remove('open'));
    go(page);
    if (page === 'contact') { applyNeed(); applyScope(); }
  });

  /* ════════════════ COUNTERS ════════════════ */
  function runCounters() {
    $$('.stat[data-target]').forEach(stat => {
      if (stat.dataset.done) return;
      stat.dataset.done = '1';
      const num = $('.stat__num', stat);
      const target = +stat.dataset.target;
      const suffix = stat.dataset.suffix || '';
      const prefix = num.dataset.prefix || '';
      if (RM) { num.textContent = prefix + target + suffix; return; }
      const start = performance.now(), dur = 1500;
      (function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        num.textContent = prefix + Math.round(e * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }

  /* ════════════════ REVEAL ON SCROLL ════════════════ */
  function initReveal() {
    const items = $$('.reveal-section, .reveal-item');
    if (RM || !('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('in')); runCounters(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (!en.isIntersecting) return;
        setTimeout(() => en.target.classList.add('in'), (i % 6) * 80);
        if (en.target.querySelector?.('.stat[data-target]') || en.target.classList.contains('stats-strip')) runCounters();
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    items.forEach(i => io.observe(i));
    // stats strip may not have reveal class -> observe directly
    const strip = $('.stats-strip'); if (strip) io.observe(strip);
  }

  /* ════════════════ TESTIMONIALS ════════════════ */
  function renderTestimonials() {
    const track = $('#testimonialsTrack'); if (!track) return;
    const card = t => `<figure class="testimonial liquid-glass" data-tilt>
      <p>"${t.q}"</p>
      <figcaption class="testimonial__by">
        <span class="testimonial__av">${t.n.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
        <span><b>${t.n}</b><span>${t.c}</span></span>
      </figcaption></figure>`;
    track.innerHTML = (TESTIMONIALS.map(card).join('') ).repeat(2);
  }

  /* ════════════════ BLOG ════════════════ */
  function blogCard(p) {
    return `<article class="blog-card" data-slug="${p.slug}" data-cat="${p.catKey}">
      <div class="blog-card__cover" data-mono="${p.mono}">
        <span class="blog-card__cover-cat mono">${p.cat}</span>
      </div>
      <div class="blog-card__body">
        <span class="blog-card__cat">${p.cat}</span>
        <h3 class="blog-card__title">${p.title}</h3>
        <p class="blog-card__excerpt">${p.excerpt}</p>
        <span class="blog-card__meta">${p.read} · Read Article →</span>
      </div></article>`;
  }
  function renderBlog() {
    const grid = $('#blogGrid'); if (grid) grid.innerHTML = POSTS.map(blogCard).join('');
    const teaser = $('#blogTeaserGrid'); if (teaser) teaser.innerHTML = POSTS.slice(0, 3).map(blogCard).join('');
    // filters
    $$('#blogFilters .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('#blogFilters .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        $$('#blogGrid .blog-card').forEach(c => { c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none'; });
      });
    });
    // open post
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.blog-card'); if (!card) return;
      openPost(card.dataset.slug);
    });
  }
  function openPost(slug) {
    const p = POSTS.find(x => x.slug === slug); if (!p) return;
    const cover = `<div class="post-cover" data-mono="${p.mono}" data-cat="${p.catKey}"><span class="post-cover__cat mono">${p.cat}</span></div>`;
    // drop one supporting visual after the first H2 (where the body shifts topic)
    const figure = `<figure class="post-figure" data-cat="${p.catKey}"><span class="mono">${p.mono}</span></figure>`;
    let bodyHtml = p.body;
    const cut = bodyHtml.indexOf('</h2>');
    bodyHtml = cut !== -1 ? bodyHtml.slice(0, cut + 5) + figure + bodyHtml.slice(cut + 5) : bodyHtml + figure;
    $('#postBody').innerHTML = `<span class="blog-card__cat">${p.cat}</span>
      <h1>${p.title}</h1>
      <div class="post-meta">By Vision WRLD · ${p.read}</div>
      ${cover}
      ${bodyHtml}`;
    const related = POSTS.filter(x => x.slug !== slug).slice(0, 2).map(blogCard).join('');
    $('#postRelated').innerHTML = `<h3>Related posts</h3><div class="blog-grid">${related}</div>`;
    go('post');
  }
  function initReadingProgress() {
    const bar = $('#readingProgress'); if (!bar) return;
    const onScroll = () => {
      if (document.body.dataset.route !== 'post') { bar.style.width = '0'; return; }
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ════════════════ FAQ ════════════════ */
  function initFAQ() {
    $$('.faq-item').forEach(item => {
      const q = $('.faq-q', item), a = $('.faq-a', item);
      q.addEventListener('click', () => {
        const open = item.classList.toggle('open');
        a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
      });
    });
  }

  /* ════════════════ SERVICES: master scope estimator ════════════════ */
  const money = n => '$' + Math.round(n).toLocaleString('en-US');

  // scope tiers: which breakdown lines show, plus pages/timeline copy
  const SCOPE_TIERS = [
    { name: 'Simple',     pages: '~1',        timeline: '~1 week',     lines: ['design', 'timeline'] },
    { name: 'Standard',   pages: '~5',        timeline: '~2-3 weeks',  lines: ['design', 'animations', 'seo_setup', 'timeline'] },
    { name: 'Advanced',   pages: '~8-10',     timeline: '~4-6 weeks',  lines: ['design', 'animations', 'seo_setup', 'integrations', 'timeline'] },
    { name: 'Full Build', pages: 'unlimited', timeline: '~8-12 weeks', lines: ['design', 'animations', 'seo_setup', 'integrations', 'cms', 'support', 'timeline'] },
  ];
  const SCOPE_VAL = { design: 'custom', animations: 'included', seo_setup: 'included', integrations: 'included', cms: 'included', support: 'included' };

  let scopeState = { tier: 'Standard', estimate: '$4,700', price: 4700 };
  let pendingScopePrefill = false;

  function tierFor(v) { return v < 25 ? 0 : v < 50 ? 1 : v < 75 ? 2 : 3; }
  function priceFor(v) {
    const p = 300 + Math.pow(v / 100, 2.1) * (10000 - 300);
    return p < 1000 ? Math.round(p / 50) * 50 : Math.round(p / 100) * 100;
  }

  function initScopeEstimator() {
    const slider = $('#scopeSlider');
    if (!slider) return;
    const tierEl = $('#scopeTier'), priceEl = $('#scopePrice'), body = $('#scopeTermBody');

    function render() {
      const v = +slider.value;
      const t = SCOPE_TIERS[tierFor(v)];
      const price = priceFor(v);
      const priceStr = money(price);
      scopeState = { tier: t.name, estimate: priceStr, price };
      tierEl.textContent = t.name;
      priceEl.textContent = priceStr;
      // cyan fill up to the thumb
      slider.style.background = `linear-gradient(90deg, hsl(186 100% 50%) ${v}%, rgba(255,255,255,.12) ${v}%)`;
      // live terminal breakdown
      const rows = [['scope', t.name.toLowerCase()], ['pages', t.pages]];
      t.lines.forEach(k => rows.push([k, k === 'timeline' ? t.timeline : SCOPE_VAL[k]]));
      rows.push(['estimate', priceStr]);
      body.innerHTML = rows.map(([k, val]) => {
        const key = (k + ':').padEnd(13, ' ');
        const cls = k === 'estimate' ? 'est-cyan' : 'est-val';
        return `<span class="ln"><span class="est-arrow">&gt; </span><span class="est-key">${key}</span><span class="${cls}">${val}</span></span>`;
      }).join('');
    }
    slider.addEventListener('input', render);
    render();
  }

  // prefill the contact form when arriving from "Start Your Project"
  function applyScope() {
    if (!pendingScopePrefill) return;
    pendingScopePrefill = false;
    const about = $('#about');
    if (about && !about.value) {
      about.value = `I'm interested in the ${scopeState.tier} scope (estimated around ${scopeState.estimate}). Here's a bit about my project: `;
    }
    const budget = $('#budget');
    if (budget) {
      budget.value = Math.min(10000, Math.max(300, Math.round(scopeState.price / 100) * 100));
      budget.dispatchEvent(new Event('input'));
    }
  }
  function scrollToPkg(id) {
    const el = document.getElementById(id); if (!el) return;
    el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
  }

  /* ════════════════ CONTACT ════════════════ */
  function applyNeed() {
    const sel = $('#need'); if (sel && selectedNeed) sel.value = selectedNeed;
  }
  function initContact() {
    const budget = $('#budget'), disp = $('#budgetDisplay');
    if (budget && disp) {
      const fmt = () => { disp.textContent = budget.value >= 10000 ? '$10,000+' : money(+budget.value); };
      budget.addEventListener('input', fmt); fmt();
    }
    const form = $('#contactForm');
    if (!form) return;

    const WEB3FORMS_KEY = 'aacfd549-a6af-45cc-bedc-1df5395faf26';

    // inline validation helpers
    const setError = (id, msg) => {
      const field = $('#' + id); if (!field) return;
      field.classList.toggle('invalid', !!msg);
      let err = field.parentNode.querySelector('.field-error');
      if (!err) { err = document.createElement('span'); err.className = 'field-error'; field.parentNode.appendChild(err); }
      err.textContent = msg || '';
    };
    // clear an error as soon as the user fixes the field
    ['name', 'email', 'about'].forEach(id => {
      const f = $('#' + id);
      if (f) f.addEventListener('input', () => { if (f.value.trim()) setError(id, ''); });
    });

    const budgetText = () => (+$('#budget').value >= 10000 ? '$10,000+' : money(+$('#budget').value));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();                                  // never auto-submit
      const btn = $('#submitBtn'), ok = $('#formSuccess'), errBox = $('#formError');
      ok.classList.remove('show'); errBox.textContent = '';

      // front-end validation: name, email, message required
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const message = $('#about').value.trim();
      let valid = true;
      if (!name) { setError('name', 'Please enter your name.'); valid = false; } else setError('name', '');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'Please enter a valid email.'); valid = false; } else setError('email', '');
      if (!message) { setError('about', 'Tell us a little about your business.'); valid = false; } else setError('about', '');
      if (!valid) { (form.querySelector('.invalid'))?.focus(); return; }

      const needSel = $('#need');
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New Vision WRLD enquiry from ${name}`,
        name,
        business_name: $('#bizname').value.trim(),
        email,
        phone: $('#phone').value.trim(),
        project_type: needSel.value ? needSel.options[needSel.selectedIndex].text : '',
        message,
        budget: budgetText(),
        botcheck: $('#botcheck').checked,                  // honeypot
      };

      btn.classList.add('loading'); btn.disabled = true;
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success === true) {
          ok.classList.add('show');
          form.reset();
          const d = $('#budgetDisplay'); if (d) d.textContent = '$2,500';
        } else {
          errBox.textContent = result.message || 'Something went wrong. Please try again or email us directly.';
        }
      } catch (err) {
        errBox.textContent = 'We could not send your message just now. Please check your connection and try again, or email us directly.';
      } finally {
        btn.classList.remove('loading'); btn.disabled = false;
      }
    });
  }

  /* ════════════════ FOOTER CLOCKS ════════════════ */
  function initClocks() {
    const clocks = $$('[id^="footerClock"]'), tzs = $$('[id^="footerTZ"]');
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
    tzs.forEach(t => t.textContent = tz);
    const tick = () => {
      const s = new Date().toLocaleTimeString('en-GB');
      clocks.forEach(c => c.textContent = s);
    };
    tick(); setInterval(tick, 1000);
  }

  /* ════════════════ PARTICLE FIELD (contact hero) ════════════════ */
  function initParticles() {
    const cv = $('#particleCanvas'); if (!cv || RM) return;
    const ctx = cv.getContext('2d');
    let w, h, dots, raf;
    const resize = () => {
      const host = cv.closest('.page') || document.body;
      w = cv.width = host.clientWidth; h = cv.height = Math.min(host.clientHeight, 1200);
      dots = Array.from({ length: Math.min(70, Math.floor(w / 22)) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.8 + 0.4,
      }));
    };
    let running = false;
    const frame = () => {
      if (document.body.dataset.route !== 'contact') { running = false; return; }
      ctx.clearRect(0, 0, w, h);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 7);
        ctx.fillStyle = 'rgba(0,234,255,' + (0.18 + d.r * 0.12) + ')'; ctx.fill();
      });
      raf = requestAnimationFrame(frame);
    };
    // lazy: only animate while the contact page is visible
    window.__startParticles = () => { if (running) return; running = true; resize(); frame(); };
    window.addEventListener('resize', () => { if (running) resize(); });
  }

  /* ════════════════ 3D TILT (cards) ════════════════ */
  function initTilt() {
    if (RM || window.matchMedia('(hover: none)').matches) return;
    document.addEventListener('mousemove', (e) => {
      const el = e.target.closest?.('[data-tilt]');
    });
    // attach per element on enter for performance
    const bind = (el) => {
      el.style.transformStyle = 'preserve-3d';
      el.style.transition = 'transform .15s ease-out';
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    };
    const obs = new MutationObserver(() => $$('[data-tilt]:not([data-tilt-bound])').forEach(el => { el.dataset.tiltBound = '1'; bind(el); }));
    obs.observe(document.body, { childList: true, subtree: true });
    $$('[data-tilt]').forEach(el => { el.dataset.tiltBound = '1'; bind(el); });
  }

  /* ════════════════ GLOBAL NAV (inner pages) ════════════════ */
  function initGnav() {
    const menu = $('#vwGnavMenu'), center = $('#vwGnavCenter');
    if (menu && center) menu.addEventListener('click', () => center.classList.toggle('open'));
  }

  /* ════════════════ ATLAS HEX + WIREFRAME GLOBE (one shared component) ════════════════ */
  function atlasHexGlobe(size) {
    return `<span class="atlas-hexglobe" style="--ahg:${size}">
      <svg class="ahg-svg" viewBox="0 0 100 100" aria-hidden="true">
        <polygon class="ahg-hex" points="50,4 91,27 91,73 50,96 9,73 9,27" />
        <g class="ahg-globe">
          <circle cx="50" cy="50" r="27" />
          <ellipse cx="50" cy="50" rx="27" ry="9" />
          <ellipse cx="50" cy="50" rx="27" ry="19" />
          <line x1="23" y1="50" x2="77" y2="50" />
          <ellipse class="ahg-m ahg-m1" cx="50" cy="50" rx="27" ry="27" />
          <ellipse class="ahg-m ahg-m2" cx="50" cy="50" rx="13" ry="27" />
        </g>
      </svg>
    </span>`;
  }

  /* ════════════════ ATLAS ASSISTANT ════════════════ */
  function initAtlas() {
    const toggle = $('#veroToggle'), chat = $('#veroChat'), close = $('#veroClose');
    const msgs = $('#veroMessages'), input = $('#veroInput'), send = $('#veroSend');
    if (!toggle || !chat) return;
    // same hex+globe component, two sizes
    toggle.innerHTML = atlasHexGlobe('90px');
    const avatar = $('.vero-avatar'); if (avatar) avatar.innerHTML = atlasHexGlobe('38px');
    const history = [];
    let greeted = false;

    const scroll = () => { msgs.scrollTop = msgs.scrollHeight; };
    const bubble = (role, text) => {
      const d = document.createElement('div');
      d.className = 'vero-msg vero-msg--' + (role === 'user' ? 'user' : 'bot');
      d.textContent = text; msgs.appendChild(d); scroll(); return d;
    };
    const typing = () => {
      const d = document.createElement('div');
      d.className = 'vero-msg vero-msg--bot vero-typing';
      d.innerHTML = '<span></span><span></span><span></span>';
      msgs.appendChild(d); scroll(); return d;
    };

    function openChat() {
      chat.classList.add('open');
      if (!greeted) { greeted = true; bubble('bot', "Hey 👋 I'm ATLAS. Ask me anything about Vision WRLD or building your website."); }
      input.focus();
    }
    toggle.addEventListener('click', () => chat.classList.contains('open') ? chat.classList.remove('open') : openChat());
    close.addEventListener('click', () => chat.classList.remove('open'));

    async function ask(text) {
      bubble('user', text);
      history.push({ role: 'user', content: text });
      const t = typing();
      let reply;
      if (ATLAS_USE_API) {
        try { reply = await callAtlas(history); }
        catch (err) { reply = localAtlas(text); }
      } else {
        reply = localAtlas(text);
        await new Promise(r => setTimeout(r, 360 + Math.random() * 420)); // natural pause
      }
      t.remove(); bubble('bot', reply);
      history.push({ role: 'assistant', content: reply });
    }
    const submit = () => { const v = input.value.trim(); if (!v) return; input.value = ''; ask(v); };
    send.addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  // POST to our own Cloudflare Pages Function (/api/atlas), same-origin.
  // The function holds the Gemini key server-side and injects the date.
  // We send the ATLAS system prompt + the FULL conversation history every call.
  async function callAtlas(history) {
    const res = await fetch(ATLAS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        system: ATLAS_SYSTEM,
        messages: history,           // full history, role: 'user' | 'assistant'
      }),
    });
    if (!res.ok) throw new Error('atlas ' + res.status);
    const data = await res.json();
    const text = (data.reply || '').trim();
    if (!text) throw new Error('empty');
    return text;
  }

  // ── Canned knowledge engine ───────────────────────────────────────────
  // Scores the message against many topics (each matching lots of phrasings)
  // and returns the best answer. No API, no cost, no quota. Handles the real
  // questions a web studio's visitors ask, plus small talk and live date/time.
  const ATLAS_KB = [
    // ---------- studio / about ----------
    { keys: ['who are you', 'what are you', 'your name', 'are you a bot', 'are you ai', 'are you a robot', 'are you human', 'are you real', 'who am i talking to', 'are you a person'],
      reply: "I'm ATLAS, the assistant here at Vision WRLD, a web design and development studio. I'm an automated helper, but a genuinely useful one. Ask me about what we build, pricing, timelines, getting your business online, or general business questions." },
    { keys: ['vision wrld', 'about you', 'tell me about', 'what is this', 'who are you guys', 'your company', 'your studio', 'what is vision'],
      reply: "Vision WRLD is a web design and development studio. We build custom, fast, conversion-focused websites for businesses that take their online presence seriously. We're a new studio, which means you get our full attention and sharper pricing." },
    { keys: ['how long have you', 'years', 'experience', 'established', 'new studio', 'how new', 'track record', 'been in business', 'how old', 'since when'],
      reply: "We're a new studio, and we're upfront about it. The upside for you: full attention, sharper pricing, and work we're personally invested in, because your site is what builds our name." },
    { keys: ['why you', 'why vision', 'why should i', 'what makes you different', 'why choose', 'what sets you apart', 'why work with', 'what makes you special', 'why not someone else'],
      reply: "Because we build around your actual goals, not a template: custom design, fast load times, real SEO foundations, and something built to scale instead of something you'll outgrow and rebuild. As a new studio, you also get our full focus." },
    { keys: ['where are you', 'located', 'location', 'based', 'your office', 'what country', 'where based', 'remote', 'in person'],
      reply: "We're remote-first with global reach, so we work with businesses wherever they are. Everything happens over email, calls, and shared docs, no timezone is a dealbreaker." },
    { keys: ['portfolio', 'examples', 'your work', 'previous work', 'case studies', 'show me work', 'samples', 'past projects', 'work you have done', 'see your work'],
      reply: "Check the Work section in the menu for a look at what we build. As a new studio our public list is still growing, but every project is custom, and we're happy to walk you through our approach on a quick call." },
    { keys: ['legit', 'trust', 'scam', 'real company', 'safe', 'reliable', 'can i trust', 'are you trustworthy'],
      reply: "Fair thing to ask anyone online. We're a real studio, you own everything we build, and we work in clear milestones so you always see progress. Book a free consultation on the Contact page and judge for yourself, no pressure." },

    // ---------- services ----------
    { keys: ['what do you do', 'what do you guys do', 'you guys do', 'services', 'what can you build', 'what do you offer', 'what you do', 'offerings', 'what you make', 'what do you make', 'you make', 'help me with', 'provide', 'offer', 'what can you do for'],
      reply: "We design and build custom websites: brand-new sites, redesigns, and online stores, plus the SEO and performance work that makes them actually perform. Tell me what your business needs and I'll point you to the right starting place." },
    { keys: ['build a website', 'need a website', 'need a site', 'new website', 'new site', 'want a website', 'want a site', 'a new site', 'make a website', 'make me a', 'create a website', 'website for', 'build me a', 'site for', 'site for my'],
      reply: "That's exactly what we do. We build custom sites designed around your goals: fast, unique, and built to convert. Tell me a bit about your business, or head to the Services page to shape a quote and the Contact page to book a free consultation." },
    { keys: ['redesign', 'rebuild', 'revamp', 'update my site', 'refresh my site', 'my site is old', 'website is old', 'site is old', 'old website', 'outdated', 'looks dated', 'modernize', 'redo my website'],
      reply: "Redesigns are one of our specialties. We audit what's working and what isn't, then rebuild with intention: faster, cleaner, and built to convert. You keep everything we make." },
    { keys: ['ecommerce', 'online store', 'sell online', 'sell products', 'shop', 'store', 'checkout', 'shopping cart', 'sell stuff', 'product page'],
      reply: "Yes, we build full online stores: product management, secure checkout, payments, and a storefront designed to actually sell. We'll scope it to your catalog and goals on the Contact page." },
    { keys: ['maintenance', 'support', 'after launch', 'updates', 'maintain', 'keep it updated', 'ongoing', 'retainer', 'fix things later'],
      reply: "Every build includes a post-launch support window, and we offer ongoing maintenance after that: updates, security, performance checks, and content changes. You're never left on your own once it's live." },
    { keys: ['hosting', 'host', 'domain', 'dns', 'where is it hosted', 'server', 'buy a domain'],
      reply: "We'll guide you through hosting and your domain so it's fast and reliable, and set it all up on accounts you own. No lock-in, no mystery, it's yours." },
    { keys: ['edit it myself', 'update content', 'cms', 'change text', 'add a blog', 'blog', 'blog post', 'add blog', 'manage content', 'update it myself', 'make changes myself', 'edit my own'],
      reply: "Absolutely. We can build it on a CMS so you can update text, images, and blog posts yourself without touching code. We'll show you how during handover." },
    { keys: ['copywriting', 'content', 'write the text', 'who writes', 'wording', 'write content', 'do you write'],
      reply: "We can help with content, from polishing what you have to writing it from scratch for an additional fee. Good copy is half of what makes a page convert, so it's worth getting right." },
    { keys: ['app', 'mobile app', 'ios', 'android', 'build an app'],
      reply: "Our focus is websites and web apps rather than native iOS or Android apps. If you need something app-like, a fast installable web experience often does the job, happy to talk it through on a call." },
    { keys: ['seo', 'rank', 'ranking', 'search engine', 'get found', 'found on google', 'show up on google', 'rank on google', 'first page of google', 'keywords', 'google search'],
      reply: "SEO starts with the fundamentals: fast load times, clean structure, and pages that answer the real questions your customers search for. We build that in from day one rather than bolting it on afterward. Pair it with a Google Business Profile and real reviews and you'll climb for most local searches. There's a primer in our Journal if you want the basics." },

    // ---------- pricing ----------
    { keys: ['price', 'pricing', 'cost', 'how much', 'budget', 'quote', 'estimate', 'expensive', 'cheap', 'rates', 'fees', 'afford', 'how much do you charge'],
      reply: "Pricing scales with scope, from around $300 for something simple up to $10,000 for a full build. The Services page has a live slider, drag it to your scope and it shows an instant estimate. We'll always try to shape something that fits your budget." },
    { keys: ['payment plan', 'deposit', 'installments', 'pay in', 'financing', 'split the cost', 'upfront', 'milestone', 'pay monthly', 'monthly payment', 'monthly'],
      reply: "We keep it flexible: a small deposit to get started, then you pay the balance off in manageable monthly payments rather than one big lump sum. We'll agree the exact monthly schedule with you before any work begins." },
    { keys: ['discount', 'deal', 'cheaper', 'lower price', 'negotiate', 'any offers', 'reduce the price'],
      reply: "We keep pricing sharp as a new studio rather than running gimmicky discounts. Tell us your budget on the Contact page, we'd rather shape a great project that fits than price you out." },

    // ---------- process / timeline / getting started ----------
    { keys: ['how does it work', 'process', 'steps', 'how do you work', 'what happens', 'workflow', 'stages', 'your process'],
      reply: "Six steps: Discovery, Strategy, Design, Build, Launch, then Grow. You can see them on the homepage. In short: we learn your business, plan it, design it for your approval, build it clean and fast, launch it, and support it after." },
    { keys: ['how long', 'timeline', 'turnaround', 'how fast', 'deadline', 'when can', 'time frame', 'take to build', 'how quickly', 'how soon'],
      reply: "It depends on scope: a simple site is usually a week or two, mid-size builds a few weeks, and bigger projects are scoped on the first call. You'll get an exact timeline up front, no vague promises." },
    { keys: ['get started', 'start a project', 'first step', 'how do i begin', 'what do you need from me', 'what do i provide', 'how do we start', 'sign up', 'begin', 'kick off', 'next step'],
      reply: "Easiest first step: book a free consultation on the Contact page, or drag the slider on Services to estimate your scope. To start we'll need your brand basics, your content (or we can help create it), and access to your domain. We walk you through all of it." },
    { keys: ['revisions', 'changes', 'rounds', 'edits', 'tweaks', 'feedback', 'how many changes', 'change my mind'],
      reply: "Revisions are built into the design phase, we refine until you're happy with the direction before we write a line of code. We agree the scope of rounds up front so there are no surprises." },
    { keys: ['own the site', 'ownership', 'do i own', 'who owns', 'my code', 'keep the code', 'is it mine'],
      reply: "You own all of it: every line of code, every asset, every account we set up for you. We don't hold your site hostage on a proprietary platform. The moment we hand over, it's yours." },

    // ---------- tech ----------
    { keys: ['mobile', 'responsive', 'phone', 'tablet', 'mobile friendly', 'works on phones', 'small screen', 'on my phone'],
      reply: "Every site we build is mobile-first and fully responsive: it looks and works great on phones, tablets, and desktops. More than half your visitors are on mobile, so we design for them first." },
    { keys: ['fast', 'speed', 'slow', 'performance', 'load time', 'loading', 'lighthouse', 'page speed', 'quick to load'],
      reply: "Speed is a priority. We hand-write clean code and optimize assets so pages load fast. It matters: every extra second of load time measurably costs you conversions and SEO." },
    { keys: ['what platform', 'templates', 'tech stack', 'framework', 'do you use templates', 'custom code', 'technology', 'what do you build with'],
      reply: "We build custom, no drag-and-drop templates. That's what keeps your site fast, unique, and free of platform lock-in. We pick the right tech for the project and you own the result." },
    { keys: ['accessibility', 'accessible', 'ada', 'wcag', 'screen reader', 'disabilities'],
      reply: "We build with accessibility in mind: proper structure, contrast, and keyboard support, so more people can use your site and you stay on the right side of the rules. It helps SEO too." },
    { keys: ['secure', 'security', 'ssl', 'https', 'hacked', 'safe site'],
      reply: "Security basics are standard with every build: HTTPS/SSL, clean code, and sensible protections. For stores we add the right payment-grade security on top." },
    { keys: ['analytics', 'tracking', 'google analytics', 'metrics', 'traffic stats', 'measure visitors'],
      reply: "We can set up analytics so you see real numbers: where visitors come from, what they do, and what's converting. Decisions get a lot easier when you can actually measure them." },
    { keys: ['migrate', 'move my site', 'transfer', 'switch from', 'import my', 'moving from'],
      reply: "We can migrate your existing site, content, and domain over cleanly, with care to preserve your SEO so you don't lose rankings in the move. It's a common part of a redesign." },

    // ---------- contact ----------
    { keys: ['contact', 'get in touch', 'reach you', 'email', 'phone', 'call you', 'talk to someone', 'speak to', 'message you', 'book a call', 'consultation', 'discovery call', 'free consult', 'how do i reach'],
      reply: "Head to the Contact page to send us a message or book a free discovery call, we reply within 24 hours, usually faster. No spam, no pressure, just a real conversation about your business." },

    // ---------- DIY builders / do I need a site ----------
    { keys: ['wix', 'squarespace', 'webflow', 'godaddy', 'wordpress', 'shopify', 'base44', 'site builder', 'builder', 'diy', 'do it myself', 'build it myself'],
      reply: "Those builders are fine for a hobby, a quick test, or a tight budget. The catch is they get slow and generic as you grow, limit your SEO, and lock you in, so a lot of businesses end up paying to rebuild later. A custom Vision WRLD site is built around your goals and scales without that rebuild, it's the difference between renting a template and owning something built for you." },
    { keys: ['do i need a website', 'why a website', 'need a site', 'website worth it', 'is a website worth', 'do i even need'],
      reply: "For almost any business, yes. It's the first thing people check before they buy, and it's the one piece of marketing you actually own, unlike a social account that can change the rules overnight. A fast, credible site earns trust before you ever speak to a customer." },

    // ---------- business advice ----------
    { keys: ['grow my business', 'grow the business', 'scale my business', 'more sales', 'increase sales', 'grow my company', 'business growth', 'how do i grow', 'expand my business'],
      reply: "A few things move the needle most: nail down who your best customer is and speak directly to them, make it effortless to find and buy from you, and turn happy customers into repeat buyers and referrals. Get the basics of being found right too: a Google Business Profile, real reviews, and a fast website that converts the traffic you already get. That last part is where a lot of growth quietly leaks, and it's exactly what we help with." },
    { keys: ['more customers', 'get customers', 'find customers', 'attract customers', 'advertise', 'advertising', 'leads', 'get clients', 'new clients', 'bring in customers'],
      reply: "Start where your customers already are: claim and optimize your Google Business Profile, ask every happy customer for a review, and post consistently on the one channel your audience actually uses. Referrals and partnerships with complementary local businesses are underrated and free. Then make sure your website turns that attention into enquiries: fast load, clear offer, one obvious call to action." },
    { keys: ['marketing', 'market my business', 'promote', 'how do i market'],
      reply: "Keep it focused: be findable (Google Business Profile, reviews, basic SEO), be consistent on one channel your customers use, and lean on referrals. The piece people skip is the destination, all that effort should send people to a website that actually converts, not a dead-end. Cheap to start, compounding over time." },
    { keys: ['logo', 'brand', 'branding', 'brand identity', 'visual identity', 'logo design', 'good logo'],
      reply: "A good logo is simple, legible at any size, and works in one color, skip the gradients and tiny detail. But a logo is the smallest part of a brand: consistency is what people remember. Pick one or two fonts, a tight palette, and a clear voice, then use them everywhere, especially your website, where people judge you hardest." },
    { keys: ['social media', 'instagram', 'facebook', 'tiktok', 'linkedin', 'posting', 'social'],
      reply: "Pick one platform where your customers actually hang out and do it well rather than being mediocre on five. Post consistently, show the real work and the people behind it, and always give a clear next step. Remember social profiles are rented land, send that audience back to something you own: your website, where you control the experience and can convert them." },
    { keys: ['should i charge', 'how much should i charge', 'price my', 'pricing my products', 'what to charge', 'set my prices', 'what should i charge'],
      reply: "Price on the value you deliver, not just your costs or what competitors charge. Offer a clear good / better / best so most people pick the middle, and don't be afraid to be the premium option if your work backs it up. Show the value (results, proof, testimonials) and the price feels fair, a polished website does a lot of that justifying for you." },
    { keys: ['stand out', 'differentiate', 'competitors', 'competition', 'beat my competitor', 'outcompete', 'unique selling'],
      reply: "Pick a real point of difference and lean into it hard: a specific niche, a standout guarantee, faster turnaround, or a level of craft others skip. Be known for one thing rather than vaguely good at everything. Then make that difference obvious the second someone lands on your website, that's where most businesses blur into the competition by looking like a template." },
    { keys: ['reviews', 'testimonials', 'get reviews', 'more reviews', 'google reviews'],
      reply: "Reviews are some of the cheapest, most powerful marketing you have. Just ask, every happy customer, right after the win, with a direct link to your Google profile. Then show the best ones on your website near your calls to action, social proof at the moment of decision lifts conversions a lot." },

    // ---------- small talk ----------
    { keys: ['hi', 'hello', 'hey', 'yo', 'hiya', 'howdy', 'sup', 'greetings', 'good morning', 'good afternoon', 'good evening'],
      reply: ["Hey! Good to see you. What can I help you with?", "Hi there! What can I help you with today?", "Hey! What are you working on?"] },
    { keys: ['how are you', 'hows it going', 'how is it going', 'you good', 'how you doing', 'whats up', 'what is up', 'how are things'],
      reply: "Doing great, thanks! What's on your mind?" },
    { keys: ['thanks', 'thank you', 'cheers', 'ty', 'appreciate it', 'appreciated', 'thx'],
      reply: ["Anytime! Anything else I can help with?", "You're welcome! Happy to help with anything else.", "No problem at all, what else can I do?"] },
    { keys: ['bye', 'goodbye', 'see you', 'later', 'cya', 'take care', 'gotta go', 'see ya'],
      reply: "Take care! Whenever you're ready, the Contact page is the fastest way to start a project. 👋" },
    { keys: ['joke', 'funny', 'make me laugh', 'tell me a joke'],
      reply: "Why did the web developer leave the restaurant? The table layout was a mess. I'll stick to building sites. Anything I can help you with?" },
    { keys: ['help', 'help me', 'i need help', 'what can you do', 'how can you help', 'what can i ask', 'what do you know', 'menu', 'options'],
      reply: "I can help with what Vision WRLD builds, pricing, timelines, our process, getting your business online, SEO, and general business questions like growth and marketing. What would you like to know?" },
    { keys: ['nice site', 'cool site', 'love the site', 'great website', 'this is cool', 'looks good', 'nice website', 'love this'],
      reply: "Thank you! This site is our own work, exactly the kind of thing we build for clients. If you want something like it, the Services page is a good place to start." },
    { keys: ['weather', 'raining', 'sunny', 'temperature outside', 'forecast'],
      reply: "I can't check live weather from here, but I'm happy to help with anything about your business or website. What's up?" },
  ];

  const ATLAS_DEFAULTS = [
    "Good question. I'm sharpest on websites, getting your business online, and what Vision WRLD can do, but tell me a bit more and I'll help however I can.",
    "Happy to help. Could you say a little more about what you're after? I'm especially good with web design, pricing, timelines, SEO, or growing your business.",
    "I want to give you something useful, can you add a bit more detail? I can help with what we build, our process, costs, or general business questions.",
  ];

  function localAtlas(q) {
    const s = q.toLowerCase().trim();
    const words = new Set(s.replace(/[^a-z0-9$%]+/g, ' ').split(/\s+/).filter(Boolean));
    const pick = (r) => Array.isArray(r) ? r[Math.floor(Math.random() * r.length)] : r;
    const now = new Date();

    // ---- live / dynamic answers ----
    if (/\b(what|which|todays?|current)\b.*\b(day|date)\b|what day is it|what'?s the date|date today|today'?s date/.test(s))
      return `It's ${now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
    if (/\bwhat\b.*\btime\b|time is it|current time|the time right now/.test(s))
      return `It's ${now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} your local time.`;
    const math = s.match(/(-?\d+(?:\.\d+)?)\s*([x*+\/-])\s*(-?\d+(?:\.\d+)?)/);
    if (math && /(what|calc|equals?|=|plus|times|minus|divided|multipl|\d\s*[x*+\/-]\s*\d)/.test(s)) {
      const a = +math[1], op = math[2], b = +math[3];
      const r = (op === 'x' || op === '*') ? a * b : op === '+' ? a + b : op === '-' ? a - b : (b !== 0 ? a / b : NaN);
      if (!Number.isNaN(r)) return `That's ${Math.round(r * 1000) / 1000}.`;
    }

    // ---- scored knowledge-base match ----
    const has = (k) => {
      if (k.includes(' ')) return s.includes(k);
      if (words.has(k)) return true;
      if (words.has(k + 's')) return true;            // simple plural
      if (k.endsWith('s') && words.has(k.slice(0, -1))) return true;
      return false;
    };
    let best = null, bestScore = 0;
    for (const e of ATLAS_KB) {
      let sc = 0;
      for (const k of e.keys) if (has(k)) sc += k.includes(' ') ? 2 : 1;
      if (sc > bestScore) { bestScore = sc; best = e; }
    }
    if (best && bestScore >= 1) return pick(best.reply);
    return pick(ATLAS_DEFAULTS);
  }

  /* ════════════════ INIT ════════════════ */
  function init() {
    document.body.dataset.route = 'home';
    renderBlog();
    initReveal();
    initFAQ();
    initScopeEstimator();
    initContact();
    initClocks();
    initParticles();
    initReadingProgress();
    initTilt();
    initGnav();
    initAtlas();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
