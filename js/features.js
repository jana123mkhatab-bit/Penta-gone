/* ═══════════════════════════════════════════════════
   PENTA-GONE — Features JS
   Before/After Slider · Ingredients Tabs · Countdown · Hero Video
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. BEFORE / AFTER SLIDER ─────────────────────── */
  const slider    = document.getElementById('baSlider');
  const handle    = document.getElementById('baHandle');
  const beforePan = document.getElementById('baBeforePane');

  if (slider && handle && beforePan) {
    let dragging = false;

    function setPosition(clientX) {
      const rect = slider.getBoundingClientRect();
      let pct = (clientX - rect.left) / rect.width;
      pct = Math.max(0.05, Math.min(0.95, pct));
      const pctStr = (pct * 100).toFixed(2) + '%';
      beforePan.style.width = pctStr;
      handle.style.left = pctStr;
      handle.setAttribute('aria-valuenow', Math.round(pct * 100));
    }

    // Mouse
    handle.addEventListener('mousedown', (e) => { dragging = true; e.preventDefault(); });
    window.addEventListener('mousemove', (e) => { if (dragging) setPosition(e.clientX); });
    window.addEventListener('mouseup',   ()  => { dragging = false; });

    // Touch — start drag from handle OR anywhere on the slider
    function onTouchStart(e) { dragging = true; e.preventDefault(); }
    function onTouchMove(e)  { if (dragging) { e.preventDefault(); setPosition(e.touches[0].clientX); } }
    function onTouchEnd()    { dragging = false; }

    handle.addEventListener('touchstart', onTouchStart, { passive: false });
    slider.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });

    // Keyboard accessibility
    handle.addEventListener('keydown', (e) => {
      const rect = slider.getBoundingClientRect();
      const cur  = parseFloat(beforePan.style.width || '50%') / 100;
      if (e.key === 'ArrowLeft')  setPosition(rect.left + (cur - 0.05) * rect.width);
      if (e.key === 'ArrowRight') setPosition(rect.left + (cur + 0.05) * rect.width);
    });

    // Also allow clicking anywhere on the slider bar
    slider.addEventListener('click', (e) => { setPosition(e.clientX); });

    // Initialise at 50%
    setPosition(slider.getBoundingClientRect().left + slider.getBoundingClientRect().width * 0.5);
    // Re-init after layout
    window.addEventListener('resize', () => {
      setPosition(slider.getBoundingClientRect().left + slider.getBoundingClientRect().width * 0.5);
    }, { passive: true });
  }

  /* ── 2. STAT COUNTER ANIMATION ───────────────────── */
  function animateCounter(el, target, duration) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statsSection = document.querySelector('.ba-stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.ba-stat-num').forEach((el) => {
          animateCounter(el, parseInt(el.dataset.target, 10), 1400);
        });
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  /* ── 3. INGREDIENTS TABS ─────────────────────────── */
  const ingTabs = document.querySelectorAll('.ing-tab');
  const ingGrid = document.getElementById('ingGrid');

  ingTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const product = tab.dataset.product;

      // Update active tab
      ingTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Swap visible cards with staggered fade-in
      const cards = ingGrid ? ingGrid.querySelectorAll('.ing-card') : [];
      cards.forEach((card, i) => {
        const match = card.dataset.product === product;
        if (match) {
          card.style.display = 'block';
          card.style.animation = 'none';
          // force reflow
          void card.offsetHeight;
          card.style.animation = `ing-fade-in 0.35s ease ${i * 0.05}s forwards`;
          card.style.opacity = '0';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ── 4. COUNTDOWN TIMER ──────────────────────────── */
  // Set your launch date here (YYYY, MM-1, DD, HH, MM, SS)
  const LAUNCH_DATE = new Date(2025, 8, 1, 0, 0, 0); // Sept 1 2025 — change to your real date

  const cdDays  = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins  = document.getElementById('cdMins');
  const cdSecs  = document.getElementById('cdSecs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function flashTick(el) {
    el.classList.add('tick');
    setTimeout(() => el.classList.remove('tick'), 200);
  }

  let prevSecs = -1;

  function updateCountdown() {
    const now   = new Date();
    let diff    = Math.max(0, LAUNCH_DATE - now);

    const days  = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);  diff -= hours * 3600000;
    const mins  = Math.floor(diff / 60000);    diff -= mins * 60000;
    const secs  = Math.floor(diff / 1000);

    if (cdDays)  cdDays.textContent  = pad(days);
    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMins)  cdMins.textContent  = pad(mins);
    if (cdSecs) {
      cdSecs.textContent = pad(secs);
      if (secs !== prevSecs) {
        flashTick(cdSecs);
        if (mins  !== parseInt(cdMins?.textContent ?? '0', 10))  flashTick(cdMins);
        if (hours !== parseInt(cdHours?.textContent ?? '0', 10)) flashTick(cdHours);
        if (days  !== parseInt(cdDays?.textContent  ?? '0', 10)) flashTick(cdDays);
        prevSecs = secs;
      }
    }
  }

  if (cdDays || cdHours || cdMins || cdSecs) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ── 5. WAITLIST FORM FEEDBACK ───────────────────── */
  const cForm = document.getElementById('cForm');
  const waitlistCount = document.getElementById('waitlistCount');
  let count = 247;

  if (cForm) {
    cForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input  = cForm.querySelector('.contact-input');
      const btn    = cForm.querySelector('.contact-submit');
      const email  = input?.value?.trim();
      if (!email) return;

      // Optimistic UI update
      btn.textContent = '✓ You\'re on the list!';
      btn.style.background = 'var(--accent-blue)';
      btn.style.color = '#fff';
      btn.disabled = true;
      input.disabled = true;

      // Increment counter
      count++;
      if (waitlistCount) {
        animateCounter(waitlistCount, count, 600);
      }
    });
  }

  /* ── 6. HERO PROCESS VIDEO — MUTE TOGGLE ─────────── */
  const heroVid      = document.getElementById('heroProcessVideo');
  const muteBtn      = document.getElementById('heroVidMute');
  const iconMuted    = document.getElementById('iconMuted');
  const iconUnmuted  = document.getElementById('iconUnmuted');

  if (heroVid && muteBtn) {
    muteBtn.addEventListener('click', () => {
      heroVid.muted = !heroVid.muted;
      iconMuted.style.display   = heroVid.muted ? 'block' : 'none';
      iconUnmuted.style.display = heroVid.muted ? 'none'  : 'block';
    });
  }

})();
