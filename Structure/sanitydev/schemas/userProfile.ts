import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'userProfile',
  title: 'User Profile',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'surname', title: 'Surname', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: Rule => Rule.required().email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email' }) }),
    defineField({ name: 'phone', title: 'Phone number (international)', type: 'string', description: 'Include country code, e.g. +44…', validation: Rule => Rule.required().regex(/^\+[1-9]\d{7,14}$/, { name: 'E.164' }) }),
    defineField({ name: 'company', title: 'Company name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'address', title: 'Address', type: 'text', validation: Rule => Rule.required() }),
    defineField({ name: 'postcode', title: 'Post code', type: 'string', validation: Rule => Rule.required() }), 
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Controls what this user can access. Administrator: full Studio access + user management. Editor: can manage pages, blog posts, menus, sections. Subscriber: frontend account only, no Studio access.',
      options: {
        list: [
          { title: 'Administrator — full Studio access, manage all content and users', value: 'administrator' },
          { title: 'Editor — manage pages, blog posts, menus, sections', value: 'editor' },
          { title: 'Subscriber — frontend account only (no Studio access)', value: 'subscriber' },
        ],
        layout: 'radio'
      },
      initialValue: 'subscriber',
      validation: Rule => Rule.required(),
    }),
  ],
})
