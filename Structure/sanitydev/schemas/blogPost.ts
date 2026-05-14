import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from '../icons/icons'
import {defineField, defineType} from 'sanity'

const linkedImage = {
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
          { title: 'Email', value: 'email' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'emailAddress',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.email().error('Please enter a valid email address'),
      hidden: ({ parent }) => parent?.linkType !== 'email',
    }),
    defineField({
      name: 'width',
      title: 'Width (px)',
      type: 'number',
      description: 'Optional. Overrides the default width.',
    }),
    defineField({
      name: 'height',
      title: 'Height (px)',
      type: 'number',
      description: 'Optional. Overrides the default height.',
    }),
  ],
}

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', group: 'content', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', group: 'content' }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', group: 'content', options: { hotspot: true } }),
    defineField({ name: 'author', title: 'Author', type: 'reference', group: 'content', to: [{type: 'author'}]}),
    defineField({ name: 'categories', title: 'Categories', type: 'array', group: 'content', of: [{type: 'reference', to: [{type: 'category'}]}]}),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', group: 'content' }),
    {
        name: 'columnLayout',
        title: 'Number of Columns',
        type: 'string',
        group: 'content',
        options: {
        list: [
            { title: 'One Columns', value: '1', name: 'One Column' },
            { title: 'Two Columns', value: '2', name: 'Two Columns' },
            { title: 'Three Columns', value: '3', name: 'Three Columns' },
            { title: 'Four Columns', value: '4',  name: 'Four Columns' },
        ],
        layout: 'radio',
        },
        initialValue: '1',
        validation: Rule => Rule.required(),
    }, 
    { 
      name: 'backgroundColor', 
      type: 'color',  
      title: 'Background Color (Optional) color code to be used on the HEX field: 314D55, 1E2E32, 1C2532, 534293, 00FFC2' ,
      group: 'content',
      options: {
            enableAlpha: true,
          },
    },      
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image (Optional)',
      group: 'content',
      options: { hotspot: true },
    }, 
    {
      name: 'columnContent',
      type: 'array',
      title: 'Columns',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Title (Optional)',
              type: 'string',
              name: 'title'
            },
            {
              name: 'backgroundColor',
              type: 'color',
              title: 'Background Color (Optional) color code to be used on the HEX field: 314D55, 1E2E32, 1C2532, 534293, 00FFC2',
              options: {
                enableAlpha: true,
              },
            },
            {
              name: 'backgroundImage',
              type: 'image',
              title: 'Background image (It will cover the whole column with an image)',
              options: { hotspot: true },
            }, 
              {
              title: 'Text Color (Optional)',
              name: 'textColor',
              type: 'color',
              options: {
                enableAlpha: true,
              },
              },
              {
                title: 'Heading (Optional)',
                name: 'heading',
                type: 'string',
                initialValue: '',
                options: {
                  list: [
                    {
                      title: 'H1',
                      value: 'h1',
                      name: 'H1',
                    },
                    {
                      title: 'H2',
                      value: 'h2',
                      name: 'H2',
                    },
                    {
                      title: 'H3',
                      value: 'h3',
                      name: 'H3',
                    },
                    {
                      title: 'H4',
                      value: 'h4',
                      name: 'H4',
                    },
                  ]
              }
              },
             
            // {
            //   type: 'code',
            //   name: 'myCodeField',
            //   title: 'Custom code',
            //   options: {
            //   language: 'javascript',
            //   languageAlternatives: [
            //     {title: 'Javascript', value: 'javascript'},
            //     {title: 'HTML', value: 'html'},
            //     {title: 'CSS', value: 'css'},
            //   ],
            //   // withFilename: true,
            // },
            // },
            {
              name: 'content',
              type: 'array',
              title: 'Content',
              of: [
                { 
                  type: 'block',
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                      { title: 'Left',    value: 'left',    icon: AlignLeftIcon },
                      { title: 'Center',  value: 'center',  icon: AlignCenterIcon },
                      { title: 'Right',   value: 'right',   icon: AlignRightIcon },
                      { title: 'Justify', value: 'justify', icon: AlignJustifyIcon }
                    ],
                  },                  
                },
                {
                  name: 'icon',
                  title: 'Icons',
                  type: 'icon'
                },
                {
                  type: 'link',
                },
                linkedImage,
                { type: 'imageGroup' },
                {
                  type: 'button',
                },
                { title: 'Video', name: 'video', type: 'video' },
                { title: 'iFrame', name: 'iframe', type: 'iframe' },
                {
                  title: 'Sections',
                  name: 'sections',
                  type: 'reference',
                  to: [ {type: 'sections'}]
                },
                {
                  title: 'Accordion',
                  name: 'accordion',
                  type: 'reference',
                  to: [{ type: 'accordion' }]
                },
                {
                  title: 'Slider',
                  name: 'slider',
                  type: 'reference',
                  to: [{ type: 'slider' }]
                },
                {
                  title: 'Forms',
                  name: 'form',
                  type: 'reference',
                  to: [{type: 'form'}]
                },
              ],
            },
          ],
          preview: {
            select: {
              name: 'title'
            },
            prepare({ name }) {
              return {
                title: name
              }
            },
          },
        },
      ],
      validation: Rule =>
        Rule.custom((columns, context) => {
            //const parent = context?.parent as { columns?: any };
            // const columnCount = parent?.columns;
            const columnCount = (context?.parent as { columns?: any })?.columns;
            const columnArray = columns as unknown[];
           if (columnCount && columnArray.length !== columnCount) {
                return `You must provide exactly ${columnCount} column(s).`;
            }
            return true;
        }),
    },
    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      type: 'string',
      title: 'SEO Title',
      group: 'seo',
      description: 'Overrides the post title in search results. Keep under 60 characters.',
      validation: (Rule) => Rule.max(60).warning('Keep under 60 characters for best display'),
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      rows: 3,
      group: 'seo',
      description: '<meta name="description" ... /> — keep under 160 characters.',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for best SEO display'),
    }),
    defineField({
      name: 'keywords',
      type: 'string',
      title: 'Keywords',
      group: 'seo',
      description: 'Comma-separated keywords for this post.',
    }),
    defineField({
      name: 'canonicalUrl',
      type: 'url',
      title: 'Canonical URL',
      group: 'seo',
      description: 'Override the canonical URL if this post is also published elsewhere.',
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
      title: 'No Index',
      group: 'seo',
      description: 'When enabled, search engines will not index this post.',
      initialValue: false,
    }),
    defineField({
      name: 'redirects',
      title: 'Redirect Rules',
      type: 'array',
      group: 'seo',
      description: 'Old paths that should redirect to this post.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'from', type: 'string', title: 'From path (e.g. /old-post-slug)' }),
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
      description: 'Image shown when shared on social media. Recommended: 1200x630px. Falls back to cover image.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
        defineField({ name: 'width', type: 'number', title: 'Image width (px)', initialValue: 1200 }),
        defineField({ name: 'height', type: 'number', title: 'Image height (px)', initialValue: 630 }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'author.name' },
  },
})
