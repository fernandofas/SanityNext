import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cookiePopupSettings',
  title: 'Cookie Banner Pop Up Settings',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'style', title: 'Style' },
  ],
  fields: [
    // ── Content ──────────────────────────────────────────────────────────────
    defineField({
      name: 'popupTitle',
      title: 'Popup Title',
      type: 'string',
      group: 'content',
      initialValue: 'Cookie Settings',
      description: 'Heading shown at the top of the popup.',
    }),
    defineField({
      name: 'essentialLabel',
      title: 'Essential — Label',
      type: 'string',
      group: 'content',
      initialValue: 'Essential',
    }),
    defineField({
      name: 'essentialDescription',
      title: 'Essential — Description',
      type: 'string',
      group: 'content',
      initialValue: 'Required for the site to function. Cannot be disabled.',
    }),
    defineField({
      name: 'analyticsLabel',
      title: 'Analytics — Label',
      type: 'string',
      group: 'content',
      initialValue: 'Analytics',
    }),
    defineField({
      name: 'analyticsDescription',
      title: 'Analytics — Description',
      type: 'string',
      group: 'content',
      initialValue: 'Help us understand how visitors use the site.',
    }),
    defineField({
      name: 'marketingLabel',
      title: 'Marketing — Label',
      type: 'string',
      group: 'content',
      initialValue: 'Marketing',
    }),
    defineField({
      name: 'marketingDescription',
      title: 'Marketing — Description',
      type: 'string',
      group: 'content',
      initialValue: 'Used to show you relevant advertisements.',
    }),
    defineField({
      name: 'alwaysOnText',
      title: '"Always On" Label',
      type: 'string',
      group: 'content',
      initialValue: 'Always on',
      description: 'Text shown next to the Essential toggle (which is always enabled).',
    }),
    defineField({
      name: 'saveButtonText',
      title: 'Save Button Text',
      type: 'string',
      group: 'content',
      initialValue: 'Save preferences',
    }),
    defineField({
      name: 'cancelButtonText',
      title: 'Cancel Button Text',
      type: 'string',
      group: 'content',
      initialValue: 'Cancel',
    }),

    // ── Style ─────────────────────────────────────────────────────────────────
    // Overlay
    defineField({
      name: 'overlayColor',
      title: 'Backdrop / Overlay Color',
      type: 'color',
      options: { enableAlpha: true },
      group: 'style',
      description: 'Dark overlay behind the popup.',
    }),
    // Modal box
    defineField({ name: 'popupBackgroundColor', title: 'Modal Background Color', type: 'color', options: { enableAlpha: true }, group: 'style' }),
    defineField({ name: 'popupTextColor', title: 'Modal Text Color', type: 'color', options: { enableAlpha: true }, group: 'style' }),
    defineField({ name: 'popupBorderColor', title: 'Modal Border Color', type: 'color', options: { enableAlpha: true }, group: 'style' }),
    defineField({ name: 'popupBorderWidth', title: 'Modal Border Width (px)', type: 'number', group: 'style', initialValue: 1 }),
    defineField({ name: 'popupBorderRadius', title: 'Modal Border Radius (px)', type: 'number', group: 'style', initialValue: 8 }),
    defineField({ name: 'popupPaddingX', title: 'Modal Padding Horizontal (px)', type: 'number', group: 'style', initialValue: 24 }),
    defineField({ name: 'popupPaddingY', title: 'Modal Padding Vertical (px)', type: 'number', group: 'style', initialValue: 24 }),
    defineField({ name: 'popupFontFamily', title: 'Modal Font Family', type: 'string', group: 'style' }),
    defineField({ name: 'popupFontSize', title: 'Modal Font Size (px)', type: 'number', group: 'style' }),
    // Heading
    defineField({ name: 'headingFontSize', title: 'Heading Font Size (px)', type: 'number', group: 'style', initialValue: 18 }),
    defineField({
      name: 'headingFontWeight',
      title: 'Heading Font Weight',
      type: 'string',
      group: 'style',
      initialValue: '700',
      options: {
        list: [
          { title: 'Normal (400)', value: '400' },
          { title: 'Medium (500)', value: '500' },
          { title: 'Semibold (600)', value: '600' },
          { title: 'Bold (700)', value: '700' },
        ],
        layout: 'radio',
      },
    }),
    // Toggles
    defineField({ name: 'toggleOnColor', title: 'Toggle ON Color', type: 'color', options: { enableAlpha: true }, group: 'style', description: 'Color of the toggle when enabled.' }),
    defineField({ name: 'toggleOffColor', title: 'Toggle OFF Color', type: 'color', options: { enableAlpha: true }, group: 'style', description: 'Color of the toggle when disabled.' }),
    // Save button
    defineField({ name: 'saveButtonBg', title: 'Save Button Background', type: 'color', options: { enableAlpha: true }, group: 'style' }),
    defineField({ name: 'saveButtonTextColor', title: 'Save Button Text Color', type: 'color', options: { enableAlpha: true }, group: 'style' }),
    defineField({ name: 'saveButtonBorderRadius', title: 'Save Button Border Radius (px)', type: 'number', group: 'style', initialValue: 9999 }),
    defineField({ name: 'saveButtonHoverBg', title: 'Save Button Hover Background', type: 'color', options: { enableAlpha: true }, group: 'style' }),
    defineField({ name: 'saveButtonHoverTextColor', title: 'Save Button Hover Text Color', type: 'color', options: { enableAlpha: true }, group: 'style' }),
    // Cancel button
    defineField({ name: 'cancelButtonBg', title: 'Cancel Button Background', type: 'color', options: { enableAlpha: true }, group: 'style' }),
    defineField({ name: 'cancelButtonTextColor', title: 'Cancel Button Text Color', type: 'color', options: { enableAlpha: true }, group: 'style' }),
    defineField({ name: 'cancelButtonBorderColor', title: 'Cancel Button Border Color', type: 'color', options: { enableAlpha: true }, group: 'style' }),
    defineField({ name: 'cancelButtonBorderWidth', title: 'Cancel Button Border Width (px)', type: 'number', group: 'style', initialValue: 1 }),
    defineField({ name: 'cancelButtonBorderRadius', title: 'Cancel Button Border Radius (px)', type: 'number', group: 'style', initialValue: 6 }),
    defineField({ name: 'cancelButtonHoverBg', title: 'Cancel Button Hover Background', type: 'color', options: { enableAlpha: true }, group: 'style' }),
    defineField({ name: 'cancelButtonHoverTextColor', title: 'Cancel Button Hover Text Color', type: 'color', options: { enableAlpha: true }, group: 'style' }),
    defineField({ name: 'cancelButtonHoverBorderColor', title: 'Cancel Button Hover Border Color', type: 'color', options: { enableAlpha: true }, group: 'style' }),
  ],
  preview: {
    prepare() {
      return { title: 'Cookie Banner Pop Up Settings' }
    },
  },
})
