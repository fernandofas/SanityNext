import { defineType } from 'sanity'

export default defineType({
  name: 'section',
  type: 'object',
  title: 'Section',
  fields: [
    { name: 'backgroundColor', type: 'string', title: 'Background Color' },
    { name: 'backgroundImage', type: 'image', title: 'Background Image' },
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'subtitle', type: 'string', title: 'Subtitle' },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
        type: 'block',
         marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Code', value: 'code' },
            { title: 'Highlight', value: 'highlight' },
            { title: 'Quote', value: 'blockquote' }
          ]
        }
      },
      {
        type: 'image'
      }  
    ]
    }
  ]
})