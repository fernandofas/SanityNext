import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'style', title: 'Footer Style' },
  ],
  fields: [
    // ── Content ───────────────────────────────────────────────────────────────
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      group: 'content',
      rows: 3,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.email().error('Please enter a valid email address'),
    }),

    // ── Footer Style ──────────────────────────────────────────────────────────
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      group: 'style',
      options: { enableAlpha: true },
    }),
    defineField({
      name: 'textColor',
      title: 'Text / Link Color',
      type: 'color',
      group: 'style',
      options: { enableAlpha: true },
    }),
    defineField({
      name: 'textHoverColor',
      title: 'Text / Link Hover Color',
      type: 'color',
      group: 'style',
      options: { enableAlpha: true },
    }),
    defineField({
      name: 'fontFamily',
      title: 'Font Family',
      type: 'string',
      group: 'style',
      description: 'CSS font-family value, e.g. "Roboto, sans-serif"',
    }),
    defineField({
      name: 'fontSize',
      title: 'Font Size (px)',
      type: 'number',
      group: 'style',
    }),
    defineField({
      name: 'paddingTop',
      title: 'Padding Top (px)',
      type: 'number',
      group: 'style',
      initialValue: 48,
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Padding Bottom (px)',
      type: 'number',
      group: 'style',
      initialValue: 48,
    }),
    defineField({
      name: 'paddingLeft',
      title: 'Padding Left (px)',
      type: 'number',
      group: 'style',
      initialValue: 16,
    }),
    defineField({
      name: 'paddingRight',
      title: 'Padding Right (px)',
      type: 'number',
      group: 'style',
      initialValue: 16,
    }),
    defineField({
      name: 'borderTopWidth',
      title: 'Border Top (px)',
      type: 'number',
      group: 'style',
      initialValue: 0,
    }),
    defineField({
      name: 'borderRightWidth',
      title: 'Border Right (px)',
      type: 'number',
      group: 'style',
      initialValue: 0,
    }),
    defineField({
      name: 'borderBottomWidth',
      title: 'Border Bottom (px)',
      type: 'number',
      group: 'style',
      initialValue: 0,
    }),
    defineField({
      name: 'borderLeftWidth',
      title: 'Border Left (px)',
      type: 'number',
      group: 'style',
      initialValue: 0,
    }),
    defineField({
      name: 'borderColor',
      title: 'Border Color',
      type: 'color',
      group: 'style',
      options: { enableAlpha: true },
    }),
    defineField({
      name: 'borderStyle',
      title: 'Border Style',
      type: 'string',
      group: 'style',
      options: {
        list: [
          { title: 'Solid', value: 'solid' },
          { title: 'Dashed', value: 'dashed' },
          { title: 'Dotted', value: 'dotted' },
        ],
        layout: 'radio',
      },
      initialValue: 'solid',
    }),
  ],
})

