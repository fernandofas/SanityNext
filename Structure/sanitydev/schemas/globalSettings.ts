import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  groups: [
    { name: 'layout', title: 'Layout', default: true },
    { name: 'typography', title: 'Typography' },
    { name: 'background', title: 'Background' },
    { name: 'spacing', title: 'Spacing' },
  ],
  fields: [
    // ── Layout ───────────────────────────────────────────────────────────────
    defineField({
      name: 'bodyMaxWidth',
      title: 'Body Max Width (px)',
      type: 'number',
      group: 'layout',
      description: 'Maximum width of the page content area in pixels. Default: 1400.',
      initialValue: 1400,
    }),

    // ── Typography ───────────────────────────────────────────────────────────
    defineField({
      name: 'fontFamily',
      title: 'Global Font Family',
      type: 'string',
      group: 'typography',
      description: 'CSS font-family value. E.g. "Inter, sans-serif" or a Google Fonts name.',
    }),
    defineField({
      name: 'fontSizeBase',
      title: 'Base Font Size (px)',
      type: 'number',
      group: 'typography',
      description: 'Root font size in pixels. Default: 16.',
      initialValue: 16,
    }),
    defineField({
      name: 'lineHeight',
      title: 'Line Height',
      type: 'number',
      group: 'typography',
      description: 'Unitless line-height multiplier (e.g. 1.6). Default: 1.6.',
      initialValue: 1.6,
    }),
    defineField({
      name: 'letterSpacing',
      title: 'Letter Spacing (px)',
      type: 'number',
      group: 'typography',
      description: 'Global letter-spacing in pixels. Default: 0.',
      initialValue: 0,
    }),

    // ── Background ───────────────────────────────────────────────────────────
    defineField({
      name: 'bodyBackgroundColor',
      title: 'Body Background Color',
      type: 'color',
      options: { enableAlpha: true },
      group: 'background',
    }),
    defineField({
      name: 'bodyBackgroundImage',
      title: 'Body Background Image',
      type: 'image',
      group: 'background',
      options: { hotspot: true },
      description: 'Full-page background image. Overrides background color if set.',
    }),
    defineField({
      name: 'backgroundSize',
      title: 'Background Size',
      type: 'string',
      group: 'background',
      options: {
        list: [
          { title: 'Cover', value: 'cover' },
          { title: 'Contain', value: 'contain' },
          { title: 'Auto', value: 'auto' },
        ],
        layout: 'radio',
      },
      initialValue: 'cover',
      hidden: ({ document }) => !document?.bodyBackgroundImage,
    }),
    defineField({
      name: 'backgroundRepeat',
      title: 'Background Repeat',
      type: 'string',
      group: 'background',
      options: {
        list: [
          { title: 'No Repeat', value: 'no-repeat' },
          { title: 'Repeat', value: 'repeat' },
          { title: 'Repeat X', value: 'repeat-x' },
          { title: 'Repeat Y', value: 'repeat-y' },
        ],
        layout: 'radio',
      },
      initialValue: 'no-repeat',
      hidden: ({ document }) => !document?.bodyBackgroundImage,
    }),
    defineField({
      name: 'backgroundPosition',
      title: 'Background Position',
      type: 'string',
      group: 'background',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Top', value: 'top' },
          { title: 'Bottom', value: 'bottom' },
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
      hidden: ({ document }) => !document?.bodyBackgroundImage,
    }),

    // ── Spacing ──────────────────────────────────────────────────────────────
    defineField({
      name: 'bodyMarginTop',
      title: 'Body Margin Top (px)',
      type: 'number',
      group: 'spacing',
    }),
    defineField({
      name: 'bodyMarginBottom',
      title: 'Body Margin Bottom (px)',
      type: 'number',
      group: 'spacing',
    }),
    defineField({
      name: 'bodyMarginLeft',
      title: 'Body Margin Left (px)',
      type: 'number',
      group: 'spacing',
    }),
    defineField({
      name: 'bodyMarginRight',
      title: 'Body Margin Right (px)',
      type: 'number',
      group: 'spacing',
    }),
    defineField({
      name: 'bodyPaddingTop',
      title: 'Body Padding Top (px)',
      type: 'number',
      group: 'spacing',
    }),
    defineField({
      name: 'bodyPaddingBottom',
      title: 'Body Padding Bottom (px)',
      type: 'number',
      group: 'spacing',
    }),
    defineField({
      name: 'bodyPaddingLeft',
      title: 'Body Padding Left (px)',
      type: 'number',
      group: 'spacing',
    }),
    defineField({
      name: 'bodyPaddingRight',
      title: 'Body Padding Right (px)',
      type: 'number',
      group: 'spacing',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Global Settings' }
    },
  },
})
