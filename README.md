# Static Portfolio — Ready-to-use Template

This is a small, responsive static portfolio template built with plain HTML, CSS, and JavaScript. It's fluid and works well on phones, tablets, and desktops.

## What’s included
- index.html — main single-page layout (hero, projects, about, contact).
- styles.css — mobile-first responsive styles using CSS Grid/Flexbox, clamp(), CSS variables and dark theme support.
- script.js — renders project cards from a data array, creates SVG placeholder thumbnails, modal for project details, theme toggle and mobile menu.
- README.md — this file.

## How to use
1. Replace the placeholder text (Your Name, email, links) in `index.html`.
2. Update the `projects` array in `script.js` with your real projects and URLs. Replace placeholder images by providing real image URLs (update the `img` `src`).
3. Optionally integrate a contact form service (Formspree, Netlify Forms) if you want a real submission endpoint instead of `mailto:`.

## Deployment
- GitHub Pages: push the repo and enable Pages on the `main` branch (or `gh-pages`).
- Netlify / Vercel: drag & drop or connect the Git repository—these services will auto-deploy static sites.

## Accessibility & Performance notes
- Uses semantic HTML and ARIA attributes for the modal and navigation.
- Images are lazy-loaded and placeholders are SVG data URIs for good first-paint.
- Theme preference is saved in `localStorage`.
- Reduce motion respected via `prefers-reduced-motion`.

## Next improvements (suggestions)
- Replace placeholders with real screenshots and add external links to live demos and repos.
- Add structured data (JSON-LD) and improved SEO meta tags.
- Add analytics or contact form backend if needed.

Enjoy — if you want, I can:
- generate a production-ready deploy config for GitHub Pages or Netlify,
- add a projects JSON file and remote image loading,
- or convert this to a React/Vite starter.