/* PENTA-GONE — Cursor, Interactions & Ambient Systems */

const CURSOR_SIZE = 10;
const CURSOR_RING_SIZE = 36;
const RING_SCALE_HOVER = 1.8;
const RING_FRICTION = 0.15; // Higher = faster response

// Detect if device is touch-based
const IS_TOUCH_DEVICE = () => {
  return (
    window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0)
  );
};

/* ── CURSOR + GLOW TRAIL ────────────── */
export function initializeCursor() {
  // Completely disable custom cursor on touch devices
  if (IS_TOUCH_DEVICE()) {
    // Hide and disable all cursor elements
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    const cursorGlow = document.getElementById('cursorGlow');
    
    [cursor, cursorRing, cursorGlow].forEach(el => {
      if (el) {
        el.style.display = 'none';
        el.style.pointerEvents = 'none';
        el.style.visibility = 'hidden';
      }
    });
    
    // Restore default cursor
    document.body.style.cursor = 'auto';
    return;
  }

  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  const cursorGlow = document.getElementById('cursorGlow');
  if (!cursor || !cursorRing) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let isVisible = true;
  let animationFrameId = null;

  // Use pointer events for better mouse handling
  document.addEventListener('pointermove', (e) => {
    // Ignore touch and pen pointers - only track mouse
    if (e.pointerType !== 'mouse') return;
    
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Show cursor if it was hidden
    if (!isVisible) {
      isVisible = true;
      cursor.style.opacity = '1';
      cursorRing.style.opacity = '1';
      if (cursorGlow) cursorGlow.style.opacity = '1';
    }
  }, { passive: true });

  // Animation loop using RAF (much more performant than GSAP)
  function animate() {
    // Interpolate ring position with friction for smooth trailing
    ringX += (mouseX - ringX - CURSOR_RING_SIZE / 2) * RING_FRICTION;
    ringY += (mouseY - ringY - CURSOR_RING_SIZE / 2) * RING_FRICTION;

    // Use transform for GPU acceleration
    cursor.style.transform = `translate3d(${mouseX - CURSOR_SIZE / 2}px, ${mouseY - CURSOR_SIZE / 2}px, 0)`;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

    // Glow follows cursor with slight delay
    if (cursorGlow) {
      cursorGlow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    animationFrameId = requestAnimationFrame(animate);
  }
  animate();

  // Hide/show on leave/enter window
  document.addEventListener('pointerleave', () => {
    if (isVisible) {
      isVisible = false;
      cursor.style.opacity = '0';
      cursorRing.style.opacity = '0';
      if (cursorGlow) cursorGlow.style.opacity = '0';
    }
  }, { passive: true });

  document.addEventListener('pointerenter', () => {
    if (!isVisible) {
      isVisible = true;
      cursor.style.opacity = '1';
      cursorRing.style.opacity = '1';
      if (cursorGlow) cursorGlow.style.opacity = '1';
    }
  }, { passive: true });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  });
}

/* ── INTERACTIVE HOVER EFFECTS ────────── */
export function setupInteractiveElements() {
  // Completely skip on touch devices
  if (IS_TOUCH_DEVICE()) {
    return;
  }

  const cursorRing = document.getElementById('cursorRing');
  const cursorGlow = document.getElementById('cursorGlow');
  if (!cursorRing) return;

  const HOVER_CLASS = 'cursor-hover';

  document.querySelectorAll('a, button, .product-block, .quality-card, .routine-step').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorRing.classList.add(HOVER_CLASS);
      if (cursorGlow) cursorGlow.classList.add(HOVER_CLASS);
    }, { passive: true });
    el.addEventListener('mouseleave', () => {
      cursorRing.classList.remove(HOVER_CLASS);
      if (cursorGlow) cursorGlow.classList.remove(HOVER_CLASS);
    }, { passive: true });
  });
}

/* ── MAGNETIC BUTTONS ─────────────────── */
export function setupMagneticButtons() {
  // Skip magnetic effects on touch devices
  if (IS_TOUCH_DEVICE()) {
    return;
  }

  document.querySelectorAll('.hero-cta, .contact-submit, .detail-tab').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    }, { passive: true });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    }, { passive: true });
  });
}

/* ── MOBILE MENU ──────────────────────── */
export function setupMobileMenu() {
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;
  let open = false;
  let isAnimating = false;

  function closeMenu() {
    if (open && !isAnimating) {
      isAnimating = true;
      open = false;
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      const spans = hamburger.querySelectorAll('span');
      gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(spans[1], { opacity: 1, duration: 0.2 });
      gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.3, onComplete: () => { isAnimating = false; } });
    }
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isAnimating) return;
    isAnimating = true;
    
    open = !open;
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    
    if (open) {
      document.body.classList.add('menu-open');
      document.documentElement.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      gsap.to(spans[0], { rotate: 45, y: 6.5, duration: 0.3 });
      gsap.to(spans[1], { opacity: 0, duration: 0.2 });
      gsap.to(spans[2], { rotate: -45, y: -6.5, duration: 0.3, onComplete: () => { isAnimating = false; } });
    } else {
      gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(spans[1], { opacity: 1, duration: 0.2 });
      gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.3, onComplete: () => { isAnimating = false; } });
    }
  });

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (open && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // Reset overflow on page visibility change (safety net)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden === false && open === false) {
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  });
}

