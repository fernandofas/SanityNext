# Copilot Coding Agent Instructions for SanityNext

## Big Picture Architecture
- This monorepo contains two main apps:
  - `nextsite/`: Next.js 15 App Router frontend (React 19, Tailwind CSS 3)
  - `sanitydev/`: Sanity Studio v3 backend (content editing, schemas)
- Content is authored in Sanity Studio and rendered in the Next.js frontend via GROQ queries and the Sanity client.
- Key schema files: `sanitydev/schemas/` (e.g., `page.ts`, `sections.ts`, `columnSections.ts`, `slider.ts`, `form.ts`)
- Data flows: Sanity Studio → GROQ API → Next.js frontend (PortableText, custom renderers)
- Sanity project ID: `2utyyftn` | Dataset: `production`
- GitHub: https://github.com/fernandofas/SanityNext (private)

## Developer Workflows
- **Frontend:**
  - Start: `npm run dev` in `nextsite/` (port 3000)
  - Build: `npm run build` in `nextsite/`
  - Lint: `npm run lint` in `nextsite/`
- **Sanity Studio:**
  - Start: `sanity dev` in `sanitydev/` (port 3333)
  - Schemas: Edit/add in `sanitydev/schemas/`, then restart Studio
- **TypeScript:**
  - Check: `npx tsc --noEmit` in `nextsite/`

## Project-Specific Patterns
- **Schema References:**
  - Use `->` or `@->` in GROQ queries to dereference references (e.g., sections, columnSections).
  - Example: `content[]{ ..., _type == "sections" => @-> }`
- **PortableText Rendering:**
  - Custom renderers in `nextsite/components/pte.tsx` handle rich text and embedded objects.
- **Color fields:**
  - All color fields use `type: 'string'` (plain CSS: hex, rgba, CSS variable).
  - Never use `@sanity/color-input` for new fields. Pass strings directly as inline styles.
- **Styling:**
  - Tailwind CSS 3 for layout and utilities (`tailwind.config.js`).
  - Background images/colors for sections/columns are set via inline style props from Sanity data.
- **Menu/Navigation:**
  - Menus are fetched from Sanity (`menu` schema) and rendered in `header.tsx`.
  - Submenus collapse on link click by setting state (`openItem` to `null`).
- **Overflow/Slider:**
  - `.containerover` uses `overflow: visible` (NOT `overflow: hidden`) to allow slider arrows to render outside the content box.
  - `html { overflow-x: hidden; }` prevents horizontal scrollbar from overflow-visible elements.

## Integration Points
- **Sanity Client:**
  - Configured in `nextsite/lib/sanity.ts`. Used by server components and API routes.
- **GROQ Queries:**
  - All queries centralised in `nextsite/sanity/queries.ts`.
- **Image URLs:**
  - Use `urlFor()` from `nextsite/lib/sanity.ts` for all Sanity images.
- **Auth:**
  - JWT-based, stored in `httpOnly` cookies. Server helpers in `nextsite/lib/auth-server.ts`.
- **Email:**
  - Nodemailer via `nextsite/app/api/contact/route.ts`. SMTP credentials in `.env.local`.

## Key Files & Directories
- `sanitydev/schemas/` — All schema definitions
- `sanitydev/sanity.config.ts` — Studio configuration
- `sanitydev/structure.ts` — Custom desk structure
- `nextsite/sanity/queries.ts` — All GROQ queries
- `nextsite/components/PageRenderer.tsx` — Maps section types to React components
- `nextsite/components/pte.tsx` — PortableText custom components
- `nextsite/components/SliderBlock.tsx` — Slider/carousel component
- `nextsite/components/ContactForm.tsx` — Contact form
- `nextsite/components/header.tsx` — Menu and navigation logic
- `nextsite/components/footer.tsx` — Footer menus and logo
- `nextsite/lib/sanity.ts` — Sanity client + urlFor()
- `nextsite/lib/auth-server.ts` — JWT helpers
- `nextsite/app/globals.css` — Global styles

## Example: Dereferencing Sections in GROQ
```groq
*[_type == "page" && slug.current == $slug][0]{
  title,
  sections[]{
    ...,
    _type == "sections" => @->,
    columnContent[]{
      ...,
      content[]{
        ...,
        _type == "sections" => @->
      }
    }
  }
}
```

## Notes
- Always restart Sanity Studio after schema changes.
- Use `urlFor()` for all Sanity images — never use `asset.url` directly.
- For new color fields, use `type: 'string'` — not `type: 'color'`.
- For new patterns, check existing files in `sanitydev/schemas/` and `nextsite/components/` for conventions.
- The Sanity 2000-attribute limit is sensitive — prefer `type: 'string'` for colors and avoid deep object nesting in schemas.

