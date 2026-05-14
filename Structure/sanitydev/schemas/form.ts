import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'form',
  title: 'Forms',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Form Name', validation: Rule => Rule.required() }),
    defineField({ name: 'fields', type: 'array', title: 'Fields', of: [
      { type: 'formField' }
    ]}),
    defineField(
      {
        name: 'submitText',
        type: 'string',
        title: 'Button Text',
        initialValue: 'Send'        
      }
    ),
    defineField({
      name: 'submitBgColor',
      type: 'string',
      title: 'Button Background Color',
      description: 'CSS colour: e.g. #314D55, rgba(49,77,85,1). Overridden by Form Style if set.',
    }),
    defineField({
      name: 'submitTextColor',
      type: 'string',
      title: 'Button Text Color',
      description: 'CSS colour: e.g. #ffffff. Overridden by Form Style if set.',
    }),
    defineField({
        name: 'submithoverBackgroundColor',
        title: 'Button Hover Background Color (Optional)',
        type: 'string',
        description: 'CSS colour: e.g. #1E2E32. Overridden by Form Style if set.',
    }),
    defineField({
        name: 'submithoverTextColor',
        title: 'Button Hover Text Color (Optional)',
        type: 'string',
        description: 'CSS colour: e.g. #ffffff. Overridden by Form Style if set.',
    }),
    defineField({ name: 'emailTo', type: 'string', title: 'Recipient Email' }),
    defineField({
      name: 'formStyle',
      title: 'Form Style',
      type: 'reference',
      to: [{ type: 'formStyle' }],
      description: 'Optional: choose a Form Style document to control the appearance of this form.',
    }),
  ],
});
