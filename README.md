# Smart Virtual Business Card (VBC) — React + Tailwind

A production‑ready, mobile‑first microsite for a smart virtual business card. Built with **Vite + React + Tailwind** and lightweight UI primitives inspired by shadcn/ui.

## ✨ Features
- One‑tap actions: Call, WhatsApp, Email, Google Maps
- QR code share + copy link
- Download **vCard (.vcf)**
- Ventures/Projects link tiles
- Social links
- Contact form (Formspree, replace with your endpoint)
- SEO/OpenGraph tags
- Ready for **Vercel** deploy

## 🚀 Quickstart
```bash
# 1) Install
npm i

# 2) Run locally
npm run dev

# 3) Build for production
npm run build
npm run preview
```

> Node 18+ recommended.

## 🔧 Configure
Edit links and names inside `src/components/VBCMicrosite.jsx`:

```js
const LINKS = {
  phone: '+2348039254849',
  whatsapp: 'https://wa.me/2348039254849?...',
  email: 'mailto:huzaifa@huzex.ng',
  maps: 'https://maps.google.com/?q=...',
  site: 'https://huzex.ng',
  linkedin: '...',
  twitter: '...',
  facebook: '...',
  instagram: '...',
  youtube: '...',
  permalink: 'https://huzex.ng/huzaifa',
}
```

### Contact Form
- Create a free Formspree form: https://formspree.io
- Replace `https://formspree.io/f/your_form_id` in the `<form action>` attribute.

### Images/Logos
- Replace `LOGOS.avatar` (headshot) and other placeholders with your hosted images (or add to `/public` and reference relatively).

## 📦 Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Vite** (auto-detected)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Set a custom domain (e.g., `card.huzex.ng`) in Vercel **Domains**.

## 🔍 Analytics (Optional)
- Add Google Analytics by inserting your GA tag into `index.html` (`<head>`). Example:
```html
<!-- GA4 (replace G-XXXXXXX) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

## 🧠 Notes
- The QR image uses an external API for convenience. You may replace it with a self‑hosted QR generator later.
- UI primitives (`Button`, `Card`, `Input`, `Textarea`) are small Tailwind components—no separate CSS framework required.
- If you want a dark/brand color theme tweak, edit Tailwind classes directly.

## 🛟 Support
If you want me to tailor the design to **Kirkira/Huzex** brand guidelines and add extra sections (PDF download hub, lead routing, Calendly, Plausible analytics), I can extend this codebase.
