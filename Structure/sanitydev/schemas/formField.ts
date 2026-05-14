import { defineType } from 'sanity';

export default defineType({
  name: 'formField',
  title: 'Form Field',
  type: 'object',
  fields: [
    {
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Email', value: 'email' },
          { title: 'Textarea', value: 'textarea' },
          { title: 'Checkbox', value: 'checkbox' },
          {title: 'Radio', value: 'radio'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'required',
      type: 'boolean',
      title: 'Required',
      initialValue: true
    },
    {
      name: 'choices',
      title: 'Choices',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add one option per entry (for Radio and Checkbox group fields).',
      hidden: ({ parent }: any) => parent?.type !== 'radio' && parent?.type !== 'checkbox',
    },
    {
      name: 'placeholder',
      type: 'string',
      title: 'Placeholder Text',
      description: 'Hint text shown inside the input when empty.',
      hidden: ({ parent }: any) => parent?.type === 'checkbox' || parent?.type === 'radio',
    }
  ]
});