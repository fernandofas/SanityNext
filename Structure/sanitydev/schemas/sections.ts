import { defineType } from 'sanity'

export default defineType({
  name: 'sections',
  type: 'document',
  title: 'Sections',
  fields: [
    { name: 'title', type: 'string', title: 'Page Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 } },
    // { name: 'backgroundColor', type: 'string', title: 'Background Color' },
    { name: 'backgroundImage', type: 'image', title: 'Page Icon' },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        // { type: 'section' },
        // { type: 'columnBack'},
        { type: 'columnSection' }
      ]
    }
  ]
})