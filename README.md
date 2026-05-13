# SOLARA — Premium Sun Protection Website

A luxury minimalist website showcasing premium mineral sunscreen products with sophisticated scroll-driven animations and interactions.

## 📁 Project Structure

```
solara-website/
├── index.html                    # Main HTML file (organized, semantic, accessible)
├── css/
│   ├── styles.css               # Main stylesheet (organized by component)
│   └── animations.css           # CSS keyframe animations
├── js/
│   ├── main.js                  # Application entry point & initialization
│   ├── interactions.js          # Cursor & interactive element handlers
│   ├── animations.js            # GSAP scroll animations & ScrollTrigger
│   ├── testimonials.js          # Testimonial carousel module
│   └── utils.js                 # Utility functions & helpers
└── README.md                    # This file
```

## ✨ Features

### 🎨 Design & UX
- **Luxury Aesthetic**: Elegant color palette with purple, gold, and cream
- **Custom Cursor**: Tracked cursor with animated ring effect
- **Smooth Animations**: Scroll-driven animations using GSAP & ScrollTrigger
- **Responsive Design**: Mobile-optimized layout
- **Accessibility**: Full keyboard navigation, ARIA labels, reduced-motion support

### 🎬 Animation Features
- **Hero Parallax**: Dynamic sun element with pulsing glow
- **Marquee Effect**: Velocity-based skew on scrolling text
- **Line Reveals**: Theatrical title animations with clipped text
- **Horizontal Scroll**: Pinned products section with smooth horizontal scrolling
- **Velocity Skew**: Dynamic perspective distortion based on scroll speed
- **Testimonial Carousel**: Auto-rotating with manual controls
- **Progress Bar**: Visual scroll position indicator

### 📱 Responsive Breakpoints
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (480px - 767px)
- Small Mobile (< 480px)

## 🚀 Getting Started

### Installation

1. **No build step required** - this is a vanilla HTML/CSS/JavaScript project
2. Open `index.html` in a modern web browser
3. All animations will work automatically

### Browser Requirements
- Chrome/Edge: Latest (Chromium 88+)
- Firefox: Latest (87+)
- Safari: Latest (14+)
- Mobile browsers: Latest versions

## 📚 File Descriptions

### HTML Structure (`index.html`)

**Organized by semantic sections:**
- Navigation header with smooth scroll
- Hero section with animated elements
- About section with line reveals
- Kinetic band (horizontal scrolling text)
- Products section (horizontal pin scroll)
- Ingredients section (4-column grid)
- Testimonials section (carousel)
- Contact/Newsletter signup
- Footer

**Accessibility Features:**
- Semantic HTML5 tags (`<section>`, `<article>`, `<nav>`, `<footer>`)
- ARIA labels and roles
- Form validation (email input required)
- Keyboard navigation support
- Focus indicators

### CSS Files

#### `styles.css`
**Comprehensive stylesheet organized into 16 sections:**

1. **Root & Reset**: CSS variables and base styles
2. **Custom Cursor**: Styled cursor elements
3. **Progress Bar**: Scroll indicator styling
4. **Navigation**: Fixed header with scroll transitions
5. **Hero Section**: Title, buttons, scroll hints
6. **Marquee**: Scrolling feature banner
7. **About Section**: Typography, stats, visuals
8. **Kinetic Band**: Hover-interactive text
9. **Products Section**: Card grid and pricing
10. **Slash Divider**: Diagonal section separator
11. **Ingredients**: 4-column grid of product components
12. **Testimonials**: Quote styling and carousel controls
13. **Contact**: Newsletter signup form
14. **Footer**: Copyright and branding
15. **Accessibility**: Focus states, reduced-motion, high-contrast
16. **Responsive Design**: Mobile breakpoints

**CSS Variables (Root):**
- Color palette (cream, sand, gold, purple variants, yellow)
- Transition durations (fast, normal, slow)
- Spacing scale (xs to xl)

#### `animations.css`
**CSS keyframe animations:**
- `pulse-sun`: Sun glow pulsing effect
- `rotate-rays`: Sun rays rotation
- `float-particle`: Particle floating animation
- `scroll-line`: Scroll hint line animation
- `fade-up`: Entrance animation
- `marquee`: Continuous horizontal scroll

### JavaScript Modules

#### `main.js` (Entry Point)
**Coordinates initialization of all modules**
- Waits for DOM to load
- Initializes cursor
- Registers animations
- Starts testimonial carousel
- Creates particles
- Setup progress tracking

#### `interactions.js` (Cursor & Interactivity)
**Manages user interactions:**
- `initializeCursor()`: Tracks mouse movement with smooth trailing
- `setupInteractiveElements()`: Scales cursor ring on hover

**Constants:**
- `CURSOR_SIZE`: Cursor dot size
- `CURSOR_RING_SIZE`: Ring diameter
- `RING_SCALE_HOVER`: Scale on element hover

#### `animations.js` (Scroll Animations)
**GSAP ScrollTrigger animations organized by section**

**Core Function:**
- `registerAnimations()`: Main entry point that initializes all animations

**Animation Functions:**
1. `animateHero()`: Parallax sun, fade content
2. `animateMarquee()`: Velocity-based skew
3. `animateAbout()`: Line reveals, stats, visual slide
4. `animateKineticBand()`: Horizontal text scroll
5. `animateProducts()`: Horizontal pin scroll
6. `animateSlashDivider()`: Wipe effect
7. `animateIngredients()`: Background parallax, card stagger
8. `animateTestimonials()`: Scale reveal timeline
9. `animateContact()`: Title and form fade-in
10. `setupNavScroll()`: Navigation background on scroll

