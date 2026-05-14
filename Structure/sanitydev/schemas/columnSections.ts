import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from '../icons/icons';
import { defineField, defineType } from 'sanity'

const linkedImage = {
  type: 'image',
  options: { hotspot: true },
  fields: [
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
  ],
}

export default defineType({
  name: 'columnSection',
  title: 'Column Section',
  type: 'object',
  fields: [
  defineField({
      name: 'columnLayout',
      title: 'Number of Columns',
      type: 'string',    
      options: {
        list: [
            { title: 'One Columns', value: '1' },
            { title: 'Two Columns', value: '2' },
            { title: 'Three Columns', value: '3' },
            { title: 'Four Columns', value: '4' },
        ],
        layout: 'radio',
      },
      initialValue: '1',
      validation: Rule => Rule.required(),
  }),
    
    { 
      name: 'backgroundColor', 
      type: 'color',  
      title: 'Background Color (Optional) color code to be used on the HEX field: 314D55, 1E2E32, 1C2532, 534293, 00FFC2' ,
      options: {
            enableAlpha: true,
          },
    },      
    { 
      name: 'backgroundImage', 
      type: 'image', 
      title: 'Background Image (Optional)'
    },
    { 
      name: 'textColor', 
      type: 'color',  
      title: 'Text Color (Optional)',
      options: {
        enableAlpha: true,
      },
    },

    // One Column
    defineField({
      name: 'column0',
      title: 'Column 1 Content',
      type: 'array',
      of: [
        { 
          type: 'block',
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Left',    value: 'left',    icon: AlignLeftIcon },
              { title: 'Center',  value: 'center',  icon: AlignCenterIcon },
              { title: 'Right',   value: 'right',   icon: AlignRightIcon },
              { title: 'Justify', value: 'justify', icon: AlignJustifyIcon }
            ],
          },                  
        },
        {
          name: 'icon',
          title: 'Icons',
          type: 'icon'
        },
        {
          type: 'link',
        },
        linkedImage,
        { type: 'imageGroup' },
        {
          type: 'button',
        },         
        { title: 'Video', name: 'video', type: 'video' },
        { title: 'iFrame', name: 'iframe', type: 'iframe' },
        {
          title: 'Accordion',
          name: 'accordion',
          type: 'reference',
          to: [{ type: 'accordion' }]
        },
        {
          title: 'Slider',
          name: 'slider',
          type: 'reference',
          to: [{ type: 'slider' }]
        },
       ],
      hidden: ({ parent }) => parent?.columnLayout !== '1'
    }),
    
    // Two Columns
    defineField({
      name: 'column1',
      title: 'Column 1 Content',
      type: 'array',
      of: [
        { 
          type: 'block',
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Left',    value: 'left',    icon: AlignLeftIcon },
              { title: 'Center',  value: 'center',  icon: AlignCenterIcon },
              { title: 'Right',   value: 'right',   icon: AlignRightIcon },
              { title: 'Justify', value: 'justify', icon: AlignJustifyIcon }
            ],
          },                  
        },
        {
          name: 'icon',
          title: 'Icons',
          type: 'icon'
        },
        {
          type: 'link',
        },
        linkedImage,
        { type: 'imageGroup' },
        {
          type: 'button',
        }, 
        { title: 'Video', name: 'video', type: 'video' },
        { title: 'iFrame', name: 'iframe', type: 'iframe' },
        {
          title: 'Accordion',
          name: 'accordion',
          type: 'reference',
          to: [{ type: 'accordion' }]
        },
        {
          title: 'Slider',
          name: 'slider',
          type: 'reference',
          to: [{ type: 'slider' }]
        },
      ],
      hidden: ({ parent }) => parent?.columnLayout !== '2' && parent?.columnLayout !== '3' && parent?.columnLayout !== '4',
    }),

    defineField({
      name: 'column2',
      title: 'Column 2 Content',
      type: 'array',
      of: [
        { 
          type: 'block',
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Left',    value: 'left',    icon: AlignLeftIcon },
              { title: 'Center',  value: 'center',  icon: AlignCenterIcon },
              { title: 'Right',   value: 'right',   icon: AlignRightIcon },
              { title: 'Justify', value: 'justify', icon: AlignJustifyIcon }
            ],
          },                  
        },
        {
          name: 'icon',
          title: 'Icons',
          type: 'icon'
        },
        {
          type: 'link',
        },
        linkedImage,
        { type: 'imageGroup' },
        {
          type: 'button',
        }, 
        { title: 'Video', name: 'video', type: 'video' },
        { title: 'iFrame', name: 'iframe', type: 'iframe' },
        {
          title: 'Accordion',
          name: 'accordion',
          type: 'reference',
          to: [{ type: 'accordion' }]
        },
        {
          title: 'Slider',
          name: 'slider',
          type: 'reference',
          to: [{ type: 'slider' }]
        },
      ],
      hidden: ({ parent }) => parent?.columnLayout !== '2' && parent?.columnLayout !== '3' && parent?.columnLayout !== '4',
    }),

    // Optional 3rd Column
    defineField({
      name: 'column3',
      title: 'Column 3 Content',
      type: 'array',
      of: [
        { 
          type: 'block',
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Left',    value: 'left',    icon: AlignLeftIcon },
              { title: 'Center',  value: 'center',  icon: AlignCenterIcon },
              { title: 'Right',   value: 'right',   icon: AlignRightIcon },
              { title: 'Justify', value: 'justify', icon: AlignJustifyIcon }
            ],
          },                  
        },
        {
          name: 'icon',
          title: 'Icons',
          type: 'icon'
        },
        {
          type: 'link',
        },
        linkedImage,
        { type: 'imageGroup' },
        {
          type: 'button',
        }, 
        { title: 'Video', name: 'video', type: 'video' },
        { title: 'iFrame', name: 'iframe', type: 'iframe' },
        {
          title: 'Accordion',
          name: 'accordion',
          type: 'reference',
          to: [{ type: 'accordion' }]
        },
        {
          title: 'Slider',
          name: 'slider',
          type: 'reference',
          to: [{ type: 'slider' }]
        },
      ],
      hidden: ({ parent }) => parent?.columnLayout !== '3' && parent?.columnLayout !== '4',
    }),

    // Optional 4th Column
    defineField({
      name: 'column4',
      title: 'Column 4 Content',
      type: 'array',
      of: [
        { 
          type: 'block',
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Left',    value: 'left',    icon: AlignLeftIcon },
              { title: 'Center',  value: 'center',  icon: AlignCenterIcon },
              { title: 'Right',   value: 'right',   icon: AlignRightIcon },
              { title: 'Justify', value: 'justify', icon: AlignJustifyIcon }
            ],
          },                  
        },
        {
          name: 'icon',
          title: 'Icons',
          type: 'icon'
        },
        {
          type: 'link',
        },
        linkedImage,
        { type: 'imageGroup' },
        {
          type: 'button',
        }, 
        { title: 'Video', name: 'video', type: 'video' },
        { title: 'iFrame', name: 'iframe', type: 'iframe' },
        {
          title: 'Forms',
          name: 'forms',
          type: 'reference',
          to: [ {type: 'form'}]
        },
        {
          title: 'Accordion',
          name: 'accordion',
          type: 'reference',
          to: [{ type: 'accordion' }]
        },
        {
          title: 'Slider',
          name: 'slider',
          type: 'reference',
          to: [{ type: 'slider' }]
        },
      ],
      hidden: ({ parent }) => parent?.columnLayout !== '4',
    }),
  ],

  preview: {
    select: {
      layout: 'columnLayout',
    },
    prepare({ layout }) {
      return {
        title: `${layout}-Column Section`,
      }
    },
  },
})
