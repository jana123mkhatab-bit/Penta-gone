# 🚀 Quick Start Guide

Welcome to the enhanced SOLARA website! This guide will get you started in minutes.

## ⚡ 30-Second Setup

### Option 1: Direct Browser (Easiest)
1. Navigate to the `solara-website` folder
2. Double-click `index.html`
3. Website opens in your browser ✨

### Option 2: Local Server (Recommended)

**With Python 3:**
```bash
cd solara-website
python -m http.server 8000
```
Open: `http://localhost:8000`

**With Node.js:**
```bash
cd solara-website
npx http-server
```
Open: `http://localhost:8080`

---

## 📁 Project Structure at a Glance

```
solara-website/
├── index.html           ← Main website (open this!)
├── css/
│   ├── styles.css      ← All styling (organized in 16 sections)
│   └── animations.css  ← Keyframe animations
├── js/
│   ├── main.js         ← Initialization hub
│   ├── interactions.js ← Cursor & hover effects
│   ├── animations.js   ← Scroll animations
│   ├── testimonials.js ← Carousel logic
│   └── utils.js        ← Helper functions
├── README.md           ← Full documentation
├── DEPLOYMENT.md       ← How to launch online
└── ENHANCEMENTS.md     ← What was improved
```

---

## 🎨 Common Customizations

### Change Colors
Edit CSS variables in `styles.css` (line ~25):
```css
:root {
  --yellow: #FFE020;      ← Main accent color
  --purple: #2D0A5A;      ← Primary color
  --cream: #FAF5FF;       ← Background color
}
```

### Modify Animation Speed
In `animations.js`, increase `scrub` value (higher = slower):
```javascript
gsap.to(element, {
  x: 100,
  scrub: 1.5,  ← Change this (was 1.2)
});
```

### Update Testimonials
In `testimonials.js`, edit the array (line ~12):
```javascript
const testimonials = [
  {
    text: "Your testimonial here",
    author: "— Your Name",
  },
  // Add more testimonials here
];
```

### Disable Animations
Remove or comment out the import in `main.js`:
```javascript
// import { registerAnimations } from './animations.js';
```

---

## 🎯 What Each File Does

| File | Purpose | When to Edit |
|------|---------|--------------|
| `index.html` | Website content | Add sections, change text, add links |
| `styles.css` | All styling | Change colors, fonts, layout |
| `animations.css` | Animation definitions | Adjust animation speed/effects |
| `main.js` | Initialize everything | Add new modules, change startup order |
| `interactions.js` | Custom cursor, hover effects | Modify cursor behavior |
| `animations.js` | Scroll animations | Adjust scroll-triggered animations |
| `testimonials.js` | Testimonial carousel | Update testimonials, change rotation speed |
| `utils.js` | Helper functions | Add utility functions, adjust particles |

---

## ✅ Browser Testing Checklist

- [ ] Open in Chrome (Desktop)
- [ ] Open in Firefox (Desktop)
- [ ] Open in Safari (if on Mac)
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Scroll through entire page
- [ ] Hover over buttons and links
- [ ] Click testimonial dots
- [ ] Test form submission
- [ ] Check console for errors (F12 → Console)

---

## 🐛 If Something Breaks

### Animations not working?
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for red error messages
4. Check that all files are in correct folders:
   - CSS files in `css/` folder
   - JS files in `js/` folder

### Cursor not visible?
- Cursor only shows with mouse (not trackpad)
- Check JavaScript is enabled
- Refresh page

### Page looks broken on mobile?
- Zoom out to see full page
- Check that viewport meta tag is present (it is!)
- Test in different browser

### Not sure what changed?
1. Check `ENHANCEMENTS.md` for overview
2. Read comments in CSS/JS files
3. Consult `README.md` for detailed info

---

## 📚 Documentation Guide

| Document | Best For |
|----------|----------|
| **This File** | Quick setup & common tasks |
| **README.md** | Understanding structure & features |
| **ENHANCEMENTS.md** | Seeing what was improved |
| **DEPLOYMENT.md** | Launching to production |
| **Code Comments** | Understanding specific code |

---

## 🚢 Ready to Launch Online?

1. Read [DEPLOYMENT.md](DEPLOYMENT.md)
2. Choose a hosting option (Netlify recommended)
3. Upload your files
4. Visit your live website! 🎉

---

## 💡 Pro Tips

### Tip 1: Backup Before Editing
Before making changes, copy the entire `solara-website` folder:
```bash
cp -r solara-website solara-website-backup
```

### Tip 2: Use Comments
When customizing, add comments to remember why:
```css
/* Changed from #FFE020 to match brand guidelines */
--yellow: #F0D000;
```

### Tip 3: Test Mobile First
Always test on mobile devices to ensure responsive design works.

### Tip 4: Clear Browser Cache
If changes don't show: Ctrl+Shift+Del → Clear Cached Images and Files

### Tip 5: Use Developer Tools
- F12 to open Developer Tools
- Inspect element to see CSS
- Console for JavaScript errors

---

## 🎯 Next Steps

1. **Get Familiar**: Scroll through the website, note what you like
2. **Customize**: Change colors and text to match your brand
3. **Test**: Open on different devices and browsers
4. **Deploy**: Follow DEPLOYMENT.md to launch online
5. **Monitor**: Add analytics to track visitors

---

## 📞 Need Help?

### Check These First
1. Console for errors (F12 → Console tab)
2. File structure (are files in correct folders?)
3. File paths (are imports pointing to correct files?)
4. Comments in code (most files have detailed comments)

### Common Issues & Fixes

**Issue**: "Cannot find module"
- **Fix**: Check file paths and folder structure match

**Issue**: Animations running backwards
- **Fix**: Check scroll trigger `start` and `end` values

**Issue**: Styling looks different
- **Fix**: Clear browser cache (Ctrl+Shift+Del)

**Issue**: Mobile looks broken
- **Fix**: Make browser window narrower, test at different sizes

---

## 🎓 Learning Resources

- **GSAP Animations**: https://greensock.com/get-started/
- **CSS Fundamentals**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **JavaScript Modules**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- **Web Accessibility**: https://www.w3.org/WAI/fundamentals/

---

## 📋 File Checklist

Before uploading to production, verify:

- [x] `index.html` exists and loads
- [x] `css/` folder contains `styles.css` and `animations.css`
- [x] `js/` folder contains all 5 JavaScript files
- [x] All external links work
- [x] Custom fonts load (Playfair Display, DM Sans)
- [x] GSAP library loads from CDN
- [x] ScrollTrigger plugin loads from CDN
- [x] No console errors (F12 → Console)
- [x] Mobile responsive (test at 320px, 768px, 1024px)
- [x] Animations play smoothly

---

## 🎉 You're Ready!

Your SOLARA website is now fully enhanced, documented, and ready to customize!

**Happy building! 🚀**

For detailed information, visit:
- 📖 [README.md](README.md) - Full documentation
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Launch guide
- 📝 [ENHANCEMENTS.md](ENHANCEMENTS.md) - What was improved
