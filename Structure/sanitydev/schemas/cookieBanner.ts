import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cookieBanner',
  title: 'Cookie Banner',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'bannerStyle', title: 'Banner Style' },
    { name: 'popupStyle', title: 'Popup / Settings Modal' },
  ],
  fields: [
    // ── Content ──────────────────────────────────────────────────────────────
    defineField({
      name: 'bannerText',
      title: 'Banner Text',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Main message shown in the cookie consent banner.',
      initialValue: 'We use cookies to improve your experience. Essential cookies are always active. Analytics and marketing cookies require your consent.',
    }),
    defineField({
      name: 'acceptButtonText',
      title: 'Accept All Button Text',
      type: 'string',
      group: 'content',
      initialValue: 'Accept all',
    }),
    defineField({
      name: 'rejectButtonText',
      title: 'Reject All Button Text',
      type: 'string',
      group: 'content',
      initialValue: 'Reject all',
    }),
    defineField({
      name: 'settingsButtonText',
      title: 'Settings Button Text',
      type: 'string',
      group: 'content',
      initialValue: 'Settings',
    }),
    defineField({
      name: 'privacyPolicyLink',
      title: 'Privacy Policy Link',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'text', type: 'string', title: 'Link text', initialValue: 'Privacy Policy' }),
        defineField({ name: 'url', type: 'string', title: 'URL (path or full URL)', initialValue: '/privacy-policy' }),
      ],
    }),
    defineField({
      name: 'cookieScript',
      title: 'Third-party Cookie Script',
      type: 'text',
      rows: 6,
      group: 'content',
      description: 'Optional: paste a third-party consent script (e.g. Cookiebot, OneTrust) that will replace the built-in banner.',
    }),

    // ── Banner Style ─────────────────────────────────────────────────────────
    defineField({ name: 'backgroundColor', title: 'Banner Background Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'textColor', title: 'Banner Text Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'bannerPaddingTop', title: 'Padding Top (px)', type: 'number', group: 'bannerStyle', initialValue: 16 }),
    defineField({ name: 'bannerPaddingBottom', title: 'Padding Bottom (px)', type: 'number', group: 'bannerStyle', initialValue: 16 }),
    defineField({ name: 'bannerPaddingLeft', title: 'Padding Left (px)', type: 'number', group: 'bannerStyle', initialValue: 24 }),
    defineField({ name: 'bannerPaddingRight', title: 'Padding Right (px)', type: 'number', group: 'bannerStyle', initialValue: 24 }),
    defineField({ name: 'bannerBorderTopWidth', title: 'Border Top Width (px)', type: 'number', group: 'bannerStyle', initialValue: 1 }),
    defineField({ name: 'bannerBorderRightWidth', title: 'Border Right Width (px)', type: 'number', group: 'bannerStyle', initialValue: 0 }),
    defineField({ name: 'bannerBorderBottomWidth', title: 'Border Bottom Width (px)', type: 'number', group: 'bannerStyle', initialValue: 0 }),
    defineField({ name: 'bannerBorderLeftWidth', title: 'Border Left Width (px)', type: 'number', group: 'bannerStyle', initialValue: 0 }),
    defineField({ name: 'bannerBorderColor', title: 'Border Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'bannerBorderStyle', title: 'Border Style', type: 'string', group: 'bannerStyle', initialValue: 'solid', options: { list: ['solid', 'dashed', 'dotted', 'none'], layout: 'radio' } }),
    // Accept button
    defineField({ name: 'acceptButtonBg', title: 'Accept Button Background', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'acceptButtonText_color', title: 'Accept Button Text Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'acceptButtonHoverBg', title: 'Accept Button Hover Background', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'acceptButtonHoverTextColor', title: 'Accept Button Hover Text Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'acceptButtonBorderRadius', title: 'Accept Button Border Radius (px)', type: 'number', group: 'bannerStyle', initialValue: 9999 }),
    // Reject button
    defineField({ name: 'rejectButtonBg', title: 'Reject Button Background', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'rejectButtonTextColor', title: 'Reject Button Text Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'rejectButtonBorderColor', title: 'Reject Button Border Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'rejectButtonHoverBg', title: 'Reject Button Hover Background', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'rejectButtonHoverTextColor', title: 'Reject Button Hover Text Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'rejectButtonHoverBorderColor', title: 'Reject Button Hover Border Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'rejectButtonBorderRadius', title: 'Reject Button Border Radius (px)', type: 'number', group: 'bannerStyle', initialValue: 6 }),
    // Settings button
    defineField({ name: 'settingsButtonBg', title: 'Settings Button Background', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'settingsButtonTextColor', title: 'Settings Button Text Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'settingsButtonBorderColor', title: 'Settings Button Border Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'settingsButtonHoverBg', title: 'Settings Button Hover Background', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'settingsButtonHoverTextColor', title: 'Settings Button Hover Text Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'settingsButtonHoverBorderColor', title: 'Settings Button Hover Border Color', type: 'color', options: { enableAlpha: true }, group: 'bannerStyle' }),
    defineField({ name: 'settingsButtonBorderRadius', title: 'Settings Button Border Radius (px)', type: 'number', group: 'bannerStyle', initialValue: 6 }),

    // ── Popup / Settings Modal ────────────────────────────────────────────────
    defineField({ name: 'popupBackgroundColor', title: 'Modal Background Color', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
    defineField({ name: 'popupTextColor', title: 'Modal Text Color', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
    defineField({ name: 'popupBorderColor', title: 'Modal Border Color', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
    defineField({ name: 'popupBorderWidth', title: 'Modal Border Width (px)', type: 'number', group: 'popupStyle', initialValue: 1 }),
    defineField({ name: 'popupBorderRadius', title: 'Modal Border Radius (px)', type: 'number', group: 'popupStyle', initialValue: 8 }),
    defineField({ name: 'popupPaddingX', title: 'Modal Padding Horizontal (px)', type: 'number', group: 'popupStyle', initialValue: 24 }),
    defineField({ name: 'popupPaddingY', title: 'Modal Padding Vertical (px)', type: 'number', group: 'popupStyle', initialValue: 24 }),
    defineField({ name: 'overlayColor', title: 'Backdrop / Overlay Color', type: 'color', options: { enableAlpha: true }, group: 'popupStyle', description: 'Background overlay behind the modal.' }),
    defineField({ name: 'popupFontFamily', title: 'Modal Font Family', type: 'string', group: 'popupStyle' }),
    defineField({ name: 'popupFontSize', title: 'Modal Font Size (px)', type: 'number', group: 'popupStyle' }),
    // Toggle
    defineField({ name: 'toggleOnColor', title: 'Toggle ON Color', type: 'color', options: { enableAlpha: true }, group: 'popupStyle', description: 'Color of the toggle switch when enabled.' }),
    defineField({ name: 'toggleOffColor', title: 'Toggle OFF Color', type: 'color', options: { enableAlpha: true }, group: 'popupStyle', description: 'Color of the toggle switch when disabled.' }),
    // Save button
    defineField({ name: 'saveButtonBg', title: 'Save Button Background', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
    defineField({ name: 'saveButtonTextColor', title: 'Save Button Text Color', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
    defineField({ name: 'saveButtonBorderRadius', title: 'Save Button Border Radius (px)', type: 'number', group: 'popupStyle', initialValue: 9999 }),
    defineField({ name: 'saveButtonHoverBg', title: 'Save Button Hover Background', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
    defineField({ name: 'saveButtonHoverTextColor', title: 'Save Button Hover Text Color', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
    // Cancel button
    defineField({ name: 'cancelButtonBg', title: 'Cancel Button Background', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
    defineField({ name: 'cancelButtonTextColor', title: 'Cancel Button Text Color', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
    defineField({ name: 'cancelButtonBorderColor', title: 'Cancel Button Border Color', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
    defineField({ name: 'cancelButtonBorderRadius', title: 'Cancel Button Border Radius (px)', type: 'number', group: 'popupStyle', initialValue: 6 }),
    defineField({ name: 'cancelButtonHoverBg', title: 'Cancel Button Hover Background', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
    defineField({ name: 'cancelButtonHoverTextColor', title: 'Cancel Button Hover Text Color', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
    defineField({ name: 'cancelButtonHoverBorderColor', title: 'Cancel Button Hover Border Color', type: 'color', options: { enableAlpha: true }, group: 'popupStyle' }),
  ],
  preview: {
    prepare() {
      return { title: 'Cookie Banner Settings' }
    },
  },
})
