# Deployment Guide

## Local Development

### Quick Start with Python
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Quick Start with Node.js
```bash
npx http-server
```
Then open `http://localhost:8080` in your browser.

### Manual Setup
1. Open `index.html` directly in your browser (file:// protocol)
2. Note: Some animations may not work with file:// protocol due to CORS restrictions

---

## Production Deployment

### Netlify (Recommended)

**Option 1: Git Integration**
1. Push code to GitHub/GitLab/Bitbucket
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select repository
5. Build settings:
   - Build command: (leave blank)
   - Publish directory: (leave blank)
6. Deploy!

**Option 2: Drag & Drop**
1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag and drop your project folder
3. Done!

### Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import Git repository or select folder
4. Deploy!

### GitHub Pages

1. Create a `gh-pages` branch:
```bash
git checkout -b gh-pages
git push origin gh-pages
```

2. Go to repository Settings > Pages
3. Set source to `gh-pages` branch
4. Your site will be live at: `https://username.github.io/solara-website`

### Traditional Hosting (Cpanel, etc.)

1. Upload all files via FTP
2. Directory structure must remain:
```
public_html/
├── index.html
├── css/
│   ├── styles.css
│   └── animations.css
└── js/
    ├── main.js
    ├── interactions.js
    ├── animations.js
    ├── testimonials.js
    └── utils.js
```

3. Set `index.html` as default document
4. Enable gzip compression on server (recommended)
5. Test all scripts are loading correctly

### AWS S3 + CloudFront

1. Create S3 bucket named `solara-website`
2. Upload all files
3. Enable static website hosting
4. Create CloudFront distribution
5. Set origin to S3 bucket
6. Add custom domain via Route53

---

## Performance Optimization

### Before Deployment

1. **Minify CSS & JavaScript**
```bash
# Using online tools or build tools
```

2. **Enable Compression**
- Ask hosting provider to enable gzip
- Set headers: `Content-Encoding: gzip`

3. **Cache Control**
Add headers to `.htaccess` (Apache) or server config:
```
# Cache assets for 1 year
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Don't cache HTML
<FilesMatch "\.html$">
  Header set Cache-Control "max-age=3600, must-revalidate"
</FilesMatch>
```

### Netlify Headers Configuration

Create `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## SSL Certificate

### Automatic (Recommended)
- **Netlify**: Automatic with Let's Encrypt
- **Vercel**: Automatic with Let's Encrypt
- **GitHub Pages**: Automatic with GitHub
- **AWS**: Use ACM (AWS Certificate Manager)

### Manual
- Use [Let's Encrypt](https://letsencrypt.org/) (free)
- Or purchase from certificate provider

---

## DNS Configuration

### For Custom Domain

Point these records to your hosting:
```
Type: A
Name: @ (root)
Value: [hosting provider's IP]

Type: CNAME
Name: www
Value: solara-website.netlify.app (or your domain)
```

**Common DNS Providers:**
- Namecheap
- GoDaddy
- Google Domains
- Route53 (AWS)

---

## SEO Optimization

### Before Launch

1. **Meta Tags** - Already included in HTML:
   - `<title>`: Unique, descriptive
   - `<meta name="description">`: 160 characters
   - `<meta name="viewport">`: Mobile responsive

2. **Add Favicon**
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

3. **Robots.txt**
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

4. **Sitemap.xml** (optional but recommended)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-01</lastmod>
  </url>
</urlset>
```

### Post-Launch

1. Submit to Google Search Console
2. Submit to Bing Webmaster Tools
3. Monitor Core Web Vitals
4. Set up analytics (Google Analytics 4)

---

## Monitoring & Analytics

### Google Analytics 4

Add to `<head>` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Hotjar (Session Recording)

Add to `<head>`:
```html
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:123456,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

---

## Troubleshooting Deployment

### Scripts not loading
- Check file paths are correct
- Verify CORS headers if using CDN
- Check browser console for 404 errors

### Styles not applied
- Ensure CSS files are in `css/` folder
- Check for CSS import path errors
- Clear browser cache

### Animations not working
- Verify GSAP libraries are loading from CDN
- Check that JavaScript files are in `js/` folder
- Enable JavaScript in browser

### Performance issues
- Enable gzip compression
- Use CDN for faster delivery
- Optimize images
- Minify CSS/JS

---

## Post-Deployment Checklist

- [ ] Website loads without errors
- [ ] All links work correctly
- [ ] Animations play smoothly
- [ ] Custom cursor visible
- [ ] Mobile responsive tested
- [ ] Forms functional
- [ ] SSL certificate installed
- [ ] Analytics tracking code added
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Performance optimized
- [ ] Accessibility checked with axe DevTools

---

## Continuous Deployment

### GitHub Actions (Auto-deploy on push)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

---

For questions or issues, refer to the main [README.md](README.md)
