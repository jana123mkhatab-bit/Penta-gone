/* ═══════════════════════════════════════════════════════════════
   PENTA-GONE — Brushstroke Swirl System  (swirls.js)
   Hand-painted brush strokes drawn into the background.
   Thick, imperfect, painterly — like someone doodled on the wall.
   Colors: #6DCEEE · #44B8DA · #FBE543
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    const CFG = {
        maxAlive: 14,        // hard ceiling
        minAlive: 8,         // refill target — keeps density consistent
        spawnInterval: 600,  // check frequently so deaths are replenished fast
        durationMin: 22000,
        durationMax: 38000,
        sizeMin: 180,
        sizeMax: 420,
    };

    const COLOURS = [
        { cls: 'cyan', hex: '#6DCEEE' },
        { cls: 'blue', hex: '#44B8DA' },
        { cls: 'yellow', hex: '#FBE543' },
    ];

    const DRIFTS = ['sd-a', 'sd-b', 'sd-c', 'sd-d', 'sd-e'];

    /* ── BRUSHSTROKE PATHS ─────────────────────────────────────────
       Each path mimics a loose brush or marker stroke —
       thick, slightly wobbly, imperfect ends. Drawn in 200×200 viewBox.
       stroke-width is high (8–14) and stroke-linecap round for brush feel.
       Multiple strokes per shape for a layered hand-drawn texture.
    ─────────────────────────────────────────────────────────────── */
    const STROKES = [

        /* 1 — Big loose C-curl, double-stroked for ink variation */
        `<g opacity="0.9">
      <path d="M160 35 C185 60, 178 110, 145 130 C112 150, 65 140, 42 110 C20 80, 28 42, 58 28 C88 14, 130 22, 148 48"
        fill="none" stroke="COLOR" stroke-width="11"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
      <path d="M158 38 C182 62, 175 112, 143 132 C110 152, 63 142, 40 112"
        fill="none" stroke="COLOR" stroke-width="5"
        stroke-linecap="round" opacity="0.35"/>
    </g>`,

        /* 2 — Tight spiral with wobbly inner coil */
        `<g opacity="0.85">
      <path d="M100 100 C100 68, 128 48, 145 68 C162 88, 152 122, 130 135
               C108 148, 78 138, 65 118 C52 98, 58 72, 75 62
               C92 52, 112 60, 116 78 C120 96, 108 106, 98 104"
        fill="none" stroke="COLOR" stroke-width="9"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.65"/>
      <path d="M102 98 C102 70, 130 52, 143 72"
        fill="none" stroke="COLOR" stroke-width="4"
        stroke-linecap="round" opacity="0.3"/>
    </g>`,

        /* 3 — Sweeping S-wave, like a brushed ribbon */
        `<g opacity="0.9">
      <path d="M20 150 C40 170, 80 60, 105 80 C130 100, 155 30, 185 55"
        fill="none" stroke="COLOR" stroke-width="13"
        stroke-linecap="round" opacity="0.6"/>
      <path d="M22 148 C42 168, 82 58, 107 78 C132 98, 157 28, 187 53"
        fill="none" stroke="COLOR" stroke-width="5"
        stroke-linecap="round" opacity="0.28"/>
    </g>`,

        /* 4 — Open parenthesis arc with tapered ends */
        `<g opacity="0.88">
      <path d="M130 20 C80 35, 45 70, 45 100 C45 130, 78 162, 130 178"
        fill="none" stroke="COLOR" stroke-width="12"
        stroke-linecap="round" opacity="0.65"/>
      <path d="M128 24 C78 40, 48 74, 48 100 C48 126, 80 158, 128 174"
        fill="none" stroke="COLOR" stroke-width="4.5"
        stroke-linecap="round" opacity="0.25"/>
    </g>`,

        /* 5 — Double loop, like the label bubble-swirls */
        `<g opacity="0.85">
      <path d="M60 120 C25 90, 38 38, 80 32 C122 26, 155 60, 148 98
               C141 136, 108 155, 78 148 C48 141, 35 118, 42 100
               C49 82, 72 76, 90 85 C108 94, 112 112, 100 122"
        fill="none" stroke="COLOR" stroke-width="9"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.62"/>
      <path d="M62 118 C28 88, 40 36, 82 30"
        fill="none" stroke="COLOR" stroke-width="4"
        stroke-linecap="round" opacity="0.28"/>
    </g>`,

        /* 6 — Short thick brushstroke dash, very gestural */
        `<g opacity="0.9">
      <path d="M30 90 C55 55, 110 40, 155 65 C175 76, 178 95, 165 110"
        fill="none" stroke="COLOR" stroke-width="14"
        stroke-linecap="round" opacity="0.55"/>
      <path d="M32 88 C57 53, 112 38, 157 63"
        fill="none" stroke="COLOR" stroke-width="5"
        stroke-linecap="round" opacity="0.22"/>
    </g>`,

    ];

    let alive = 0;
    let paused = false;

    function rand(min, max) { return min + Math.random() * (max - min); }
    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function createSwirl() {
        if (alive >= CFG.maxAlive) return;
        alive++;

        const colour = pick(COLOURS);
        const drift = pick(DRIFTS);
        const stroke = pick(STROKES).replace(/COLOR/g, colour.hex);
        const size = rand(CFG.sizeMin, CFG.sizeMax);
        const duration = rand(CFG.durationMin, CFG.durationMax);
        const delay = rand(0, 1200);

        /* Spread across entire viewport — all sections */
        const spawnX = rand(0, 92);   /* vw */
        const spawnY = rand(0, 90);   /* vh — appear anywhere on page */

        const svg = `<svg viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      width="${size}" height="${size}"
      aria-hidden="true">${stroke}</svg>`;

        const el = document.createElement('div');
        el.className = `swirl-el ${colour.cls} ${drift}`;
        el.setAttribute('aria-hidden', 'true');
        el.innerHTML = svg;

        el.style.cssText = `
      left: ${spawnX}vw;
      top:  ${spawnY}vh;
      animation-duration: ${duration}ms;
      animation-delay: ${delay}ms;
      animation-timing-function: ease-in-out;
      animation-fill-mode: both;
      animation-iteration-count: 1;
    `;

        document.body.appendChild(el);

        setTimeout(() => {
            el.remove();
            alive--;
        }, duration + delay + 200);
    }

    function startSpawning() {
        /* Seed the initial burst so the page looks full immediately */
        const seedCount = IS_MOBILE ? 4 : CFG.minAlive;
        for (let i = 0; i < seedCount; i++) {
            setTimeout(createSwirl, i * 220);
        }

        /* Maintenance interval: spawn enough to stay at minAlive.
           This means as old swirls die, new ones fill the gap right away
           instead of slowly draining to near-zero over time. */
        setInterval(() => {
            if (paused || document.visibilityState === 'hidden') return;
            const target = IS_MOBILE ? 4 : CFG.minAlive;
            const deficit = target - alive;
            const toSpawn = Math.min(deficit, 2); // at most 2 per tick to stay smooth
            for (let i = 0; i < toSpawn; i++) createSwirl();
        }, CFG.spawnInterval);
    }

    document.addEventListener('visibilitychange', () => { paused = document.hidden; });

    function ensureCSS() {
        if (document.getElementById('penta-swirls-css')) return;
        const l = document.createElement('link');
        l.id = 'penta-swirls-css';
        l.rel = 'stylesheet';
        l.href = 'css/swirls.css';
        document.head.appendChild(l);
    }

    function init() { ensureCSS(); startSpawning(); }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();