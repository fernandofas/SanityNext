import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'iframe',
  title: 'iFrame',
  type: 'object',
  fields: [
    defineField({ name: 'src', title: 'Source URL', type: 'url', validation: (Rule) => Rule.required() }),
    defineField({ name: 'title', title: 'Title (accessibility)', type: 'string' }),
    defineField({ name: 'width', title: 'Width (px or %)', type: 'string', initialValue: '100%' }),
    defineField({ name: 'height', title: 'Height (px)', type: 'string', initialValue: '400' }),
    defineField({ name: 'allow', title: 'Allow', type: 'string', description: 'e.g. autoplay; clipboard-write; encrypted-media' }),
    defineField({ name: 'allowFullScreen', title: 'Allow Fullscreen', type: 'boolean', initialValue: true }),
    defineField({ name: 'referrerPolicy', title: 'Referrer Policy', type: 'string' }),
    defineField({ name: 'sandbox', title: 'Sandbox', type: 'string', description: 'e.g. allow-scripts allow-same-origin' }),
  ],
})
