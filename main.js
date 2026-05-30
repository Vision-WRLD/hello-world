'use strict';

/* Matrix code-rain removed — the hero terminal (hero.js) is now the only
   code-motion element. See hero.js / hero.css. */

/* ─── TYPEWRITER (legacy, no-ops if #typewriter absent) ─── */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = [
    'That Get You Noticed.',
    'That Drive Real Results.',
    'That Work 24/7.',
    'From Scratch — Fast.',
    'That Grow Your Business.',
  ];
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; return setTimeout(tick, 1800); }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? 45 : 85);
  }
  tick();
})();


/* ─── TERMINAL LINES ─── */
(function initTerminal() {
  const lines = [
    { id: 'tl-1', text: '→ Analyzing your business goals…',    delay: 600  },
    { id: 'tl-2', text: '→ Designing pixel-perfect layout…',   delay: 1400 },
    { id: 'tl-3', text: '→ Writing clean, fast code…',         delay: 2200 },
    { id: 'tl-4', text: '✓ Site launched!  yoursite.com 🚀',   delay: 3000 },
  ];
  lines.forEach(({ id, text, delay }) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) { el.textContent = text; el.classList.add('show'); }
    }, delay);
  });
})();


/* ─── COUNTER ANIMATION ─── */
(function initCounters() {
  const els = document.querySelectorAll('.stat__num[data-target]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = +el.dataset.target;
      const start  = performance.now();
      const dur    = 1600;

      function step(now) {
        const progress = Math.min((now - start) / dur, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
})();


/* ─── REVEAL ON SCROLL ─── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();


/* ─── NAV SCROLL EFFECT ─── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ─── HAMBURGER ─── */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.querySelector('.nav__links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();


/* ─── CONTACT FORM ─── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn  = document.getElementById('submitBtn');
    const text = document.getElementById('submitText');
    btn.disabled = true;
    text.textContent = 'Sending…';

    setTimeout(() => {
      text.textContent = 'Message Sent!';
      btn.style.background = 'linear-gradient(135deg,#16A34A,#22C55E)';
      btn.style.boxShadow  = '0 0 24px rgba(34,197,94,.4)';
      form.reset();
      setTimeout(() => {
        text.textContent = 'Send Message';
        btn.disabled = false;
        btn.style.background = '';
        btn.style.boxShadow  = '';
      }, 3000);
    }, 1200);
  });
})();


/* ─── GLOWING CARD MOUSE TRACKING ─── */
(function initGlowCards() {
  document.querySelectorAll('.card--service, .testimonial, .before-after').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
      card.style.background = `
        radial-gradient(circle at var(--mx,50%) var(--my,50%),
          rgba(99,102,241,.08) 0%,
          var(--bg-card) 60%)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();


/* ─── SMOOTH ANCHOR SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById('nav')?.offsetHeight || 72;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
