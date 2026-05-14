import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactForm',
  title: 'Contact Form Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'agreement',
      title: 'Agreement to Data Storage',
      type: 'boolean',
      validation: Rule => Rule.required().custom(val => val === true ? true : 'You must agree to data storage'),
    }),
  ],
});
