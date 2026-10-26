# Abid Hasan Rafi — Personal SEO Portfolio 🌐

**Title:** `Abid Hasan Rafi | SEO Expert at MicroDeft | BBA Student at Canadian University of Bangladesh`

A fully responsive, animated, SEO-optimized single-page personal website for **Abid Hasan Rafi** —
SEO Expert at [MicroDeft](https://microdeft.com/) and BBA student at
[Canadian University of Bangladesh](https://cub.edu.bd/).

## 📁 Structure

```
abid-hasan-rafi-website/
├── index.html          # Main page (rich SEO meta + JSON-LD schema)
├── 404.html            # Custom error page
├── robots.txt          # Crawler instructions
├── sitemap.xml         # Sitemap for Google
├── css/style.css       # Design, animations, responsive layout
├── js/script.js        # Typing effect, counters, scroll reveal, nav
└── assets/
    ├── profile.jpg     # Profile picture
    └── favicon.svg     # Browser tab icon
```

## ✅ SEO Features

- Optimized `<title>` with the exact keyword: **Abid Hasan Rafi**
- Meta description, keywords, canonical, robots directives
- Open Graph + Twitter Card tags (rich social sharing)
- **JSON-LD structured data**: `Person`, `WebSite`, `FAQPage` (rich-result eligible)
- Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `details/faq`)
- Image `alt` text, heading hierarchy (single H1 → H2 → H3)
- `robots.txt` + `sitemap.xml`
- Internal anchor linking, fast single-file CSS/JS, `prefers-reduced-motion` support
- Long-form informative content (About, Insights, FAQ) for topical authority

## 📱 Responsive

Breakpoints: **1024px**, **768px**, **420px** — mobile hamburger menu, fluid typography (`clamp()`),
grid collapse, touch-friendly targets.

## 🚀 Publish on GitHub Pages (manual steps)

1. Create a new **public** repository on GitHub — e.g. `jamesmicahael-svg.github.io`
   (a *username repo* gives you the clean URL `https://USERNAME.github.io/`)
2. From this folder run:

```bash
git init
git add .
git commit -m "Initial commit: Abid Hasan Rafi SEO portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

3. Repo → **Settings → Pages → Source: Deploy from a branch → `main` / root → Save**
4. Site goes live at `https://USERNAME.github.io/` (usually within 1–2 minutes)

## ⚠️ After publishing — update the domain

Replace **`jamesmicahael-svg.github.io`** with your real URL in:

- `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD `url`/`image`)
- `robots.txt` (Sitemap line)
- `sitemap.xml` (all `<loc>` entries)
- `404.html` (canonical)

Then submit `https://YOUR-URL/sitemap.xml` in **Google Search Console**.

## 🔗 Social links used

- Facebook: https://web.facebook.com/abid.hasan.rafi.731010
- LinkedIn: https://www.linkedin.com/in/abid-hasan-rafi-392333329/
- Instagram: https://www.instagram.com/ab_id9630/
