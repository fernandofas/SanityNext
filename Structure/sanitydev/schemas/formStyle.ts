import { defineType, defineField } from 'sanity'

const colorDescription = 'CSS colour: e.g. #ff0000, rgba(255,0,0,0.5), hsl(0,100%,50%)'

export default defineType({
  name: 'formStyle',
  title: 'Form Style',
  type: 'document',
  groups: [
    { name: 'wrapper', title: 'Form Wrapper', default: true },
    { name: 'labels', title: 'Labels' },
    { name: 'inputs', title: 'Inputs & Textareas' },
    { name: 'select', title: 'Select / Dropdown' },
    { name: 'checkradio', title: 'Checkbox & Radio' },
    { name: 'submitBtn', title: 'Submit Button' },
    { name: 'successError', title: 'Success & Error' },
  ],
  fields: [
    // ── Wrapper ───────────────────────────────────────────────────────────────
    defineField({ name: 'wrapperBackgroundColor', title: 'Wrapper Background Color', type: 'string', description: colorDescription, group: 'wrapper' }),
    defineField({ name: 'wrapperPaddingTop', title: 'Padding Top (px)', type: 'number', group: 'wrapper', initialValue: 0 }),
    defineField({ name: 'wrapperPaddingBottom', title: 'Padding Bottom (px)', type: 'number', group: 'wrapper', initialValue: 0 }),
    defineField({ name: 'wrapperPaddingLeft', title: 'Padding Left (px)', type: 'number', group: 'wrapper', initialValue: 0 }),
    defineField({ name: 'wrapperPaddingRight', title: 'Padding Right (px)', type: 'number', group: 'wrapper', initialValue: 0 }),
    defineField({ name: 'wrapperBorderRadius', title: 'Border Radius (px)', type: 'number', group: 'wrapper', initialValue: 0 }),
    defineField({ name: 'wrapperBorderColor', title: 'Border Color', type: 'string', description: colorDescription, group: 'wrapper' }),
    defineField({ name: 'wrapperBorderWidth', title: 'Border Width (px)', type: 'number', group: 'wrapper', initialValue: 0 }),
    defineField({ name: 'wrapperBorderStyle', title: 'Border Style', type: 'string', group: 'wrapper', initialValue: 'solid', options: { list: ['solid', 'dashed', 'dotted', 'none'], layout: 'radio' } }),
    defineField({ name: 'fieldGap', title: 'Gap Between Fields (px)', type: 'number', group: 'wrapper', initialValue: 16 }),
    defineField({ name: 'formMaxWidth', title: 'Form Max Width (px)', type: 'number', group: 'wrapper', description: 'Limits how wide the form grows. Leave empty for no limit.' }),

    // ── Labels ────────────────────────────────────────────────────────────────
    defineField({ name: 'labelColor', title: 'Label Color', type: 'string', description: colorDescription, group: 'labels' }),
    defineField({ name: 'labelFontSize', title: 'Label Font Size (px)', type: 'number', group: 'labels', initialValue: 14 }),
    defineField({ name: 'labelFontWeight', title: 'Label Font Weight', type: 'string', group: 'labels', initialValue: '400', options: { list: [{ title: 'Normal (400)', value: '400' }, { title: 'Medium (500)', value: '500' }, { title: 'Semi-Bold (600)', value: '600' }, { title: 'Bold (700)', value: '700' }], layout: 'radio' } }),
    defineField({ name: 'labelMarginBottom', title: 'Label Margin Bottom (px)', type: 'number', group: 'labels', initialValue: 4 }),
    defineField({ name: 'requiredColor', title: 'Required (*) Color', type: 'string', description: colorDescription, group: 'labels' }),

    // ── Inputs & Textareas ────────────────────────────────────────────────────
    defineField({ name: 'inputBackgroundColor', title: 'Input Background Color', type: 'string', description: colorDescription, group: 'inputs' }),
    defineField({ name: 'inputTextColor', title: 'Input Text Color', type: 'string', description: colorDescription, group: 'inputs' }),
    defineField({ name: 'inputPlaceholderColor', title: 'Placeholder Color', type: 'string', description: colorDescription, group: 'inputs' }),
    defineField({ name: 'inputBorderColor', title: 'Border Color', type: 'string', description: colorDescription, group: 'inputs' }),
    defineField({ name: 'inputBorderWidth', title: 'Border Width (px)', type: 'number', group: 'inputs', initialValue: 1 }),
    defineField({ name: 'inputBorderRadius', title: 'Border Radius (px)', type: 'number', group: 'inputs', initialValue: 6 }),
    defineField({ name: 'inputFocusBorderColor', title: 'Focus Border Color', type: 'string', description: colorDescription, group: 'inputs' }),
    defineField({ name: 'inputFocusBackgroundColor', title: 'Focus Background Color', type: 'string', description: colorDescription, group: 'inputs' }),
    defineField({ name: 'inputPaddingX', title: 'Padding Horizontal (px)', type: 'number', group: 'inputs', initialValue: 12 }),
    defineField({ name: 'inputPaddingY', title: 'Padding Vertical (px)', type: 'number', group: 'inputs', initialValue: 8 }),
    defineField({ name: 'inputFontSize', title: 'Font Size (px)', type: 'number', group: 'inputs', initialValue: 14 }),
    defineField({ name: 'textareaMinHeight', title: 'Textarea Min Height (px)', type: 'number', group: 'inputs', initialValue: 100 }),
    defineField({ name: 'inputShadow', title: 'Box Shadow', type: 'string', group: 'inputs', description: 'CSS box-shadow value. E.g. "0 1px 3px rgba(0,0,0,0.2)"' }),

    // ── Select ────────────────────────────────────────────────────────────────
    defineField({ name: 'selectBackgroundColor', title: 'Select Background Color', type: 'string', description: colorDescription, group: 'select' }),
    defineField({ name: 'selectTextColor', title: 'Select Text Color', type: 'string', description: colorDescription, group: 'select' }),
    defineField({ name: 'selectBorderColor', title: 'Select Border Color', type: 'string', description: colorDescription, group: 'select' }),
    defineField({ name: 'selectBorderRadius', title: 'Select Border Radius (px)', type: 'number', group: 'select', initialValue: 6 }),

    // ── Checkbox & Radio ──────────────────────────────────────────────────────
    defineField({ name: 'checkRadioAccentColor', title: 'Accent Color (checkbox/radio tick)', type: 'string', description: colorDescription, group: 'checkradio' }),
    defineField({ name: 'checkRadioLabelColor', title: 'Option Label Color', type: 'string', description: colorDescription, group: 'checkradio' }),
    defineField({ name: 'checkRadioSize', title: 'Checkbox/Radio Size (px)', type: 'number', group: 'checkradio', initialValue: 16 }),
    defineField({ name: 'checkRadioGap', title: 'Gap Between Icon and Label (px)', type: 'number', group: 'checkradio', initialValue: 8 }),

    // ── Submit Button ─────────────────────────────────────────────────────────
    defineField({ name: 'submitBtnBackgroundColor', title: 'Background Color', type: 'string', description: colorDescription, group: 'submitBtn' }),
    defineField({ name: 'submitBtnTextColor', title: 'Text Color', type: 'string', description: colorDescription, group: 'submitBtn' }),
    defineField({ name: 'submitBtnHoverBackgroundColor', title: 'Hover Background Color', type: 'string', description: colorDescription, group: 'submitBtn' }),
    defineField({ name: 'submitBtnHoverTextColor', title: 'Hover Text Color', type: 'string', description: colorDescription, group: 'submitBtn' }),
    defineField({ name: 'submitBtnBorderColor', title: 'Border Color', type: 'string', description: colorDescription, group: 'submitBtn' }),
    defineField({ name: 'submitBtnBorderWidth', title: 'Border Width (px)', type: 'number', group: 'submitBtn', initialValue: 0 }),
    defineField({ name: 'submitBtnBorderRadius', title: 'Border Radius (px)', type: 'number', group: 'submitBtn', initialValue: 9999 }),
    defineField({ name: 'submitBtnPaddingX', title: 'Padding Horizontal (px)', type: 'number', group: 'submitBtn', initialValue: 24 }),
    defineField({ name: 'submitBtnPaddingY', title: 'Padding Vertical (px)', type: 'number', group: 'submitBtn', initialValue: 10 }),
    defineField({ name: 'submitBtnFontSize', title: 'Font Size (px)', type: 'number', group: 'submitBtn' }),
    defineField({ name: 'submitBtnFontWeight', title: 'Font Weight', type: 'string', group: 'submitBtn', options: { list: [{ title: 'Normal (400)', value: '400' }, { title: 'Medium (500)', value: '500' }, { title: 'Semi-Bold (600)', value: '600' }, { title: 'Bold (700)', value: '700' }], layout: 'radio' } }),
    defineField({ name: 'submitBtnFullWidth', title: 'Full Width Button', type: 'boolean', group: 'submitBtn', initialValue: false }),
    defineField({ name: 'submitBtnAlign', title: 'Button Alignment', type: 'string', group: 'submitBtn', initialValue: 'left', options: { list: [{ title: 'Left', value: 'left' }, { title: 'Center', value: 'center' }, { title: 'Right', value: 'right' }], layout: 'radio' } }),

    // ── Success & Error ───────────────────────────────────────────────────────
    defineField({ name: 'successBackgroundColor', title: 'Success Message Background', type: 'string', description: colorDescription, group: 'successError' }),
    defineField({ name: 'successTextColor', title: 'Success Message Text Color', type: 'string', description: colorDescription, group: 'successError' }),
    defineField({ name: 'successBorderColor', title: 'Success Message Border Color', type: 'string', description: colorDescription, group: 'successError' }),
    defineField({ name: 'errorTextColor', title: 'Error Text Color', type: 'string', description: colorDescription, group: 'successError' }),
    defineField({ name: 'errorBorderColor', title: 'Error Border Color', type: 'string', description: colorDescription, group: 'successError' }),
    defineField({ name: 'successMessage', title: 'Success Message Text', type: 'string', group: 'successError', initialValue: 'Thank you! Your message has been sent.' }),
  ],
  preview: {
    prepare() {
      return { title: 'Form Style' }
    },
  },
})
