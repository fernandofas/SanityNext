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
      type: 'string',
      group: 'style',
      description: 'CSS color for the dark overlay behind the popup. Supports rgba, hex, etc. e.g. rgba(0,0,0,0.6)',
      initialValue: 'rgba(0,0,0,0.6)',
    }),
    // Modal box
    defineField({ name: 'popupBackgroundColor', title: 'Modal Background Color', type: 'string', group: 'style', description: 'CSS color value. e.g. #1C2532 or rgba(28,37,50,1)' }),
    defineField({ name: 'popupTextColor', title: 'Modal Text Color', type: 'string', group: 'style' }),
    defineField({ name: 'popupBorderColor', title: 'Modal Border Color', type: 'string', group: 'style' }),
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
    defineField({ name: 'toggleOnColor', title: 'Toggle ON Color', type: 'string', group: 'style', initialValue: '#00FFC2', description: 'Color of the toggle when enabled. e.g. #00FFC2' }),
    defineField({ name: 'toggleOffColor', title: 'Toggle OFF Color', type: 'string', group: 'style', initialValue: 'rgba(255,255,255,0.2)', description: 'Color of the toggle when disabled.' }),
    // Save button
    defineField({ name: 'saveButtonBg', title: 'Save Button Background', type: 'string', group: 'style', initialValue: '#00FFC2' }),
    defineField({ name: 'saveButtonTextColor', title: 'Save Button Text Color', type: 'string', group: 'style', initialValue: '#1C2532' }),
    defineField({ name: 'saveButtonBorderRadius', title: 'Save Button Border Radius (px)', type: 'number', group: 'style', initialValue: 9999 }),
    defineField({ name: 'saveButtonHoverBg', title: 'Save Button Hover Background', type: 'string', group: 'style' }),
    defineField({ name: 'saveButtonHoverTextColor', title: 'Save Button Hover Text Color', type: 'string', group: 'style' }),
    // Cancel button
    defineField({ name: 'cancelButtonBg', title: 'Cancel Button Background', type: 'string', group: 'style' }),
    defineField({ name: 'cancelButtonTextColor', title: 'Cancel Button Text Color', type: 'string', group: 'style' }),
    defineField({ name: 'cancelButtonBorderColor', title: 'Cancel Button Border Color', type: 'string', group: 'style', initialValue: 'rgba(255,255,255,0.3)' }),
    defineField({ name: 'cancelButtonBorderRadius', title: 'Cancel Button Border Radius (px)', type: 'number', group: 'style', initialValue: 6 }),
    defineField({ name: 'cancelButtonHoverBg', title: 'Cancel Button Hover Background', type: 'string', group: 'style' }),
    defineField({ name: 'cancelButtonHoverTextColor', title: 'Cancel Button Hover Text Color', type: 'string', group: 'style' }),
    defineField({ name: 'cancelButtonHoverBorderColor', title: 'Cancel Button Hover Border Color', type: 'string', group: 'style' }),
  ],
  preview: {
    prepare() {
      return { title: 'Cookie Banner Pop Up Settings' }
    },
  },
})
