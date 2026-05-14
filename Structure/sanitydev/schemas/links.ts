import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
        name: 'text',
        title: 'Link Text',
        type: 'string',
        validation: Rule => Rule.required(),
    }),
    defineField({
        name: 'linkType',
        title: 'Link Type',
        type: 'string',
        options: {
            list: [
            { title: 'Internal', value: 'internal' },
            { title: 'External', value: 'external' },
            {title: 'Email', value: 'email'},
            ],
            layout: 'radio',
        },
        initialValue: 'internal',
    }),
    defineField({
        name: 'internalLink',
        title: 'Internal Link',
        type: 'reference',
        to: [{ type: 'page' }],
        hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
        name: 'externalUrl',
        title: 'External URL',
        type: 'url',
        hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
        name: 'emailAddress',
        title: 'Email Address',
        type: 'string',
        validation: Rule => Rule.email().error('Please enter a valid email address'),
        hidden: ({ parent }) => parent?.linkType !== 'email',
    }),
    defineField({
        name: 'linkAlign',
        title: 'Link Alignment',
        type: 'string',
        options: {
            list: [
            { title: 'Left', value: 'left' },
            { title: 'Center', value: 'center' },
            { title: 'Right', value: 'right' }
            ],
            layout: 'radio'
        },
        initialValue: 'left'
    }),
    defineField({
        name: 'textColor',
        title: 'Text Color (Optional)',
        type: 'color',
    }),
  ],
})