**Advanced Techniques:**
- Velocity-based skewing for dynamic effects
- `scrub` parameter for scroll-linked animations
- Timeline sequencing for orchestrated reveals
- Lerp-based smooth trailing animations

#### `testimonials.js` (Carousel Module)
**Manages testimonial rotation and interaction**

**Exports:**
- `initializeTestimonials()`: Setup carousel
- `stopAutoRotation()`: Cleanup function

**Functions:**
- `setupDotControls()`: Manual navigation
- `switchTestimonial()`: Animated transition between testimonials
- `startAutoRotation()`: Auto-cycle every 5 seconds
- `resetAutoRotation()`: Reset timer on user interaction

**Data:**
- Array of 3 testimonials with text and author

#### `utils.js` (Helper Functions)
**Utility functions for common tasks**

**Exported Functions:**
- `createParticles()`: Generate animated floating particles
- `setupScrollProgress()`: Update progress bar on scroll
- `debounce()`: Debounce event handlers
- `throttle()`: Throttle performance-critical handlers
- `smoothScrollTo()`: GSAP-powered smooth scroll
- `isInViewport()`: Check element visibility
- `preloadImages()`: Preload image URLs

**Configuration Constants:**
- Particle creation interval and lifetime
- Particle size and animation ranges

## 🎯 Performance Optimizations

1. **CSS Variables**: Reduced redundancy in color and spacing definitions
2. **will-change**: Applied to animated elements for GPU acceleration
3. **Debouncing**: Event handlers debounced to prevent excessive calls
4. **Lazy Loading**: Particles created on-demand
5. **Efficient Selectors**: Minimized DOM queries with proper caching
6. **Animation Scrubbing**: GSAP scrub parameter eliminates need for keyframe calculations

## ♿ Accessibility Features

### Keyboard Navigation
- `Tab` to navigate interactive elements
- `Enter` to activate buttons and links
- Focus indicators visible on all interactive elements

### ARIA Labels
- Navigation roles and landmarks
- Progress bar with `aria-valuenow`
- Testimonial pagination with `role="tablist"`
- Image decorations marked as `aria-hidden`

### Reduced Motion
- Animations disabled for users with `prefers-reduced-motion`
- Page remains fully functional without animations

### High Contrast Mode
- Improved text contrast for accessibility settings
- Readable without reduced transparency

### Form Accessibility
- Email input with proper labeling
- Submit button with clear purpose
- Error handling for invalid input

## 🔧 Customization Guide

### Changing Colors
Edit CSS variables in `styles.css` root section:
```css
:root {
  --yellow: #FFE020;
  --purple: #2D0A5A;
  /* ... */
}
```

### Adjusting Animation Speed
Modify `scrub`, `duration`, and `delay` values in `animations.js`:
```javascript
gsap.to(element, {
  property: value,
  duration: 0.8,  // Increase for slower animations
  scrub: 1.5,     // Increase for faster scroll-sync
});
```

### Adding Testimonials
Edit the testimonials array in `testimonials.js`:
```javascript
const testimonials = [
  {
    text: "Your testimonial here",
    author: "— Author Name",
  },
  // Add more...
];
```

### Particle Configuration
Adjust in `utils.js`:
```javascript
const PARTICLE_CONFIG = {
  creationInterval: 800,  // Time between particles
  lifetime: 12000,        // Particle lifespan
};
```

## 📊 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Latest | Full support |
| Firefox | ✅ Latest | Full support |
| Safari | ✅ 14+ | Full support |
| Edge | ✅ Latest | Full support |
| Mobile Safari | ✅ 14+ | Touch cursor disabled |
| Chrome Mobile | ✅ Latest | Full support |

## 🐛 Troubleshooting

### Animations not playing
- Check that GSAP libraries are loading (network tab)
- Ensure JavaScript is enabled
- Clear browser cache

### Cursor not visible
- Custom cursor requires JavaScript enabled
- Check that cursor element IDs match in HTML and JS

### Scroll animations jumping
- ScrollTrigger may need refresh on resize
- Check for conflicting CSS transforms
- Verify GSAP version compatibility

### Performance issues
- Disable particles on low-end devices
- Reduce animation complexity
- Check for excessive DOM manipulation

## 📝 Code Standards

### JavaScript Style
- ES6 modules with proper exports
- JSDoc comments for all functions
- Consistent naming conventions
- No global variables (except GSAP/ScrollTrigger)

### CSS Organization
- Organized by component with section headers
- CSS variables for all repeated values
- Mobile-first responsive design
- Semantic class naming

### HTML Structure
- Semantic HTML5 elements
- Proper heading hierarchy
- ARIA labels where needed
- Form elements properly associated

## 📄 License

This project is provided as-is for educational and commercial use.

## 🎓 Learning Resources

### GSAP Documentation
- [GSAP Getting Started](https://greensock.com/get-started/)
- [ScrollTrigger Plugin](https://greensock.com/scrolltrigger/)
- [Animation Easing](https://greensock.com/ease-visualizer/)

### Web Standards
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)

---

**Built with ❤️ for luxury brands and premium web experiences**
