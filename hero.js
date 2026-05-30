'use strict';

/* ══════════════════════════════════════════════════════════════
   VISION WRLD - hero behaviours
   Terminal typewriter · mouse-parallax tilt · video fade loop
   ══════════════════════════════════════════════════════════════ */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── 1. BACKGROUND VIDEO: rAF fade loop ───
     opacity 0 → fade in over 0.5s → hold → fade out over last 0.5s.
     On ended: reset to 0, wait 100ms, replay from start. */
  (function videoFade() {
    const video = document.getElementById('vwHeroVideo');
    if (!video) return;
    if (reduceMotion) return;              // CSS holds it at a static opacity

    const FADE = 0.5;                      // seconds
    let raf;

    function tick() {
      const d = video.duration;
      if (d && !Number.isNaN(d)) {
        const t = video.currentTime;
        let o = 1;
        if (t < FADE) o = t / FADE;                       // fade in
        else if (t > d - FADE) o = Math.max(0, (d - t) / FADE); // fade out
        video.style.opacity = o.toFixed(3);
      }
      raf = requestAnimationFrame(tick);
    }

    function start() {
      video.currentTime = 0;
      video.style.opacity = '0';
      const p = video.play();
      if (p && p.catch) p.catch(() => { video.style.opacity = '0.5'; });
    }

    video.addEventListener('loadedmetadata', () => { raf = requestAnimationFrame(tick); });
    video.addEventListener('ended', () => {
      cancelAnimationFrame(raf);
      video.style.opacity = '0';
      setTimeout(() => { start(); raf = requestAnimationFrame(tick); }, 100);
    });

    start();
  })();


  /* ─── 2. TERMINAL TYPEWRITER ───
     Each line is a list of tokens {t: text, c: class}. Lines type out in
     sequence, then the whole script holds and restarts. Reduced motion =
     full static render, no caret animation. */
  (function terminal() {
    const body = document.getElementById('vwTermBody');
    if (!body) return;

    const P  = 'vw-tok-prompt';
    const O  = 'vw-tok-out';
    const K  = 'vw-tok-key';
    const S  = 'vw-tok-str';
    const PU = 'vw-tok-punct';
    const OK = 'vw-tok-ok';

    // token lists per line; empty array = blank spacer line
    const SCRIPT = [
      [{ t: '$ ', c: P }, { t: 'whoami', c: P }],
      [{ t: '> ', c: O }, { t: 'Vision WRLD, web design & development', c: O }],
      [],
      [{ t: '$ ', c: P }, { t: './welcome.sh', c: P }],
      [{ t: '> ', c: O }, { t: "Big vision? Let's build its WRLD,", c: O }],
      [{ t: '  websites that load fast, rank well, and convert.', c: O }],
      [],
      [{ t: '$ ', c: P }, { t: 'cat services.json', c: P }],
      [{ t: '{', c: PU }],
      [{ t: '  "build":    ', c: K }, { t: '"new sites from scratch"', c: S }, { t: ',', c: PU }],
      [{ t: '  "redesign": ', c: K }, { t: '"modern rebuilds"', c: S }, { t: ',', c: PU }],
      [{ t: '  "ecommerce":', c: K }, { t: '"online stores"', c: S }],
      [{ t: '}', c: PU }],
      [],
      [{ t: '$ ', c: P }, { t: 'run vision --start', c: P }],
      [{ t: '> ', c: O }, { t: 'Initializing your project...  ', c: O }, { t: '✓', c: OK }],
      [{ t: '> ', c: O }, { t: "Ready when you are. type 'Start a Project'", c: O }],
    ];

    const SPEED = 32;        // ms per char
    const LINE_PAUSE = 90;   // ms between lines
    const HOLD = 2000;       // ms hold before restart

    // Build the line elements once
    const lineEls = SCRIPT.map(() => {
      const el = document.createElement('span');
      el.className = 'ln';
      body.appendChild(el);
      return el;
    });

    const caret = document.createElement('span');
    caret.className = 'vw-caret';
    caret.textContent = '_';

    function renderStatic() {
      lineEls.forEach((el, i) => {
        el.innerHTML = '';
        SCRIPT[i].forEach(tok => {
          const s = document.createElement('span');
          s.className = tok.c;
          s.textContent = tok.t;
          el.appendChild(s);
        });
      });
      const last = lineEls[lineEls.length - 1];
      last.appendChild(caret);
    }

    if (reduceMotion) { renderStatic(); return; }

    let li = 0, ti = 0, ci = 0;
    let curSpan = null;

    function typeStep() {
      if (li >= SCRIPT.length) {            // finished: hold, then loop
        setTimeout(restart, HOLD);
        return;
      }
      const tokens = SCRIPT[li];
      const lineEl = lineEls[li];

      if (tokens.length === 0) {            // blank spacer line
        moveCaret(lineEl);
        li++; ti = 0; ci = 0; curSpan = null;
        setTimeout(typeStep, LINE_PAUSE);
        return;
      }

      const tok = tokens[ti];
      if (ci === 0) {
        curSpan = document.createElement('span');
        curSpan.className = tok.c;
        lineEl.appendChild(curSpan);
      }
      curSpan.textContent = tok.t.slice(0, ++ci);
      moveCaret(lineEl);

      if (ci >= tok.t.length) {             // token done
        ti++; ci = 0; curSpan = null;
        if (ti >= tokens.length) {          // line done
          li++; ti = 0;
          setTimeout(typeStep, LINE_PAUSE);
          return;
        }
      }
      setTimeout(typeStep, SPEED);
    }

    function moveCaret(lineEl) {
      if (caret.parentNode !== lineEl) lineEl.appendChild(caret);
    }

    function restart() {
      lineEls.forEach(el => { el.innerHTML = ''; });
      li = 0; ti = 0; ci = 0; curSpan = null;
      typeStep();
    }

    typeStep();
  })();


  /* ─── 3. MOUSE-PARALLAX 3D TILT ─── */
  (function tilt() {
    if (reduceMotion) return;
    const stage = document.getElementById('vwTermStage');
    const term = document.getElementById('vwTerm');
    const hero = document.getElementById('vwHero');
    if (!stage || !term || !hero) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const MAX = 7;   // degrees
    let target = { rx: 0, ry: 0 }, cur = { rx: 0, ry: 0 }, raf = null;

    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;   // -0.5..0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      target.ry = px * (MAX * 2);
      target.rx = -py * (MAX * 2);
      if (!raf) raf = requestAnimationFrame(loop);
    });
    hero.addEventListener('mouseleave', () => {
      target.rx = 0; target.ry = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    });

    function loop() {
      cur.rx += (target.rx - cur.rx) * 0.08;
      cur.ry += (target.ry - cur.ry) * 0.08;
      term.style.setProperty('--rx', cur.rx.toFixed(2) + 'deg');
      term.style.setProperty('--ry', cur.ry.toFixed(2) + 'deg');
      if (Math.abs(target.rx - cur.rx) > 0.02 || Math.abs(target.ry - cur.ry) > 0.02) {
        raf = requestAnimationFrame(loop);
      } else { raf = null; }
    }
  })();


  /* ─── 4. MOBILE MENU (text button, no hamburger) ─── */
  (function menu() {
    const btn = document.getElementById('vwMenu');
    const center = document.getElementById('vwNavCenter');
    if (!btn || !center) return;
    btn.addEventListener('click', () => {
      const open = center.style.display === 'flex';
      center.style.display = open ? '' : 'flex';
      center.style.flexBasis = open ? '' : '100%';
      center.style.justifyContent = open ? '' : 'flex-start';
      btn.textContent = open ? 'MENU' : 'CLOSE';
    });
  })();
})();
