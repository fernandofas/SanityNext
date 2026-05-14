import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menuItem',
  type: 'object',
  title: 'Menu Item',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Label', validation: Rule => Rule.required() }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: { list: [
        { title: 'Page', value: 'page' },
        { title: 'Custom Path', value: 'custom' },
        { title: 'External URL', value: 'external' },
      ], layout: 'radio' },
      initialValue: 'page',
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.linkType !== 'page',
    }),
    defineField({
      name: 'path',
      title: 'Custom Path',
      type: 'string',
      description: "e.g., /blog or /external-path",
      initialValue: '#',
      hidden: ({ parent }) => parent?.linkType !== 'custom',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open External Link In New Tab',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'asButton',
      title: 'Render As Button',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'buttonBackgroundColor',
      type: 'color',
      title: 'Button Background Color (Optional)',
      options: { enableAlpha: true },
      hidden: ({ parent }) => !parent?.asButton,
    }),
    defineField({
      name: 'buttonTextColor',
      type: 'color',
      title: 'Button Text Color (Optional)',
      options: { enableAlpha: true },
      hidden: ({ parent }) => !parent?.asButton,
    }),
    defineField({
      name: 'buttonHoverBackgroundColor',
      type: 'color',
      title: 'Button Hover Background Color (Optional)',
      options: { enableAlpha: true },
      hidden: ({ parent }) => !parent?.asButton,
    }),
    defineField({
      name: 'buttonHoverTextColor',
      type: 'color',
      title: 'Button Hover Text Color (Optional)',
      options: { enableAlpha: true },
      hidden: ({ parent }) => !parent?.asButton,
    }),
    defineField({
      name: 'buttonHoverBorderColor',
      type: 'color',
      title: 'Button Hover Border Color (Optional)',
      options: { enableAlpha: true },
      hidden: ({ parent }) => !parent?.asButton,
    }),
    defineField({
      name: 'buttonBorderColor',
      type: 'color',
      title: 'Button Border Color (Optional)',
      options: { enableAlpha: true },
      hidden: ({ parent }) => !parent?.asButton,
    }),
    defineField({
      name: 'buttonBorderWidth',
      title: 'Button Border Width (px)',
      type: 'number',
      hidden: ({ parent }) => !parent?.asButton,
    }),
    defineField({
      name: 'buttonBorderRadius',
      title: 'Button Border Radius (px)',
      type: 'number',
      hidden: ({ parent }) => !parent?.asButton,
    }),
    defineField({
      name: 'buttonPaddingX',
      title: 'Button Padding X (px)',
      type: 'number',
      hidden: ({ parent }) => !parent?.asButton,
    }),
    defineField({
      name: 'buttonPaddingY',
      title: 'Button Padding Y (px)',
      type: 'number',
      hidden: ({ parent }) => !parent?.asButton,
    }),
    {
      name: 'subItems',
      type: 'array',
      title: 'Submenu Items',
      of: [{ type: 'menuItem' }]
    }
  ]
})
