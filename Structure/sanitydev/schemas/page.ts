import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', group: 'content' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, group: 'content' }),
    //{ name: 'backgroundColor', type: 'string', title: 'Background Color' },
    defineField({ name: 'backgroundImage', type: 'image', title: 'Page Icon', group: 'content' }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      group: 'content',
      of: [
        { type: 'columnBack' },
        { type: 'columnSection' },
        { type: 'form' },
      ],
    }),

    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      type: 'string',
      title: 'SEO Title',
      group: 'seo',
      description: 'Overrides the page title in search results. Keep under 60 characters.',
      validation: (Rule) => Rule.max(60).warning('Keep under 60 characters for best display'),
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      rows: 3,
      group: 'seo',
      description: 'Used for SEO: <meta name="description" ... />',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for best SEO display'),
    }),
    defineField({
      name: 'keywords',
      type: 'string',
      title: 'Keywords',
      group: 'seo',
      description: 'Comma-separated keywords for this page (e.g. "next.js, cms, sanity")',
    }),
    defineField({
      name: 'canonicalUrl',
      type: 'url',
      title: 'Canonical URL',
      group: 'seo',
      description: 'Override the canonical URL if this content is also published elsewhere.',
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
      title: 'No Index',
      group: 'seo',
      description: 'When enabled, search engines will not index this page.',
      initialValue: false,
    }),
    defineField({
      name: 'redirects',
      title: 'Redirect Rules',
      type: 'array',
      group: 'seo',
      description: 'Old paths that should redirect to this page (handled at middleware level).',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'from', type: 'string', title: 'From path (e.g. /old-page)' }),
            defineField({
              name: 'type',
              type: 'string',
              title: 'Redirect type',
              options: { list: [{ title: '301 Permanent', value: '301' }, { title: '302 Temporary', value: '302' }], layout: 'radio' },
              initialValue: '301',
            }),
          ],
          preview: { select: { title: 'from', subtitle: 'type' } },
        },
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      description: 'Image shown when this page is shared on social media. Recommended: 1200×630px.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
        defineField({ name: 'width', type: 'number', title: 'Image width (px)', initialValue: 1200 }),
        defineField({ name: 'height', type: 'number', title: 'Image height (px)', initialValue: 630 }),
      ],
    }),
  ],
})
