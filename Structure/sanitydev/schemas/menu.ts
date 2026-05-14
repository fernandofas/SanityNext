import { defineType } from 'sanity'

export default defineType({
  name: 'menu',
  type: 'document',
  title: 'Header Menu',
  fields: [
    { name: 'title', type: 'string', title: 'Menu Title' },
    { name: 'location', type: 'string', title: 'Location', options: { list: ['header', 'footer'] } },
    {
      name: 'items',
      type: 'array',
      title: 'Menu Items',
      of: [{ type: 'menuItem' }]
    }
  ]
})