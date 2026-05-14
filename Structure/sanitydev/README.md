# SanityNext — Sanity Studio v3

This is the **Sanity Studio** for the SanityNext project. It provides the content editing interface connected to the `production` dataset of Sanity project `2utyyftn`.

## Getting Started

```powershell
npm install
sanity dev
```

Studio runs at http://localhost:3333

## Scripts

| Command | Description |
|---|---|
| `sanity dev` | Start Studio locally |
| `sanity build` | Build Studio for deployment |
| `sanity deploy` | Deploy Studio to Sanity's CDN |
| `sanity dataset export production dataset-backup.tar.gz` | Export dataset |
| `sanity dataset import fixed-backup.tar.gz production --replace` | Import/restore dataset |

## Schema Overview

All schemas live in `schemas/`. Document types:

| Schema | Description |
|---|---|
| `page` | Website pages (slug, sections, SEO) |
| `blogPost` | Blog articles |
| `sections` | Full-width content section (ref'd from page) |
| `columnSections` | Multi-column section layout |
| `slider` | Image/content slider |
| `form` | Contact form document |
| `formStyle` | Styling for form elements |
| `menu` / `menuItem` | Navigation menus |
| `headerSettings` | Header logo, nav, CTA |
| `footerSettings` | Footer layout and links |
| `cookieBanner` | GDPR cookie consent text/styles |
| `blogSearchStyle` | Blog search UI styles |
| `globalSettings` | Site-wide settings |
| `webSettings` | SEO and analytics settings |
| `author` / `category` | Blog taxonomy |

## Color Fields

All color fields in schemas use **`type: 'string'`** (plain CSS values: hex, rgba, CSS variable). Do **not** use `@sanity/color-input` for new color fields — pass the string directly to inline styles in the frontend.

## Desk Structure

Custom desk structure is defined in `structure.ts`. The `deskStructure.ts` file provides singleton document handling for settings documents.

## Notes

- Always restart `sanity dev` after editing schema files.
- Sanity project ID: `2utyyftn` | Dataset: `production`
- Frontend (Next.js) queries this dataset via GROQ — see `../nextsite/sanity/queries.ts`.
- API write token is stored in `.env` (never commit this file).

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Reference](https://www.sanity.io/docs/groq)
- [Sanity Community](https://www.sanity.io/community)

