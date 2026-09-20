# Creex Digital — website

Next.js (App Router, TypeScript) website for **Creex Digital**, a social media marketing & graphic design studio.
The contact form emails every submission to your inbox via SMTP (Gmail, Zoho, Outlook, cPanel… anything with SMTP).

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in your email settings (see below)
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript check only |

## Contact form → email

`src/components/ContactForm.tsx` posts to `src/app/api/contact/route.ts`, which validates the fields, blocks bots (honeypot + rate limit) and sends an email through `src/lib/email.ts` (Nodemailer).

1. Copy `.env.example` to `.env.local`.
2. Set `CONTACT_TO_EMAIL` to the inbox that should receive submissions.
3. Set the SMTP values for the account that will **send** the notification:
   - **Gmail**: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_SECURE=true`, `SMTP_USER=<your gmail>`, `SMTP_PASS=<App Password>`.
     Create an App Password at Google Account → Security → 2-Step Verification → App passwords (2-Step Verification must be on). Your normal password will not work.
   - Other providers publish the same four values in their "SMTP settings" help page.
4. `CONTACT_FROM_EMAIL` is the sender shown on the notification. Most providers require it to match `SMTP_USER`.

The email's **Reply-To** is set to the visitor's address, so replying in your mail app answers them directly.

**Without SMTP settings** (in development only) the form still works: an Ethereal test inbox is used and a preview link is printed in the terminal. In production, missing settings return a friendly error to the visitor and log the cause.

On Vercel/Netlify etc., add the same variables in the project's environment settings instead of `.env.local`.

## Structure

```
src/
├── app/
│   ├── layout.tsx            Root layout: fonts (next/font/local), header, footer, metadata
│   ├── globals.css           All styles — brand tokens at the top (:root)
│   ├── page.tsx              Home (hero, what we do, services, packages, process, why, testimonials, FAQ, CTA)
│   ├── services/page.tsx
│   ├── about/page.tsx
│   ├── work/page.tsx         Portfolio grid with filters (placeholder tiles — see TODO)
│   ├── contact/page.tsx      Contact form + contact cards
│   ├── privacy-policy/page.tsx
│   ├── terms/page.tsx
│   ├── not-found.tsx         404
│   ├── api/contact/route.ts  POST endpoint that emails the submission
│   ├── robots.ts · sitemap.ts · manifest.ts · favicon.ico
├── components/
│   ├── Header.tsx            Sticky header + mobile drawer (client)
│   ├── Footer.tsx
│   ├── Sections.tsx          Shared blocks: Packages, CtaBand, ProcessSteps, Eyebrow, Display, PlatformChips, Breadcrumb
│   ├── ContactForm.tsx       Form → /api/contact, WhatsApp fallback (client)
│   ├── Testimonials.tsx      Scroll-snap carousel (client)
│   ├── WorkGrid.tsx          Filterable portfolio (client)
│   ├── Reveal.tsx            Reveal-on-scroll for `.reveal` elements (client)
│   ├── Art.tsx               Hero orbit graphic + placeholder art
│   ├── Icon.tsx              Inline SVG icon set
│   ├── WhatsAppLink.tsx · LegalPage.tsx
├── lib/
│   ├── site.ts               ★ All content & settings: contact details, nav, packages, services, FAQs, work items
│   └── email.ts              Nodemailer transport + email template
└── fonts/                    Poppins 300–700 + Anton (self-hosted)
public/img/
├── logo/                     logo.svg (white wordmark), logo-dark.svg, logo-stacked*.svg, logo-icon.svg, PNG fallbacks
└── favicon/
```

## Editing content

Almost everything you'd want to change lives in **`src/lib/site.ts`**: contact details, WhatsApp number, socials, package prices/features, service copy, process steps, FAQs, testimonials and portfolio items. Page files only lay that data out.

## Brand

| Token | Value |
|---|---|
| Pink | `#FF0B6B` |
| Violet | `#3E1ADB` |
| Gradient | `linear-gradient(90deg, #FF0B6B, #3E1ADB)` (logo & buttons) / `180deg` for display headings |
| Background | `#0B0B0F` · surfaces `#15151C` / `#1C1C25` |
| Display font | Anton (the condensed face used for "Packages" in the deck) |
| Body font | Poppins |

Tokens are CSS custom properties in `src/app/globals.css` → `:root`.

## TODO before going live

1. **Email settings** — `.env.local` (see above). Nothing is delivered until this is done.
2. **Contact details** — `src/lib/site.ts` → `SITE.email`, `SITE.phoneDisplay`, `SITE.whatsappNumber`, `SITE.location`, `SITE.socials`.
3. **Domain** — set `NEXT_PUBLIC_SITE_URL` (used for canonical links, Open Graph, sitemap, robots).
4. **Testimonials** — `TESTIMONIALS` in `src/lib/site.ts` (three sample quotes).
5. **Portfolio** — `WORK` in `src/lib/site.ts`. Add `image: "/img/work/your-file.jpg"` to an item (put the file in `public/img/work/`) to replace its placeholder art.
6. **Legal pages** — generic templates; have them reviewed.

## Deploy

Works on any Node host. On **Vercel**: import the repo, add the environment variables from `.env.example`, deploy. The `/api/contact` route runs on the Node.js runtime (required by Nodemailer).
