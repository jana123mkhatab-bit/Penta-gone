/* PENTA-GONE — Main Entry Point */

import {
  initializeCursor,
  setupInteractiveElements,
  setupMobileMenu,
  setupProductTabs,
  setupProductGallery,
  setupContactForm,
  setupMagneticButtons,
  spawnFloatingPentagons,
  setupMouseLighting,
} from './interactions.js';
import { registerAnimations } from './animations.js';
import { createParticles, createGlobalSparkles, setupScrollProgress } from './utils.js';

function initialize() {
  initializeCursor();
  setupInteractiveElements();
  setupMobileMenu();
  setupProductTabs();
  setupProductGallery();
  setupContactForm();
  setupMagneticButtons();
  spawnFloatingPentagons();
  createParticles();
  createGlobalSparkles();
  setupScrollProgress();
  registerAnimations();
  setupMouseLighting();
  console.log('✓ Penta-gone futuristic theme initialized');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