/* ── PRODUCT TABS ────────────────────── */
export function setupProductTabs() {
  document.querySelectorAll('.detail-tabs').forEach((tabGroup) => {
    const tabs = tabGroup.querySelectorAll('.detail-tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.tab;
        const parent = tab.closest('.product-details');
        parent.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
        parent.querySelectorAll('.detail-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const content = document.getElementById(targetId);
        if (content) {
          content.classList.add('active');
          gsap.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        }
      });
    });
  });
}

/* ── PRODUCT IMAGE GALLERY ───────────── */
export function setupProductGallery() {
  document.querySelectorAll('.product-img-showcase').forEach((showcase) => {
    const mainImg   = showcase.querySelector('.product-photo');
    const thumbs    = showcase.querySelectorAll('.product-img-thumb');
    if (!mainImg || !thumbs.length) return;

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const newSrc = thumb.dataset.src;
        if (!newSrc || mainImg.src.endsWith(encodeURIComponent(newSrc).replace(/%2F/g, '/'))) return;

        // Fade swap
        gsap.to(mainImg, {
          opacity: 0, scale: 0.97, duration: 0.2, ease: 'power2.in',
          onComplete: () => {
            mainImg.src = newSrc;
            gsap.to(mainImg, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
          }
        });

        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  });
}

/* ── CONTACT FORM ─────────────────────── */
export function setupContactForm() {
  const form = document.getElementById('cForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.contact-submit');
    const input = form.querySelector('.contact-input');
    gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    btn.textContent = '✓ You\'re on the list!';
    btn.style.background = '#6dceee';
    btn.style.color = '#07111e';
    input.value = '';
    input.placeholder = 'Thank you!';
    setTimeout(() => {
      btn.textContent = 'Join Waitlist';
      btn.style.background = '';
      btn.style.color = '';
      input.placeholder = 'Your email address';
    }, 4000);
  });
}

/* ── FLOATING PENTAGONS SPAWNER ─────────── */
export function spawnFloatingPentagons() {
  const layers = [
    'heroPentaLayer', 'philPentaLayer', 'prodPentaLayer',
    'routPentaLayer', 'qualPentaLayer', 'contactPentaLayer'
  ];
  const colors = [
    'rgba(109,206,238,ALPHA)', 'rgba(251,229,67,ALPHA)',
    'rgba(68,184,218,ALPHA)',   'rgba(249,251,253,ALPHA)'
  ];

  layers.forEach((id) => {
    const layer = document.getElementById(id);
    if (!layer) return;

    const count = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const size = 60 + Math.random() * 140;
      const alpha = 0.04 + Math.random() * 0.1;
      const color = colors[Math.floor(Math.random() * colors.length)].replace('ALPHA', alpha);
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 12;
      const dur = 16 + Math.random() * 14;

      const fp = document.createElement('div');
      fp.className = 'fp';
      fp.style.cssText = `left:${x}%;top:${y}%;width:${size}px;height:${size}px;animation-delay:${delay}s;animation-duration:${dur}s;`;

      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.style.cssText = 'width:100%;height:100%;';

      const poly = document.createElementNS(svgNS, 'polygon');
      poly.setAttribute('points', '50,5 93,32 78,82 22,82 7,32');
      poly.setAttribute('stroke', color);
      poly.setAttribute('stroke-width', '1');
      poly.setAttribute('fill', 'none');
      svg.appendChild(poly);
      fp.appendChild(svg);
      layer.appendChild(fp);
    }
  });
}

/* ── MOUSE-FOLLOW SECTION LIGHTING ───── */
export function setupMouseLighting() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  // Already handled in initializeCursor — glow follows cursor automatically
  // Additional: add section-specific color shift
  const sections = [
    { id: 'hero',        color: 'rgba(251,229,67,0.07)' },
    { id: 'philosophy',  color: 'rgba(109,206,238,0.07)' },
    { id: 'products',    color: 'rgba(68,184,218,0.07)' },
    { id: 'routine',     color: 'rgba(109,206,238,0.07)' },
    { id: 'quality',     color: 'rgba(251,229,67,0.06)' },
    { id: 'contact',     color: 'rgba(68,184,218,0.08)' },
  ];

  if (typeof ScrollTrigger !== 'undefined') {
    sections.forEach(({ id, color }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => { glow.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`; },
        onEnterBack: () => { glow.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`; },
      });
    });
  }
}
