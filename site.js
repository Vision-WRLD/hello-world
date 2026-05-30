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

STYLE: Conversational, warm, and concise — usually 2-5 sentences, but go longer when a business question genuinely needs a real answer (e.g. listing a few concrete growth tactics). Sound like a smart, generous advisor, not a brochure. A reference for the current date/time will be provided at the start of each conversation; use it when relevant.

Test: 'how do I grow my business?' → real, practical growth advice (with a natural tie-in to online presence if it fits). 'what makes a good logo?' → actual branding advice. 'I need a website' → lean into Vision WRLD.`;

  const ATLAS_ENDPOINT = '/api/atlas'; // proxy that injects the Anthropic key server-side

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
      try {
        const reply = await callAtlas(history);
        t.remove(); bubble('bot', reply);
        history.push({ role: 'assistant', content: reply });
      } catch (err) {
        t.remove();
        const fb = localAtlas(text);
        bubble('bot', fb);
        history.push({ role: 'assistant', content: fb });
      }
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

  // Demo fallback when no proxy is wired up yet. Pattern-based, but it answers
  // general questions directly and only leans into Vision WRLD when relevant.
  function localAtlas(q) {
    const s = q.toLowerCase().trim();
    const now = new Date();
    // --- general / off-topic: answer directly, no pitch ---
    if (/\b(what|which|todays?|current).*(day|date)\b|what day is it|what'?s the date|date today/.test(s))
      return `It's ${now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
    if (/what.*time|time is it|current time/.test(s))
      return `It's ${now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} right now (your local time).`;
    if (/^(hi|hello|hey|yo|hiya|howdy|good (morning|afternoon|evening))\b|^sup\b/.test(s))
      return "Hey! Good to see you. What can I help you with?";
    if (/how are you|how's it going|hows it going|you good/.test(s))
      return "Doing great, thanks for asking! What's on your mind?";
    if (/\b(thanks|thank you|cheers|ty|appreciate)\b/.test(s))
      return "Anytime! Anything else I can help with?";
    if (/weather|raining|sunny|temperature outside/.test(s))
      return "I can't peek at live weather from here, but I'm happy to help with just about anything else. What's up?";
    // --- business advice: answer fully first, tie in online presence only where it fits ---
    if (/grow my business|grow the business|grow your business|business grow|scale (my|the) business|more sales|increase sales|how do i grow/.test(s))
      return "A few things move the needle most for a small business: nail down who your best customer is and speak directly to them, make it effortless to find and buy from you, and turn happy customers into repeat buyers and referrals (a simple follow-up or loyalty nudge goes a long way). Get the basics of being found right too: a Google Business Profile, real reviews, and a fast, credible website that converts the traffic you already get. That last part is where a lot of growth quietly leaks, and it's exactly what we help with at Vision WRLD if you ever want a hand.";
    if (/more customers|get customers|find customers|attract customers|marketing|advertis|generate leads|lead gen|get clients/.test(s))
      return "Start where your customers already are: claim and optimize your Google Business Profile, ask every happy customer for a review, and post consistently on the one channel your audience actually uses rather than spreading thin. Referrals and partnerships with complementary local businesses are underrated and free. Then make sure your website turns that attention into enquiries, fast load, clear offer, one obvious call to action. If the site is the weak link, that's our wheelhouse.";
    if (/logo|brand|branding|brand identity|visual identity/.test(s))
      return "A good logo is simple, legible at any size, and works in one color, skip the gradients and tiny detail. But a logo is the smallest part of a brand: consistency is what people remember. Pick one or two fonts, a tight color palette, and a clear voice, then use them everywhere, your signage, socials, and especially your website. Looking consistent and professional across all of those is what builds trust, and the website is usually where people judge you hardest.";
    if (/social media|instagram|facebook|tiktok|linkedin|posting/.test(s))
      return "Pick one platform where your customers actually hang out and do it well rather than being mediocre on five. Post consistently, show the real work and the people behind it, and always give a clear next step. One thing people forget: social profiles are rented land, the algorithm decides who sees you. Send that audience back to something you own, your website, where you control the experience and can actually convert them.";
    if (/should i charge|how much.*charge|price my|pricing strategy|pricing my|what to charge|set my prices/.test(s))
      return "Price on the value you deliver, not just your costs or what competitors charge. Anchor with a clear 'good / better / best' so most people pick the middle, and don't be afraid to be the premium option if your work backs it up, competing on cheapest is a race to the bottom. Show the value clearly (results, proof, testimonials) and the price feels fair. A polished website does a lot of that justifying for you before you ever talk.";
    if (/stand out|differentiate|competitors|competition|beat my competitor/.test(s))
      return "Pick a real point of difference and lean into it hard: a specific niche, a standout guarantee, faster turnaround, or a level of craft others skip. Be genuinely known for one thing rather than vaguely good at everything. Then make that difference obvious the moment someone lands on your website, that's where most businesses blur into the competition by looking like a template. Being memorable and credible online is half the battle.";
    // --- web / business: this is where Vision WRLD fits ---
    if (/wix|squarespace|webflow|godaddy|base44|wordpress|template|site builder/.test(s))
      return "Those builders are fine for a hobby, a quick test, or a tight budget. The catch is they get slow and generic as you grow, limit your SEO, and lock you in, so serious businesses usually end up paying to rebuild later. A custom Vision WRLD site is built around your goals and scales without that rebuild.";
    if (/price|cost|budget|how much|quote|estimate|\$/.test(s))
      return "Pricing scales with scope, from around $300 for something simple up to $10,000 for a full build. Head to the Services page and drag the slider to your scope for a live estimate.";
    if (/how long|timeline|how fast|deadline|turnaround|when can/.test(s))
      return "It depends on scope: a simple site is usually a week or two, mid-size builds run a few weeks, and larger projects are scoped on a first call. We'll give you an exact timeline up front.";
    if (/seo|rank|ranking|google|search engine/.test(s))
      return "SEO starts with speed, clean structure, and pages that answer real questions. We build that in from day one rather than bolting it on later. There's a primer in our Journal if you want the basics.";
    if (/website|web site|web design|build a site|need a site|online|web presence|landing page|ecommerce|online store|business|bakery|shop|portfolio|redesign/.test(s))
      return "Love it, that's exactly what we do. Vision WRLD builds custom, fast sites designed around your actual goals. Tell me a bit more about what you're after, or jump to the Services page to shape a quote and the Contact page to book a free consultation.";
    // --- genuine catch-all: stay helpful, do NOT pitch ---
    return "Happy to help with that. Could you tell me a little more about what you're looking for?";
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
