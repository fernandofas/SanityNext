# Copilot Coding Agent Instructions for HyperCMS

## Big Picture Architecture
- This monorepo contains two main apps:
  - `hypersite/`: React frontend (Create React App)
  - `sanitydev/`: Sanity Studio backend (content editing, schemas)
- Content is authored in Sanity Studio and rendered in the React frontend via GROQ queries and the Sanity client.
- Key schema files: `sanitydev/schemas/` (e.g., `page.ts`, `sections.ts`, `columnSections.ts`)
- Data flows: Sanity Studio → GROQ API → React frontend (PortableText, custom renderers)

## Developer Workflows
- **Frontend:**
  - Start: `npm start` in `hypersite/` (port 3000)
  - Build: `npm run build` in `hypersite/`
  - Test: `npm test` in `hypersite/`
- **Sanity Studio:**
  - Start: `sanity dev` in `sanitydev/`
  - Schemas: Edit/add in `sanitydev/schemas/`, then restart Studio
- **Content Preview:**
  - Live preview and visual editing are integrated via custom hooks/components in the frontend.

## Project-Specific Patterns
- **Schema References:**
  - Use `->` or `@->` in GROQ queries to dereference references (e.g., sections, columnSections).
  - Example: `content[]{ ..., _type == "sections" => @-> }`
- **PortableText Rendering:**
  - Custom renderers in `hypersite/src/components/pte.tsx` handle rich text and embedded objects.
- **Styling:**
  - Tailwind CSS is used for layout and utility classes (see `tailwind.config.js`).
  - Background images/colors for sections/columns are set via inline style props using Sanity data.
- **Menu/Navigation:**
  - Menus are fetched from Sanity (`menu` schema) and rendered in `header.tsx`.
  - Submenus collapse on link click by setting state (`openItem` to `null`).

## Integration Points
- **Sanity Client:**
  - Configured in frontend (`src/PageDetail.tsx`) for GROQ queries.
- **Image URLs:**
  - Use Sanity's `image-url` builder for robust image rendering.
- **Cross-component Communication:**
  - Props and React context are used for passing data between layout, page, and section components.

## Key Files & Directories
- `sanitydev/schemas/`: All schema definitions (page, sections, columnSections, menu, etc.)
- `hypersite/src/PageDetail.tsx`: Main page rendering logic, GROQ queries, PortableText usage
- `hypersite/src/components/pte.tsx`: PortableText custom components
- `hypersite/src/components/header.tsx`: Menu and navigation logic
- `tailwind.config.js`: Tailwind CSS setup

## Example: Dereferencing Sections in GROQ
```groq
*[_type == "page" && slug.current == $slug][0]{
  title,
  sections[]{
    ...,
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
- Use the image builder for all Sanity images to ensure correct URLs.
- For new patterns, check existing files in `sanitydev/schemas/` and `hypersite/src/components/` for conventions.
