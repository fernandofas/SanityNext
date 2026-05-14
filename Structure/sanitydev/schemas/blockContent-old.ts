import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'block',
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Align Left', value: 'left'},
          {title: 'Align Center', value: 'center'},
          {title: 'Align Right', value: 'right'},
          {title: 'Justify', value: 'justify'}
        ],
        annotations: [
          {
            name: 'link',
            title: 'URL',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url'
              }
            ]
          }
        ]
      }
    }),
    defineArrayMember({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true}
    }),
    defineArrayMember({
      name: 'icon',
      title: 'Icon',
      type: 'icon'
    })
  ]
})