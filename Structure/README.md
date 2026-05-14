# HyperCMS Monorepo

This monorepo contains:

- hypersite/ — React (CRA) frontend
- sanitydev/ — Sanity Studio schemas/backend

Content flows: Sanity Studio → GROQ API → React frontend (PortableText renderers).

## Quick start

Frontend
- cd hypersite
- npm install
- Create .env (see below)
- npm start

Sanity Studio
- cd sanitydev
- npm install
- sanity dev

## Notable files

- hypersite/src/lib/sanity.ts — centralized Sanity client + image URL builder
- hypersite/src/PageDetail.tsx — page rendering and GROQ query for nested sections
- hypersite/src/components/pte.tsx — PortableText custom components (buttons, images, forms, etc.)
- hypersite/src/components/header.tsx — header/menu logic
- hypersite/src/components/footer.tsx — footer menus and logo
- hypersite/server/contact.js — Nodemailer transport (Office 365)

## Patterns

- Dereference internal links in GROQ: internalLink->{ slug }
- Use urlFor() for images from Sanity
- Background images/colors applied via inline styles from Sanity color fields

## Email (Office 365)

- Uses STARTTLS on port 587 (secure=false, requireTLS=true, TLS >=1.2)
- Authenticated SMTP must be enabled for the mailbox in Microsoft 365

## Scripts

Frontend (in hypersite)
- npm start
- npm run build
- npm test

Sanity Studio (in sanitydev)
- sanity dev
- sanity build

## Troubleshooting

- Configuration must contain projectId/dataset: ensure REACT_APP_ vars are set and dev server restarted.
- Internal links render as #: ensure GROQ projects internalLink->{ slug } for relevant PT items/sections.
- Images: Always use urlFor(source).auto('format') for proper URLs.

---

See .github/copilot-instructions.md for architecture and patterns.# HyperCMS Monorepo

React + Sanity monorepo for SanityNext.

- hypersite/: React frontend (Create React App)
- sanitydev/: Sanity Studio (content authoring)

Content flows: Sanity → GROQ → React (PortableText + custom renderers).

## Prerequisites

- Node.js LTS (v18+ recommended)
- npm 9+ (or pnpm/yarn)
- Sanity CLI: npm i -g @sanity/cli

## Quick Start

1) Clone and install
- Open two terminals (or use VS Code split terminals).

Frontend:
```powershell
cd hypersite
npm install
npm start
```

Sanity Studio:
```powershell
cd sanitydev
npm install
sanity dev
```

Frontend runs on http://localhost:3000  
Sanity Studio runs on http://localhost:3333 (by default)

## Project Structure

```
hypercms/
├─ hypersite/                # React app (CRA)
│  ├─ src/
│  │  ├─ PageDetail.tsx      # Main page renderer + GROQ client
│  │  ├─ components/
│  │  │  ├─ pte.tsx          # PortableText renderers (buttons, links, images, forms)
│  │  │  └─ header.tsx       # Menus and navigation
│  │  └─ index.css           # Global styles / Tailwind output
│  └─ server/                # API routes (email, etc.)
│     ├─ index.js            # Express server bootstrap
│     └─ contact.js          # /api/contact (POST) + /api/contact/verify (GET)
└─ sanitydev/                # Sanity Studio
   └─ schemas/               # page, sections, columnSections, form, etc.
```

## Scripts

Frontend (hypersite):
- npm start — start CRA dev server (port 3000)
- npm run build — production build
- npm test — tests (if present)

Sanity Studio (sanitydev):
- sanity dev — start Studio locally
- sanity build — build Studio
- sanity deploy — deploy Studio

## API

Email:
- POST /api/contact — Send form submissions via SMTP (Office 365)
- GET /api/contact/verify — Nodemailer transporter.verify() health check

Example verify (PowerShell):
```powershell
Invoke-RestMethod -Method Get -Uri http://localhost:3000/api/contact/verify
```

## Content & Rendering Notes

- Sections: In GROQ, dereference nested sections and column content with @-> where needed.
- Buttons/Links (PortableText in pte.tsx):
  - Supports linkType: internal | external | email
  - Internal pages require slug dereferencing in GROQ:
    - internalLink->{ slug }
  - Href building:
    - internal → `/${slug.current}`
    - external → externalUrl
    - email → `mailto:${emailAddress}`
- Forms:
  - Button colors: submitBgColor, submitTextColor, submithoverBackgroundColor, submithoverTextColor
  - Frontend applies colors via CSS variables and props.

- Images (pte.tsx):
  - Alt priority: value.alt → asset.altText → asset.title → cleaned originalFilename (extension removed) → “SanityNext”.

## Troubleshooting

- Internal link resolves to “#”:
  - Ensure GROQ query includes: `internalLink->{ slug }` for all content arrays (including nested sections/columns).
- “Cannot GET /api/contact” in browser:
  - Endpoint is POST-only; this message is expected on direct GET. Use the verify endpoint or submit the form.
