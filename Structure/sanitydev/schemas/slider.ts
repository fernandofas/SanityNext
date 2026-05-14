import { defineType, defineField } from 'sanity'

const colorDesc = 'CSS colour: e.g. #ffffff, rgba(0,0,0,0.5)'

export default defineType({
  name: 'slider',
  title: 'Slider',
  type: 'document',
  groups: [
    { name: 'slides', title: 'Slides', default: true },
    { name: 'behaviour', title: 'Behaviour & Timing' },
    { name: 'dimensions', title: 'Dimensions' },
    { name: 'navigation', title: 'Navigation (Arrows & Dots)' },
    { name: 'transitions', title: 'Transitions & Animations' },
    { name: 'overlayStyle', title: 'Slide Overlay & Text Style' },
  ],
  fields: [
    // ── Basic ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Slider Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Internal name used to identify this slider.',
    }),
    defineField({
      name: 'fullWidth',
      title: 'Full Width (break out of container)',
      type: 'boolean',
      group: 'dimensions',
      initialValue: false,
      description: 'When enabled the slider extends to the full viewport width, ignoring any parent padding.',
    }),

    // ── Slides ────────────────────────────────────────────────────────────────
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      group: 'slides',
      of: [
        {
          type: 'object',
          name: 'slide',
          title: 'Slide',
          fields: [
            defineField({
              name: 'image',
              title: 'Slide Image',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required(),
            }),
            defineField({ name: 'altText', title: 'Image Alt Text', type: 'string' }),
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
            defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 2 }),
            defineField({
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: { list: [{ title: 'None', value: 'none' }, { title: 'Internal', value: 'internal' }, { title: 'External', value: 'external' }], layout: 'radio' },
              initialValue: 'none',
            }),
            defineField({ name: 'internalLink', title: 'Internal Page', type: 'reference', to: [{ type: 'page' }], hidden: ({ parent }) => parent?.linkType !== 'internal' }),
            defineField({ name: 'externalUrl', title: 'External URL', type: 'url', hidden: ({ parent }) => parent?.linkType !== 'external' }),
            defineField({ name: 'linkLabel', title: 'Link / Button Label', type: 'string' }),
            defineField({
              name: 'textPosition',
              title: 'Text Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Center', value: 'center' },
                  { title: 'Top Left', value: 'top-left' },
                  { title: 'Top Center', value: 'top-center' },
                  { title: 'Top Right', value: 'top-right' },
                  { title: 'Middle Left', value: 'middle-left' },
                  { title: 'Middle Right', value: 'middle-right' },
                  { title: 'Bottom Left', value: 'bottom-left' },
                  { title: 'Bottom Center', value: 'bottom-center' },
                  { title: 'Bottom Right', value: 'bottom-right' },
                ],
                layout: 'radio',
              },
              initialValue: 'center',
            }),
          ],
          preview: {
            select: { media: 'image', title: 'heading', subtitle: 'subheading' },
            prepare({ media, title, subtitle }) {
              return { media, title: title || 'Slide', subtitle: subtitle || '' }
            },
          },
        },
      ],
    }),

    // ── Behaviour & Timing ────────────────────────────────────────────────────
    defineField({ name: 'autoplay', title: 'Autoplay', type: 'boolean', group: 'behaviour', initialValue: true }),
    defineField({ name: 'autoplayDelay', title: 'Autoplay Delay (ms)', type: 'number', group: 'behaviour', initialValue: 4000, description: 'Time in milliseconds between slides. Default: 4000.' }),
    defineField({ name: 'loop', title: 'Loop / Infinite', type: 'boolean', group: 'behaviour', initialValue: true }),
    defineField({ name: 'pauseOnHover', title: 'Pause Autoplay on Hover', type: 'boolean', group: 'behaviour', initialValue: true }),
    defineField({
      name: 'direction',
      title: 'Slide Direction',
      type: 'string',
      group: 'behaviour',
      options: { list: [{ title: 'Horizontal (Left → Right)', value: 'horizontal' }, { title: 'Vertical (Top → Bottom)', value: 'vertical' }], layout: 'radio' },
      initialValue: 'horizontal',
    }),
    defineField({ name: 'swipe', title: 'Touch / Swipe Support', type: 'boolean', group: 'behaviour', initialValue: true }),
    defineField({ name: 'keyboardControl', title: 'Keyboard Arrow Navigation', type: 'boolean', group: 'behaviour', initialValue: true }),

    // ── Transitions ───────────────────────────────────────────────────────────
    defineField({
      name: 'transitionType',
      title: 'Transition Type',
      type: 'string',
      group: 'transitions',
      options: {
        list: [
          { title: 'Slide', value: 'slide' },
          { title: 'Fade', value: 'fade' },
          { title: 'Zoom In', value: 'zoom-in' },
          { title: 'Zoom Out', value: 'zoom-out' },
          { title: 'Flip (Horizontal)', value: 'flip-h' },
          { title: 'Flip (Vertical)', value: 'flip-v' },
        ],
        layout: 'radio',
      },
      initialValue: 'slide',
    }),
    defineField({ name: 'transitionDuration', title: 'Transition Duration (ms)', type: 'number', group: 'transitions', initialValue: 500 }),
    defineField({
      name: 'transitionEasing',
      title: 'Transition Easing',
      type: 'string',
      group: 'transitions',
      options: { list: [{ title: 'Ease', value: 'ease' }, { title: 'Ease-in', value: 'ease-in' }, { title: 'Ease-out', value: 'ease-out' }, { title: 'Ease-in-out', value: 'ease-in-out' }, { title: 'Linear', value: 'linear' }], layout: 'radio' },
      initialValue: 'ease-in-out',
    }),

    // ── Dimensions ────────────────────────────────────────────────────────────
    defineField({
      name: 'heightType',
      title: 'Height Type',
      type: 'string',
      group: 'dimensions',
      options: { list: [{ title: 'Viewport Height (vh)', value: 'vh' }, { title: 'Fixed Pixels (px)', value: 'px' }, { title: 'Auto (image aspect ratio)', value: 'auto' }], layout: 'radio' },
      initialValue: 'vh',
    }),
    defineField({ name: 'heightValue', title: 'Height Value', type: 'number', group: 'dimensions', initialValue: 60, description: 'Number for vh or px. E.g. 60 = 60vh or 600px.' }),
    defineField({
      name: 'objectFit',
      title: 'Image Object Fit',
      type: 'string',
      group: 'dimensions',
      options: { list: [{ title: 'Cover', value: 'cover' }, { title: 'Contain', value: 'contain' }, { title: 'Fill', value: 'fill' }], layout: 'radio' },
      initialValue: 'cover',
    }),
    defineField({ name: 'borderRadius', title: 'Slider Border Radius (px)', type: 'number', group: 'dimensions', initialValue: 0 }),
    defineField({ name: 'maxWidth', title: 'Max Width (px)', type: 'number', group: 'dimensions', description: 'Leave empty to use full container width.' }),

    // ── Navigation ────────────────────────────────────────────────────────────
    defineField({ name: 'showArrows', title: 'Show Prev/Next Arrows', type: 'boolean', group: 'navigation', initialValue: true }),
    defineField({ name: 'arrowBackgroundColor', title: 'Arrow Button Background', type: 'string', description: colorDesc, group: 'navigation' }),
    defineField({ name: 'arrowColor', title: 'Arrow Icon Color', type: 'string', description: colorDesc, group: 'navigation' }),
    defineField({ name: 'arrowHoverBackgroundColor', title: 'Arrow Hover Background', type: 'string', description: colorDesc, group: 'navigation' }),
    defineField({ name: 'arrowSize', title: 'Arrow Button Size (px)', type: 'number', group: 'navigation', initialValue: 40 }),
    defineField({ name: 'arrowBorderRadius', title: 'Arrow Button Border Radius (px)', type: 'number', group: 'navigation', initialValue: 9999 }),
    defineField({ name: 'showDots', title: 'Show Navigation Dots', type: 'boolean', group: 'navigation', initialValue: true }),
    defineField({ name: 'dotColor', title: 'Dot Color (inactive)', type: 'string', description: colorDesc, group: 'navigation' }),
    defineField({ name: 'dotActiveColor', title: 'Dot Color (active)', type: 'string', description: colorDesc, group: 'navigation' }),
    defineField({ name: 'dotSize', title: 'Dot Size (px)', type: 'number', group: 'navigation', initialValue: 10 }),
    defineField({ name: 'dotShape', title: 'Dot Shape', type: 'string', group: 'navigation', options: { list: [{ title: 'Circle', value: 'circle' }, { title: 'Square', value: 'square' }, { title: 'Dash', value: 'dash' }], layout: 'radio' }, initialValue: 'circle' }),

    // ── Overlay & Text Style ─────────────────────────────────────────────────
    defineField({ name: 'overlayColor', title: 'Slide Overlay Color', type: 'string', description: colorDesc, group: 'overlayStyle' }),
    defineField({ name: 'headingColor', title: 'Heading Color', type: 'string', description: colorDesc, group: 'overlayStyle' }),
    defineField({ name: 'headingFontSize', title: 'Heading Font Size (px)', type: 'number', group: 'overlayStyle', initialValue: 36 }),
    defineField({ name: 'headingFontWeight', title: 'Heading Font Weight', type: 'string', group: 'overlayStyle', options: { list: [{ title: 'Normal', value: '400' }, { title: 'Bold', value: '700' }], layout: 'radio' }, initialValue: '700' }),
    defineField({ name: 'subheadingColor', title: 'Subheading Color', type: 'string', description: colorDesc, group: 'overlayStyle' }),
    defineField({ name: 'subheadingFontSize', title: 'Subheading Font Size (px)', type: 'number', group: 'overlayStyle', initialValue: 20 }),
    defineField({ name: 'bodyTextColor', title: 'Body Text Color', type: 'string', description: colorDesc, group: 'overlayStyle' }),
    defineField({ name: 'bodyTextFontSize', title: 'Body Text Font Size (px)', type: 'number', group: 'overlayStyle', initialValue: 16 }),
    defineField({ name: 'linkBtnBackgroundColor', title: 'Link Button Background', type: 'string', description: colorDesc, group: 'overlayStyle' }),
    defineField({ name: 'linkBtnTextColor', title: 'Link Button Text Color', type: 'string', description: colorDesc, group: 'overlayStyle' }),
    defineField({ name: 'linkBtnBorderRadius', title: 'Link Button Border Radius (px)', type: 'number', group: 'overlayStyle', initialValue: 9999 }),
    defineField({ name: 'textPaddingX', title: 'Text Area Padding Horizontal (px)', type: 'number', group: 'overlayStyle', initialValue: 24 }),
    defineField({ name: 'textPaddingY', title: 'Text Area Padding Vertical (px)', type: 'number', group: 'overlayStyle', initialValue: 24 }),
  ],
  preview: {
    select: { title: 'title', slides: 'slides' },
    prepare({ title, slides }) {
      const count = Array.isArray(slides) ? slides.length : 0;
      return { title: title || 'Untitled Slider', subtitle: `${count} slide${count !== 1 ? 's' : ''}` }
    },
  },
})
