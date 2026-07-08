import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'authSettings',
  title: 'Sign In / Register Pop Up Style',
  type: 'document',
  groups: [
    { name: 'modal',      title: 'Modal Container', default: true },
    { name: 'typography', title: 'Typography' },
    { name: 'inputs',     title: 'Input Fields' },
    { name: 'button',     title: 'Submit Button' },
    { name: 'links',      title: 'Links & Close Button' },
    { name: 'content',    title: 'Content Labels' },
  ],
  fields: [
    // ── Modal Container ───────────────────────────────────────────────────────
    defineField({ name: 'overlayColor',     title: 'Overlay Background',          type: 'color', options: { enableAlpha: true }, group: 'modal' }),
    defineField({ name: 'modalBgColor',     title: 'Modal Background Color',       type: 'color', options: { enableAlpha: true }, group: 'modal' }),
    defineField({ name: 'modalBorderColor', title: 'Modal Border Color',           type: 'color', options: { enableAlpha: true }, group: 'modal' }),
    defineField({ name: 'modalBorderWidth', title: 'Modal Border Width (px)',       type: 'number', group: 'modal', initialValue: 1 }),
    defineField({ name: 'modalBorderRadius',title: 'Modal Border Radius (px)',      type: 'number', group: 'modal', initialValue: 8 }),
    defineField({ name: 'modalPaddingX',    title: 'Modal Padding Horizontal (px)', type: 'number', group: 'modal', initialValue: 24 }),
    defineField({ name: 'modalPaddingY',    title: 'Modal Padding Vertical (px)',   type: 'number', group: 'modal', initialValue: 24 }),
    defineField({ name: 'modalMaxWidth',    title: 'Modal Max Width (px)',          type: 'number', group: 'modal', initialValue: 380 }),
    defineField({ name: 'modalBoxShadow',   title: 'Modal Box Shadow',              type: 'string', group: 'modal', description: 'CSS box-shadow value, e.g. 0 20px 60px rgba(0,0,0,0.35)' }),
    defineField({ name: 'formGap',          title: 'Field Gap (px)',                type: 'number', group: 'modal', initialValue: 16 }),

    // ── Typography ────────────────────────────────────────────────────────────
    defineField({ name: 'fontFamily',       title: 'Font Family',                  type: 'string', group: 'typography' }),
    defineField({ name: 'textColor',        title: 'Text Color',                   type: 'color', options: { enableAlpha: true }, group: 'typography' }),
    defineField({ name: 'fontSize',         title: 'Base Font Size (px)',           type: 'number', group: 'typography', initialValue: 14 }),
    defineField({ name: 'headingFontSize',  title: 'Heading Font Size (px)',        type: 'number', group: 'typography', initialValue: 18 }),
    defineField({
      name: 'headingFontWeight', title: 'Heading Font Weight', type: 'string', group: 'typography', initialValue: '700',
      options: { list: [{ title: 'Normal (400)', value: '400' }, { title: 'Medium (500)', value: '500' }, { title: 'Semibold (600)', value: '600' }, { title: 'Bold (700)', value: '700' }], layout: 'radio' },
    }),
    defineField({ name: 'headingColor',     title: 'Heading Color',                type: 'color', options: { enableAlpha: true }, group: 'typography' }),
    defineField({ name: 'errorColor',       title: 'Error Message Color',          type: 'color', options: { enableAlpha: true }, group: 'typography' }),

    // ── Input Fields ──────────────────────────────────────────────────────────
    defineField({ name: 'inputBgColor',         title: 'Input Background',              type: 'color', options: { enableAlpha: true }, group: 'inputs' }),
    defineField({ name: 'inputTextColor',        title: 'Input Text Color',              type: 'color', options: { enableAlpha: true }, group: 'inputs' }),
    defineField({ name: 'inputPlaceholderColor', title: 'Input Placeholder Color',       type: 'color', group: 'inputs' }),
    defineField({ name: 'inputBorderColor',      title: 'Input Border Color',            type: 'color', options: { enableAlpha: true }, group: 'inputs' }),
    defineField({ name: 'inputBorderWidth',      title: 'Input Border Width (px)',        type: 'number', group: 'inputs', initialValue: 1 }),
    defineField({ name: 'inputBorderRadius',     title: 'Input Border Radius (px)',       type: 'number', group: 'inputs', initialValue: 4 }),
    defineField({ name: 'inputPaddingX',         title: 'Input Padding Horizontal (px)',  type: 'number', group: 'inputs', initialValue: 12 }),
    defineField({ name: 'inputPaddingY',         title: 'Input Padding Vertical (px)',    type: 'number', group: 'inputs', initialValue: 8 }),
    defineField({ name: 'inputFontSize',         title: 'Input Font Size (px)',           type: 'number', group: 'inputs' }),
    defineField({ name: 'inputFocusBorderColor', title: 'Input Focus Border Color',       type: 'color', options: { enableAlpha: true }, group: 'inputs' }),
    defineField({ name: 'inputFocusBgColor',     title: 'Input Focus Background',         type: 'color', group: 'inputs' }),

    // ── Submit Button ─────────────────────────────────────────────────────────
    defineField({ name: 'btnBg',              title: 'Button Background',           type: 'color', options: { enableAlpha: true }, group: 'button' }),
    defineField({ name: 'btnTextColor',       title: 'Button Text Color',           type: 'color', options: { enableAlpha: true }, group: 'button' }),
    defineField({ name: 'btnFontSize',        title: 'Button Font Size (px)',        type: 'number', group: 'button' }),
    defineField({ name: 'btnBorderRadius',    title: 'Button Border Radius (px)',    type: 'number', group: 'button', initialValue: 9999 }),
    defineField({ name: 'btnBorderWidth',     title: 'Button Border Width (px)',     type: 'number', group: 'button', initialValue: 0 }),
    defineField({ name: 'btnBorderColor',     title: 'Button Border Color',          type: 'color', options: { enableAlpha: true }, group: 'button' }),
    defineField({ name: 'btnPaddingX',        title: 'Button Padding Horizontal (px)',type: 'number', group: 'button', initialValue: 16 }),
    defineField({ name: 'btnPaddingY',        title: 'Button Padding Vertical (px)', type: 'number', group: 'button', initialValue: 10 }),
    defineField({
      name: 'btnFontWeight', title: 'Button Font Weight', type: 'string', group: 'button', initialValue: '700',
      options: { list: [{ title: 'Normal (400)', value: '400' }, { title: 'Medium (500)', value: '500' }, { title: 'Semibold (600)', value: '600' }, { title: 'Bold (700)', value: '700' }], layout: 'radio' },
    }),
    defineField({ name: 'btnHoverBg',         title: 'Button Hover Background',      type: 'color', options: { enableAlpha: true }, group: 'button' }),
    defineField({ name: 'btnHoverTextColor',  title: 'Button Hover Text Color',      type: 'color', options: { enableAlpha: true }, group: 'button' }),
    defineField({ name: 'btnHoverBorderColor',title: 'Button Hover Border Color',    type: 'color', options: { enableAlpha: true }, group: 'button' }),

    // ── Links & Close Button ──────────────────────────────────────────────────
    defineField({ name: 'linkColor',            title: 'Link Color (Register / Forgot Password)', type: 'color', options: { enableAlpha: true }, group: 'links' }),
    defineField({ name: 'linkFontSize',         title: 'Link Font Size (px)',                     type: 'number', group: 'links' }),
    defineField({
      name: 'linkFontWeight', title: 'Link Font Weight', type: 'string', group: 'links',
      options: { list: [{ title: 'Normal (400)', value: '400' }, { title: 'Medium (500)', value: '500' }, { title: 'Semibold (600)', value: '600' }, { title: 'Bold (700)', value: '700' }], layout: 'radio' },
    }),
    defineField({ name: 'linkHoverColor',       title: 'Link Hover Color',                        type: 'color', options: { enableAlpha: true }, group: 'links' }),
    defineField({ name: 'closeButtonColor',     title: 'Close Button (×) Color',                 type: 'color', options: { enableAlpha: true }, group: 'links' }),
    defineField({ name: 'closeButtonHoverColor',title: 'Close Button Hover Color',               type: 'color', options: { enableAlpha: true }, group: 'links' }),
    defineField({ name: 'closeButtonSize',      title: 'Close Button Size (px)',                  type: 'number', group: 'links', initialValue: 22 }),
    defineField({ name: 'passwordToggleColor',  title: 'Show/Hide Password Text Color',           type: 'color', group: 'links' }),
    defineField({ name: 'passwordToggleHoverColor', title: 'Show/Hide Password Hover Color',      type: 'color', group: 'links' }),
    defineField({ name: 'passwordToggleFontSize', title: 'Show/Hide Password Font Size (px)',     type: 'number', group: 'links', initialValue: 12 }),

    // ── Content Labels ────────────────────────────────────────────────────────
    defineField({ name: 'signInTitle',               title: 'Sign In Title',                    type: 'string', group: 'content', initialValue: 'Sign In' }),
    defineField({ name: 'registerTitle',             title: 'Register Title',                   type: 'string', group: 'content', initialValue: 'Register' }),
    defineField({ name: 'signInBtnLabel',            title: 'Sign In Button Label',             type: 'string', group: 'content', initialValue: 'Sign in' }),
    defineField({ name: 'registerBtnLabel',          title: 'Register Button Label',            type: 'string', group: 'content', initialValue: 'Register' }),
    defineField({ name: 'registerLinkLabel',         title: '"Register" Link Label',            type: 'string', group: 'content', initialValue: 'Register' }),
    defineField({ name: 'forgotPasswordLabel',       title: '"Forgot Password" Label',          type: 'string', group: 'content', initialValue: 'Forgot password?' }),
    defineField({ name: 'alreadyHaveAccountLabel',   title: '"Already have account" Label',     type: 'string', group: 'content', initialValue: 'Already have an account? Sign in' }),
    defineField({ name: 'registrationSuccessMessage',title: 'Registration Success Message',     type: 'text', rows: 2, group: 'content', initialValue: 'Registration successful! Please check your email to verify your account.' }),
    defineField({ name: 'backToSignInLabel',         title: 'Back to Sign In Label',            type: 'string', group: 'content', initialValue: 'Back to sign in' }),
  ],
  preview: {
    prepare() { return { title: 'Sign In / Register Pop Up Style' } },
  },
})
