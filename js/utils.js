/* PENTA-GONE — Utilities */

export function setupScrollProgress() {
  const fill = document.getElementById('progressFill');
  if (!fill) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    fill.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }, { passive: true });
}

/* ════════════════════════════════════════════════════════
   DUAL-MODE BACKGROUND SYSTEM
   ─ Desktop (pointer:fine):  canvas sparkles + mouse pull
   ─ Mobile  (pointer:coarse): canvas OFF + touch ripple
   ════════════════════════════════════════════════════════ */

const IS_MOBILE = window.matchMedia('(pointer: coarse)').matches;

/* ── Shared brand colors (r, g, b) ── */
const COLORS = [
  [109, 206, 238],  // #6dceee — light cyan
  [68,  184, 218],  // #44b8da — mid blue
  [251, 229,  67],  // #fbe543 — gold
  [249, 251, 253],  // white highlight
  [109, 206, 238],  // weighted cyan ×2
  [68,  184, 218],  // weighted blue ×2
  [109, 206, 238],  // weighted cyan ×3
  [251, 229,  67],  // weighted gold ×2
];

const TYPES = ['dot', 'dot', 'dot', 'dot', 'sparkle', 'sparkle', 'sparkle', 'ring', 'cross'];

/* ── Shared draw helpers ── */
function drawSparkle(ctx, x, y, r, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);

  const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 4);
  grd.addColorStop(0, `rgba(${color},${alpha * 0.6})`);
  grd.addColorStop(1, `rgba(${color},0)`);
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(0, 0, r * 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle   = `rgba(${color},${alpha})`;
  ctx.shadowColor = `rgba(${color},0.9)`;
  ctx.shadowBlur  = r * 6;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle  = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.25;
    i === 0 ? ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
            : ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawRing(ctx, x, y, r, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha * 0.7;
  ctx.strokeStyle = `rgba(${color},1)`;
  ctx.shadowColor = `rgba(${color},0.7)`;
  ctx.shadowBlur  = r * 4;
  ctx.lineWidth   = 0.8;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawCross(ctx, x, y, r, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = `rgba(${color},1)`;
  ctx.shadowColor = `rgba(${color},0.8)`;
  ctx.shadowBlur  = r * 5;
  ctx.lineWidth   = 0.8;
  ctx.lineCap     = 'round';
  ctx.beginPath(); ctx.moveTo(x, y - r * 2); ctx.lineTo(x, y + r * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - r, y);     ctx.lineTo(x + r, y);     ctx.stroke();
  ctx.restore();
}

function mkParticle(w, h, preplace, options = {}) {
  const rgb      = COLORS[Math.floor(Math.random() * COLORS.length)];
  const color    = rgb.join(',');
  const type     = TYPES[Math.floor(Math.random() * TYPES.length)];
  const isBig    = Math.random() < (options.bigChance ?? 0.1);
  const maxR     = options.maxR ?? 2.0;
  const maxAlphaBase = options.maxAlpha ?? 0.55;

  return {
    x:        Math.random() * w,
    y:        preplace ? Math.random() * h : h + 20,
    r:        isBig ? 1.6 + Math.random() * maxR   : 0.3 + Math.random() * 1.4,
    vx:       (Math.random() - 0.5) * (options.speed ?? 0.22),
    vy:       -(Math.random() * (options.speed ?? 0.4) + 0.08),
    alpha:    preplace ? Math.random() * 0.5 : 0,
    maxAlpha: isBig ? maxAlphaBase + Math.random() * 0.3 : 0.18 + Math.random() * (maxAlphaBase - 0.1),
    grow:     true,
    fadeRate: 0.001 + Math.random() * 0.003,
    growRate: 0.003 + Math.random() * 0.005,
    color,
    type,
    angle:    Math.random() * Math.PI * 2,
    spin:     (Math.random() - 0.5) * 0.018,
    twinkle:  Math.random() < (options.twinkleChance ?? 0.3),
    twinkleT: Math.random() * Math.PI * 2,
  };
}

function drawParticle(ctx, p) {
  let displayAlpha = p.alpha;
  if (p.twinkle) {
    p.twinkleT += 0.04;
    displayAlpha *= 0.6 + 0.4 * Math.sin(p.twinkleT);
  }
  if (p.type === 'sparkle') {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
    drawSparkle(ctx, 0, 0, p.r, p.color, displayAlpha);
    ctx.restore();
  } else if (p.type === 'ring') {
    drawRing(ctx, p.x, p.y, p.r * 1.5, p.color, displayAlpha);
  } else if (p.type === 'cross') {
    drawCross(ctx, p.x, p.y, p.r * 1.2, p.color, displayAlpha);
  } else {
    ctx.save();
    ctx.globalAlpha = displayAlpha;
    ctx.fillStyle   = `rgb(${p.color})`;
    ctx.shadowColor = `rgba(${p.color},0.7)`;
    ctx.shadowBlur  = p.r * 8;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

/* ── TOUCH RIPPLE (mobile replacement for mouse interaction) ── */
function setupTouchRipple() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  if (!document.getElementById('touch-ripple-css')) {
    const style = document.createElement('style');
    style.id = 'touch-ripple-css';
    style.textContent = `
      .hero-touch-ripple {
        position: absolute;
        width: 8px; height: 8px;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 3;
        animation: hero-ripple-expand 0.85s cubic-bezier(0.15, 0.8, 0.4, 1) forwards;
      }
      .hero-touch-ripple.cyan  { background: rgba(109,206,238,0.55); }
      .hero-touch-ripple.blue  { background: rgba(68,184,218,0.55);  }
      .hero-touch-ripple.gold  { background: rgba(251,229,67,0.5);   }
      @keyframes hero-ripple-expand {
        to { transform: translate(-50%, -50%) scale(28); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  const RIPPLE_COLORS = ['cyan', 'blue', 'gold'];
  let lastColor = 0;

  hero.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect  = hero.getBoundingClientRect();
    const ripple = document.createElement('div');
    ripple.className = `hero-touch-ripple ${RIPPLE_COLORS[lastColor++ % 3]}`;
    ripple.style.left = (touch.clientX - rect.left) + 'px';
    ripple.style.top  = (touch.clientY - rect.top)  + 'px';
    hero.appendChild(ripple);
    setTimeout(() => ripple.remove(), 900);
  }, { passive: true });
}

/* ════════════════════════════════════════════════════════
   HERO CANVAS — Dense sparkles + strong mouse pull
   ════════════════════════════════════════════════════════ */
export function createParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  if (IS_MOBILE) {
    canvas.style.display = 'none';
    setupTouchRipple();
    return;
  }

  const ctx = canvas.getContext('2d');
  let w, h;
  let mouseX = -9999, mouseY = -9999;

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }, { passive: true });
  window.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });

  let particles = [];

  function resize() {
    w = canvas.width  = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); buildParticles(); }, { passive: true });

  function buildParticles() {
    particles = [];
    // Hero: dense — up to 160 sparkles, more sparkle-type, bigger
    const count = Math.min(160, Math.floor((w * h) / 4500));
    for (let i = 0; i < count; i++) {
      particles.push(mkParticle(w, h, true, {
        bigChance: 0.15,
        maxR: 3.0,
        maxAlpha: 0.65,
        speed: 0.35,
        twinkleChance: 0.4,
      }));
    }
  }
  buildParticles();

  const PULL_RADIUS = 160;
  const PULL_FORCE  = 0.022;

  let rafId;
  function draw() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p, i) => {
      // Mouse pull
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < PULL_RADIUS && dist > 0) {
        const strength = (1 - dist / PULL_RADIUS) * PULL_FORCE;
        p.vx += dx / dist * strength;
        p.vy += dy / dist * strength;
      }

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1.4) { p.vx *= 0.82; p.vy *= 0.82; }

      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;

      if (p.grow) {
        p.alpha += p.growRate;
        if (p.alpha >= p.maxAlpha) p.grow = false;
      } else {
        p.alpha -= p.fadeRate;
      }

      if (p.alpha <= 0 || p.y < -20 || p.x < -30 || p.x > w + 30) {
        particles[i] = mkParticle(w, h, false, {
          bigChance: 0.15, maxR: 3.0, maxAlpha: 0.65, speed: 0.35, twinkleChance: 0.4,
        });
        return;
      }

      drawParticle(ctx, p);
    });

    rafId = requestAnimationFrame(draw);
  }
  draw();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else draw();
  });
}

/* ════════════════════════════════════════════════════════
   GLOBAL CANVAS — Sparse ambient sparkles across whole site
   Fixed position, always visible while scrolling
   ════════════════════════════════════════════════════════ */
export function createGlobalSparkles() {
  const canvas = document.getElementById('globalSparkleCanvas');
  if (!canvas || IS_MOBILE) return;

  const ctx = canvas.getContext('2d');
  let w, h;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  let particles = [];

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); buildParticles(); }, { passive: true });

  function buildParticles() {
    particles = [];
    // Global: sparser and more subtle than the hero
    // ~120 across the full viewport at any time
    const count = Math.min(120, Math.floor((w * h) / 9000));
    for (let i = 0; i < count; i++) {
      particles.push(mkParticle(w, h, true, {
        bigChance: 0.08,
        maxR: 2.2,
        maxAlpha: 0.42,   // dimmer than hero sparkles
        speed: 0.2,
        twinkleChance: 0.5,  // more twinkle — ambient feel
      }));
    }
  }
  buildParticles();

  // Gentle mouse pull — subtle on global canvas
  const PULL_RADIUS = 120;
  const PULL_FORCE  = 0.010;

  let rafId;
  function draw() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p, i) => {
      // Very gentle mouse attraction
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < PULL_RADIUS && dist > 0) {
        const strength = (1 - dist / PULL_RADIUS) * PULL_FORCE;
        p.vx += dx / dist * strength;
        p.vy += dy / dist * strength;
      }

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 0.9) { p.vx *= 0.88; p.vy *= 0.88; }

      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;

      if (p.grow) {
        p.alpha += p.growRate;
        if (p.alpha >= p.maxAlpha) p.grow = false;
      } else {
        p.alpha -= p.fadeRate;
      }

      if (p.alpha <= 0 || p.y < -20 || p.x < -30 || p.x > w + 30) {
        particles[i] = mkParticle(w, h, false, {
          bigChance: 0.08, maxR: 2.2, maxAlpha: 0.42, speed: 0.2, twinkleChance: 0.5,
        });
        return;
      }

      drawParticle(ctx, p);
    });

    rafId = requestAnimationFrame(draw);
  }
  draw();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else draw();
  });
}
