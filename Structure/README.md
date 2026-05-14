# SanityNext

A monorepo combining a **Next.js 15** frontend with a **Sanity Studio v3** backend for building content-driven websites.

- `nextsite/` — Next.js 15 App Router frontend (React 19, Tailwind CSS 3)
- `sanitydev/` — Sanity Studio v3 (content authoring and schema management)

Content flows: Sanity Studio → GROQ API → Next.js frontend (PortableText + custom renderers).

## Prerequisites

- Node.js v18 LTS or later (v22 recommended)
- npm 9+
- Sanity CLI: `npm i -g @sanity/cli`

## Quick Start

Open two terminals:

**Next.js frontend:**
```powershell
cd nextsite
npm install
cp .env.local.example .env.local   # add your Sanity project ID, dataset, and other vars
npm run dev
```
Runs at http://localhost:3000

**Sanity Studio:**
```powershell
cd sanitydev
npm install
sanity dev
```
Runs at http://localhost:3333

## Environment Variables

### nextsite/.env.local
```
NEXT_PUBLIC_SANITY_PROJECT_ID=2utyyftn
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_password
SMTP_FROM=your@email.com
```

### sanitydev/.env
```
SANITY_TOKEN=your_sanity_api_write_token
```

> **Never commit `.env` or `.env.local` files.**

## Project Structure

```
SanityNext/
└─ Structure/
   ├─ nextsite/                        # Next.js 15 App Router frontend
   │  ├─ app/
   │  │  ├─ [slug]/page.tsx            # Dynamic page renderer
   │  │  ├─ blog/                      # Blog listing and post pages
   │  │  ├─ api/                       # API routes (contact, auth, account)
   │  │  ├─ globals.css                # Global styles (Tailwind base + overrides)
   │  │  └─ layout.tsx                 # Root layout (fonts, providers)
   │  ├─ components/
   │  │  ├─ PageRenderer.tsx           # Maps Sanity section types to React components
   │  │  ├─ pte.tsx                    # PortableText custom renderers
   │  │  ├─ SliderBlock.tsx            # Image/content slider
   │  │  ├─ ContactForm.tsx            # Dynamic contact form
   │  │  ├─ header.tsx                 # Navigation / menus
   │  │  ├─ footer.tsx                 # Footer menus and logo
   │  │  ├─ CookieBanner.tsx           # GDPR cookie consent
   │  │  └─ BlogPostContent.tsx        # Blog post renderer
   │  ├─ sanity/
   │  │  └─ queries.ts                 # All GROQ queries
   │  ├─ lib/
   │  │  ├─ sanity.ts                  # Sanity client + image URL builder
   │  │  ├─ auth-server.ts             # JWT auth helpers (server-side)
   │  │  └─ seo.ts                     # SEO metadata helpers
   │  ├─ contexts/
   │  │  ├─ CookieConsentContext.tsx   # Cookie consent state
   │  │  └─ PostHogContext.tsx         # Analytics context
   │  ├─ tailwind.config.js
   │  ├─ next.config.ts
   │  └─ tsconfig.json
   └─ sanitydev/                       # Sanity Studio v3
      ├─ schemas/                      # All document/object schemas
      │  ├─ page.ts                    # Page document
      │  ├─ sections.ts                # Full-width section
      │  ├─ columnSections.ts          # Column-based section
      │  ├─ slider.ts                  # Slider/carousel
      │  ├─ form.ts / formStyle.ts     # Contact form + styling
      │  ├─ blogPost.ts                # Blog post document
      │  ├─ menu.ts / menuItem.ts      # Navigation menus
      │  ├─ headerSettings.ts          # Header configuration
      │  ├─ footerSettings.ts          # Footer configuration
      │  └─ ...                        # accordion, button, icon, video, etc.
      ├─ sanity.config.ts              # Studio config (projectId, plugins)
      ├─ structure.ts                  # Custom desk structure
      └─ tsconfig.json
```

## Scripts

**nextsite:**
| Command | Description |
|---|---|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |

**sanitydev:**
| Command | Description |
|---|---|
| `sanity dev` | Start Studio locally (port 3333) |
| `sanity build` | Build Studio |
| `sanity deploy` | Deploy Studio to Sanity's CDN |

## Key Patterns

### GROQ — Dereference sections
```groq
*[_type == "page" && slug.current == $slug][0]{
  title,
  sections[]{
    ...,
    _type == "sections" => @->,
    columnContent[]{
      ...,
      content[]{ ..., _type == "sections" => @-> }
    }
  }
}
```

### Color fields
Schemas use `type: 'string'` for CSS color values (hex, rgba, CSS variable). Pass directly as inline styles — no conversion needed.

### Images
Always use the `urlFor()` helper from `nextsite/lib/sanity.ts`:
```ts
import { urlFor } from '@/lib/sanity'
urlFor(image).width(800).auto('format').url()
```

### Internal links (PortableText)
GROQ must dereference the slug: `internalLink->{ slug }`.  
In `pte.tsx`, internal links resolve to `/${slug.current}`.

### Auth
JWT-based auth: `login`, `register`, `verify`, `forgot-password`, `reset-password` API routes live in `nextsite/app/api/`. Token stored in an `httpOnly` cookie.

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/contact` | POST | Send email via Nodemailer (SMTP) |
| `/api/login` | POST | Authenticate user, set cookie |
| `/api/register` | POST | Create new user account |
| `/api/verify` | GET | Verify email address |
| `/api/forgot-password` | POST | Send password reset email |
| `/api/reset-password` | POST | Reset password with token |
| `/api/me` | GET | Get current authenticated user |
| `/api/logout` | POST | Clear auth cookie |
| `/api/account` | GET/PUT | Fetch/update account details |

## Troubleshooting

**Internal links resolve to `#`**  
Ensure GROQ includes `internalLink->{ slug }` for all relevant content arrays including nested sections.

**Images broken**  
Always use `urlFor()` — never use `asset.url` directly.

**SMTP 535 auth error**  
Enable "Authenticated SMTP" for the mailbox in Microsoft 365 Exchange Admin Center (`https://aka.ms/smtp_auth_disabled`).

**Sanity "attribute count exceeds 2000" error**  
Reduce `type: 'color'` fields (use `type: 'string'` instead) or delete unused documents. See session history for migration scripts.

**Sanity Studio not reflecting schema changes**  
Restart `sanity dev` after editing any file in `sanitydev/schemas/`.

## Contributing

1. Edit schemas in `sanitydev/schemas/` — restart Studio after changes.
2. Update GROQ queries in `nextsite/sanity/queries.ts` to fetch new fields.
3. Render new content types in `nextsite/components/pte.tsx` or `PageRenderer.tsx`.
4. Commit and push: `git push origin main`.

## Repository

GitHub: https://github.com/fernandofas/SanityNext (private)  
Sanity Project ID: `2utyyftn` | Dataset: `production`