- SMTP 535 “SmtpClientAuthentication is disabled…”:
  - Enable “Authenticated SMTP” for the mailbox in Exchange Admin Center.
  - If MFA is enabled, use an app password or switch to OAuth2 (Modern Auth).
- TLS errors (wrong version number):
  - On 587, use `SMTP_SECURE=false` (STARTTLS). On 465, use `SMTP_SECURE=true`.

## Contributing

- Edit schemas in sanitydev/schemas/. Restart Studio after changes.
- Update queries in hypersite/src/PageDetail.tsx to fetch new fields.
- Render new types in hypersite/src/components/pte.tsx.

## Prerequisites

- Node.js LTS (v18+ recommended)
- npm 9+ (or pnpm/yarn)
- Sanity CLI: npm i -g @sanity/cli

## Quick Start

1) Clone and install
- Open two terminals (or use VS Code split terminals).

Frontend:
```powershell
cd hypersite
npm install
npm start
```

Sanity Studio:
```powershell
cd sanitydev
npm install
sanity dev
```

Frontend runs on http://localhost:3000  
Sanity Studio runs on http://localhost:3333 (by default)

## Project Structure

```
hypercms/
├─ hypersite/                # React app (CRA)
│  ├─ src/
│  │  ├─ PageDetail.tsx      # Main page renderer + GROQ client
│  │  ├─ components/
│  │  │  ├─ pte.tsx          # PortableText renderers (buttons, links, images, forms)
│  │  │  └─ header.tsx       # Menus and navigation
│  │  └─ index.css           # Global styles / Tailwind output
│  └─ server/                # API routes (email, etc.)
│     ├─ index.js            # Express server bootstrap
│     └─ contact.js          # /api/contact (POST) + /api/contact/verify (GET)
└─ sanitydev/                # Sanity Studio
   └─ schemas/               # page, sections, columnSections, form, etc.
```

## Environment

Frontend (Sanity client configured in src/PageDetail.tsx):
- Set projectId/dataset/API version inside the file (or wire to .env if preferred).

Notes:
- 587 uses STARTTLS (secure=false). 465 would use implicit TLS (secure=true).
- Office 365 requires “Authenticated SMTP” enabled for the mailbox (and possibly org). See https://aka.ms/smtp_auth_disabled.

## Scripts

Frontend (hypersite):
- npm start — start CRA dev server (port 3000)
- npm run build — production build
- npm test — tests (if present)

Sanity Studio (sanitydev):
- sanity dev — start Studio locally
- sanity build — build Studio
- sanity deploy — deploy Studio

## API

Email:
- POST /api/contact — Send form submissions via SMTP (Office 365)
- GET /api/contact/verify — Nodemailer transporter.verify() health check

Example verify (PowerShell):
```powershell
Invoke-RestMethod -Method Get -Uri http://localhost:3000/api/contact/verify
```

## Content & Rendering Notes

- Sections: In GROQ, dereference nested sections and column content with @-> where needed.
- Buttons/Links (PortableText in pte.tsx):
  - Supports linkType: internal | external | email
  - Internal pages require slug dereferencing in GROQ:
    - internalLink->{ slug }
  - Href building:
    - internal → `/${slug.current}`
    - external → externalUrl
    - email → `mailto:${emailAddress}`
- Forms:
  - Button colors: submitBgColor, submitTextColor, submithoverBackgroundColor, submithoverTextColor
  - Frontend applies colors via CSS variables and props.

- Images (pte.tsx):
  - Alt priority: value.alt → asset.altText → asset.title → cleaned originalFilename (extension removed) → “SanityNext”.

## Troubleshooting

- Internal link resolves to “#”:
  - Ensure GROQ query includes: `internalLink->{ slug }` for all content arrays (including nested sections/columns).
- “Cannot GET /api/contact” in browser:
  - Endpoint is POST-only; this message is expected on direct GET. Use the verify endpoint or submit the form.
- SMTP 535 “SmtpClientAuthentication is disabled…”:
  - Enable “Authenticated SMTP” for the mailbox in Exchange Admin Center.
  - If MFA is enabled, use an app password or switch to OAuth2 (Modern Auth).
- TLS errors (wrong version number):
  - On 587, use `SMTP_SECURE=false` (STARTTLS). On 465, use `SMTP_SECURE=true`.

## Contributing

- Edit schemas in sanitydev/schemas/. Restart Studio after changes.
- Update queries in hypersite/src/PageDetail.tsx to fetch new fields.
- Render new types in hypersite/src/components/pte.tsx.

## Deployment

- GitHub
  - Initialize repo and push:
    ```powershell
    git init
    git branch -M main
    git remote add origin https://github.com/SanityNext/SanityNext-website.git
    git add .
    git commit -m "Initial commit"
    git push -u origin main
    ```
- Frontend hosting (Netlify/Vercel/Static):
  - Build with `npm run build` in hypersite/.
- Sanity Studio hosting:
  - `sanity deploy` from sanitydev/ (requires Sanity project).

---
