import { defineField, defineType } from 'sanity'

const imageItemFields = [
  defineField({
    name: 'linkType',
    title: 'Link Type',
    type: 'string',
    options: {
      list: [
        { title: 'None', value: 'none' },
        { title: 'Internal', value: 'internal' },
        { title: 'External', value: 'external' },
        { title: 'Email', value: 'email' },
      ],
      layout: 'radio',
    },
    initialValue: 'none',
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
    name: 'width',
    title: 'Width (px)',
    type: 'number',
    description: 'Optional. Overrides the default width.',
  }),
  defineField({
    name: 'height',
    title: 'Height (px)',
    type: 'number',
    description: 'Optional. Overrides the default height.',
  }),
]

export default defineType({
  name: 'imageGroup',
  title: 'Image Group',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout Direction',
      type: 'string',
      options: {
        list: [
          { title: 'Row (horizontal)', value: 'row' },
          { title: 'Column (vertical)', value: 'column' },
        ],
        layout: 'radio',
      },
      initialValue: 'row',
    }),
    defineField({
      name: 'horizontalAlign',
      title: 'Horizontal Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
          { title: 'Space Between', value: 'between' },
          { title: 'Space Around', value: 'around' },
          { title: 'Space Evenly', value: 'evenly' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'verticalAlign',
      title: 'Vertical Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Center', value: 'center' },
          { title: 'Bottom', value: 'bottom' },
          { title: 'Stretch', value: 'stretch' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'wrap',
      title: 'Wrap to Next Line',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'gap',
      title: 'Gap (px)',
      type: 'number',
      initialValue: 16,
      description: 'Space between images.',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: imageItemFields,
        },
      ],
      validation: Rule => Rule.min(2).warning('Add at least two images for a group.'),
    }),
  ],
  preview: {
    select: {
      layout: 'layout',
      images: 'images',
    },
    prepare({ layout, images }) {
      const count = Array.isArray(images) ? images.length : 0
      return {
        title: `Image Group (${layout || 'row'})`,
        subtitle: `${count} image${count === 1 ? '' : 's'}`,
      }
    },
  },
})
