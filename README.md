# Orange International Spa — Bengaluru

Portfolio/marketing website for the Bengaluru (Kammanahalli) branch of Orange
International Spa. Built as a single-page site, visually distinct from the
Morbi branch's site, using a "Royal Emerald + Gold" palette derived from the
brand's gold logo mark.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, config lives in `src/index.css` under `@theme`)
- **Three.js** — a decorative 3D emblem in the hero (gold ring + lathed bud
  form echoing the logo's circle-and-bud motif), lazy-loaded as its own chunk
- **i18next / react-i18next** — English + Kannada bilingual toggle (persisted
  in `localStorage`)

## Getting started

```bash
npm install
npm run dev       # local dev server, usually http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/       All page sections + shared UI (Navbar, Hero, About,
                     Services, ServiceCard, Gallery, Contact, Footer,
                     FloatingActions, Icons)
  three/            HeroEmblem.jsx — the Three.js scene, lazy-loaded
  data/
    business.js     Single source of truth for phone number, address, hours,
                     and the tel:/wa.me/maps link builders. Edit this file if
                     any contact detail changes.
    services.js     Auto-generated from the provided services JSON — 30
                     services across 10 categories, with English + Kannada
                     names.
  i18n/
    en.json / kn.json   UI copy in both languages
    config.js           i18next setup
public/
  images/logo.webp  Logo mark extracted from the uploaded PNG (background
                     removed) for use in the navbar/footer
  favicon-*.png, apple-touch-icon.png
```

## Content notes / things to double-check before launch

- **Kannada UI copy** (buttons, headings, section text I wrote — not the
  service names, which you supplied): please have a native Kannada speaker
  proof this before it goes live. Service *names* were already provided in
  Kannada in your data and used as-is; service *descriptions* fall back to
  English wherever a Kannada description wasn't supplied in the source data
  (all `description_kn` / `benefits_kn` fields were empty in the JSON you
  gave me), so nothing was invented there.
- **Gallery section** is a deliberate "coming soon" placeholder since photos
  aren't ready yet. Swap in real photos by editing `src/components/Gallery.jsx`
  when they're available — happy to wire up a proper photo grid at that point.
- **Tagline** ("The Art of Stillness, Refined.") was written for this brief
  since none existed — change it in `src/i18n/en.json` / `kn.json` under
  `hero.headline` and `footer.tagline` if you'd like something different.
- Contact details (phone, WhatsApp, address, hours) are wired from
  `src/data/business.js` — update there only, everything else reads from it.
