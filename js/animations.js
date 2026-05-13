/* PENTA-GONE — GSAP Scroll Animations */

export function registerAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  animateHero();
  animateMarquee();
  animatePhilosophy();
  animateKineticBand();
  animateProducts();
  animateRoutine();
  animateQuality();
  animateContact();
  setupNavScroll();
}

function animateHero() {
  const heroContent = document.getElementById('heroContent');
  if (!heroContent) return;
  gsap.to(heroContent, {
    y: 100, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '45% top', scrub: 1 }
  });
}

function animateMarquee() {
  const wrap = document.getElementById('marqueeWrap');
  if (!wrap) return;
  ScrollTrigger.create({
    onUpdate(self) {
      const vel = self.getVelocity();
      const target = Math.max(-5, Math.min(5, vel / 300));
      gsap.to(wrap, { skewX: target, duration: 0.4, ease: 'power2.out', overwrite: true });
      gsap.to(wrap, { skewX: 0, duration: 0.9, ease: 'power3.out', delay: 0.4, overwrite: false });
    }
  });
}

function animatePhilosophy() {
  const philLabel = document.getElementById('philLabel');
  const philTitle = document.getElementById('philTitle');
  const philP1 = document.getElementById('philP1');
  const philP2 = document.getElementById('philP2');
  const philConcerns = document.getElementById('philConcerns');
  const philVisual = document.getElementById('philVisual');
  if (!philTitle) return;

  gsap.from(philLabel, { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: '#philosophy', start: 'top 78%', toggleActions: 'play none none reverse' }
  });
  gsap.from(philTitle.querySelectorAll('.line-inner'), {
    y: '110%', duration: 1.1, stagger: 0.12, ease: 'power4.out',
    scrollTrigger: { trigger: '#philosophy', start: 'top 72%', toggleActions: 'play none none reverse' }
  });
  gsap.from([philP1, philP2], {
    y: 35, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power2.out',
    scrollTrigger: { trigger: '#philosophy', start: 'top 62%', toggleActions: 'play none none reverse' }
  });
  if (philConcerns) {
    gsap.from(philConcerns.querySelectorAll('.concern-item'), {
      x: -25, opacity: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '#philosophy', start: 'top 55%', toggleActions: 'play none none reverse' }
    });
  }
  if (philVisual) {
    gsap.from(philVisual, {
      x: 80, opacity: 0, scale: 0.95, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '#philosophy', start: 'top 68%', toggleActions: 'play none none reverse' }
    });
  }
}

function animateKineticBand() {
  const track = document.getElementById('kineticTrack');
  if (!track) return;
  gsap.to(track, {
    xPercent: -25, ease: 'none',
    scrollTrigger: { trigger: '#kineticBand', start: 'top bottom', end: 'bottom top', scrub: 1.2 }
  });
}

function animateProducts() {
  const prodLabel = document.getElementById('prodLabel');
  const prodTitle = document.getElementById('prodTitle');
  if (prodLabel) {
    gsap.from(prodLabel, { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: '#products', start: 'top 80%', toggleActions: 'play none none reverse' }
    });
  }
  if (prodTitle) {
    gsap.from(prodTitle, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '#products', start: 'top 75%', toggleActions: 'play none none reverse' }
    });
  }
  ['#product1', '#product2'].forEach((id, i) => {
    const el = document.querySelector(id);
    if (!el) return;
    gsap.from(el, {
      y: 70, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: id, start: 'top 80%', toggleActions: 'play none none reverse' }
    });
    const visual = el.querySelector('.product-3d-wrap');
    if (visual) {
      gsap.to(visual, {
        y: i % 2 === 0 ? -20 : 20, ease: 'none',
        scrollTrigger: { trigger: id, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
    }
  });
}

function animateRoutine() {
  const routTitle = document.getElementById('routTitle');
  const routSub = document.getElementById('routSub');
  const steps = document.querySelectorAll('.routine-step');
  if (!routTitle) return;
  gsap.from([routTitle, routSub], { y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '#routine', start: 'top 78%', toggleActions: 'play none none reverse' }
  });
  steps.forEach((step, i) => {
    gsap.from(step, { y: 50, opacity: 0, duration: 0.7, delay: i * 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: '#routine', start: 'top 65%', toggleActions: 'play none none reverse' }
    });
  });
}

function animateQuality() {
  const cards = document.querySelectorAll('.quality-card');
  cards.forEach((card, i) => {
    gsap.from(card, { y: 50, opacity: 0, duration: 0.7, delay: i * 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '#quality', start: 'top 72%', toggleActions: 'play none none reverse' }
    });
  });
}

function animateContact() {
  const cLabel = document.getElementById('cLabel');
  const cTitle = document.getElementById('cTitle');
  const cSub = document.getElementById('cSub');
  const cForm = document.getElementById('cForm');
  if (!cTitle) return;
  gsap.timeline({ scrollTrigger: { trigger: '#contact', start: 'top 75%', toggleActions: 'play none none reverse' } })
    .from(cLabel, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' })
    .from(cTitle, { y: 80, opacity: 0, skewX: -4, duration: 1.1, ease: 'power4.out', clearProps: 'skewX' }, '-=0.1')
    .from(cSub, { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
    .from(cForm, { y: 25, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
}

function setupNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  ScrollTrigger.create({
    trigger: '#philosophy',
    start: 'top 80px',
    onEnter: () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });
}
