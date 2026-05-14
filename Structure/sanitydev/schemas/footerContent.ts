import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from '../icons/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footerContent',
  title: 'Footer Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal label for this footer content block.',
    }),
    defineField({
      name: 'backgroundColor',
      type: 'color',
      title: 'Background Color (Optional) color code to be used on the HEX field: 314D55, 1E2E32, 1C2532, 534293, 00FFC2',
      options: {
        enableAlpha: true,
      },
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image (Optional)',
      options: { hotspot: true },
    }),
    defineField({
      title: 'Text Color (Optional)',
      name: 'textColor',
      type: 'color',
      options: {
        enableAlpha: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Left', value: 'left', icon: AlignLeftIcon },
              { title: 'Center', value: 'center', icon: AlignCenterIcon },
              { title: 'Right', value: 'right', icon: AlignRightIcon },
              { title: 'Justify', value: 'justify', icon: AlignJustifyIcon },
            ],
          },
        },
        { name: 'icon', title: 'Icons', type: 'icon' },
        { type: 'link' },
        { type: 'image', options: { hotspot: true } },
        { type: 'imageGroup' },
        { type: 'button' },
        { title: 'Video', name: 'video', type: 'video' },
        { title: 'iFrame', name: 'iframe', type: 'iframe' },
        {
          title: 'Accordion',
          name: 'accordion',
          type: 'reference',
          to: [{ type: 'accordion' }],
        },
        {
          title: 'Forms',
          name: 'form',
          type: 'reference',
          to: [{ type: 'form' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Footer Content',
      }
    },
  },
})
