import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
    fields: [
    defineField({
        name: 'buttonAlign',
        title: 'Button Alignment',
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
        name: 'text',
        title: 'Button Text',
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
            { title: 'Email', value: 'email'},
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
        name: 'backgroundColor',
        title: 'Background Color (Optional) color code to be used on the HEX field: 314D55, 1E2E32, 1C2532, 534293, 00FFC2',
        type: 'color',
    }),
    defineField({
        name: 'textColor',
        title: 'Text Color (Optional)',
        type: 'color',
    }),
    defineField({
        name: 'hoverBackgroundColor',
        title: 'Hover Background Color (Optional) color code to be used on the HEX field: 314D55, 1E2E32, 1C2532, 534293, 00FFC2',
        type: 'color',
    }),
    defineField({
        name: 'hoverTextColor',
        title: 'Hover Text Color (Optional)',
        type: 'color',
    }),
    defineField({
        name: 'borderColor',
        title: 'Border Color (Optional)',
        type: 'color',
    }),
    defineField({
        name: 'borderThickness',
        title: 'Border Thickness (Optional)',
        type: 'number',
    }),
    defineField({
        name: 'borderRadius',
        title: 'Border Radius (Optional)',
        type: 'number',
    }),
  ],
})
