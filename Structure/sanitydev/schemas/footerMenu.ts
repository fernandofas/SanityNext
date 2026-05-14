// /schemas/footerMenu.ts

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'footerMenu',
  title: 'Footer Menu',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'column',
      title: 'Footer Column',
      type: 'string',
      options: {
        list: [
          { title: 'Column 1 (e.g. We Are)', value: 'column1' },
          { title: 'Column 2 (e.g. Enterprises)', value: 'column2' },
          { title: 'Column 3 (e.g. Legal)', value: 'column3' },
          { title: 'Column 4 (e.g. Social)', value: 'column4' },
          { title: 'Column 5 (e.g. Address/Logo)', value: 'column5' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    },
    defineField({
      name: 'links',
      title: 'Menu Links',
      type: 'array',
      of: [
        {
          name: 'footerLink',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Link Label', type: 'string', validation: Rule => Rule.required() }),
            defineField({
              name: 'linkType', title: 'Link Type', type: 'string',
              options: { list: [
                { title: 'Page', value: 'page' },
                { title: 'Custom Path', value: 'custom' },
                { title: 'Email', value: 'email' },
              ], layout: 'radio' },
              initialValue: 'page',
            }),
            defineField({ name: 'page', title: 'Page', type: 'reference', to: [{ type: 'page' }], hidden: ({ parent }) => parent?.linkType !== 'page' }),
            defineField({ name: 'path', title: 'Custom Path', type: 'string', description: 'e.g., /blog', initialValue: '#', hidden: ({ parent }) => parent?.linkType !== 'custom' }),
            defineField({ name: 'emailAddress', title: 'Email Address', type: 'string', validation: Rule => Rule.email().error('Please enter a valid email address'), hidden: ({ parent }) => parent?.linkType !== 'email' }),
          ],
        },
      ],
    }),
  ],
});
