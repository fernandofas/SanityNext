// Icon schema for Portable Text
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'icon',
  title: 'Icon',
  type: 'object',
  options: {},
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Star', value: 'star'},
          {title: 'Heart', value: 'heart'},
          {title: 'Check', value: 'check'},
          {title: 'Smile', value: 'smile'},
          {title: 'Alert', value: 'alert'},
          {title: 'Custom SVG', value: 'customSvg'},
        ],
      },
      description: 'Choose an icon or select Custom SVG to insert your own SVG.'
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      description: 'Optional color for the icon'
    }),
    defineField({
      name: 'svgCode',
      title: 'SVG Code',
      type: 'text',
      description: 'Paste SVG code here if Custom SVG is selected.',
      hidden: ({parent}) => (parent as any)?.icon !== 'customSvg'
    }),
    defineField({
      name: 'iconsize',
      title: 'Size of the icon',
      type: 'number',
      description: 'Size for the icon'
    }),
    defineField({
      name: 'iconAlign',
      title: 'Icon Alignment',
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
  ]
})
