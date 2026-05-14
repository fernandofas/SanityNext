import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from '../icons/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'accordion',
  title: 'Accordion / FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'item',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required() }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [
                {
                  type: 'block',
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                      { title: 'Left', value: 'left', icon: AlignLeftIcon },
                      { title: 'Center', value: 'center', icon: AlignCenterIcon },
                      { title: 'Right', value: 'right', icon: AlignRightIcon },
                      { title: 'Justify', value: 'justify', icon: AlignJustifyIcon },
                    ],
                  },
                },
                { type: 'image', options: { hotspot: true } },
                { type: 'link' },
                { type: 'button' },
              ],
            }),
          ],
          preview: {
            select: { title: 'question' },
            prepare({ title }) {
              return { title }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
