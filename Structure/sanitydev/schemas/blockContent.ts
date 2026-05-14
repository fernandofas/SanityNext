import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from '../icons/icons';

import { defineField, defineType } from 'sanity'

// import { UserIcon } from '@sanity/icons'

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
  name: 'columnBack',
  type: 'object',
  title: 'Column Layout',
  fields: [
    {
        name: 'columnLayout',
        title: 'Number of Columns',
        type: 'string',    
        options: {
        list: [
            { title: 'One Columns', value: '1', name: 'One Column' },
            { title: 'Two Columns', value: '2', name: 'Two Columns' },
            { title: 'Three Columns', value: '3', name: 'Three Columns' },
            { title: 'Four Columns', value: '4',  name: 'Four Columns' },
            
        ],
        layout: 'radio',
        },
        initialValue: '1',
        validation: Rule => Rule.required(),
    }, 
    {
      name: 'columnName',
      title: 'Content Name  (used to visualize the content by name on the dashboard', //to keep track on the preview
      type: 'string'
    },
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
      title: 'Background image (Optional)',
      options: { hotspot: true },
    }, 
    {
      name: 'columnContent',
      type: 'array',
      title: 'Columns',
      of: [
        {
          type: 'object',
          fields: [
             {
              name: 'contentName',
              title: 'Content Name (used to visualize the content by name on the dashboard)',
              type: 'string'
            },
            {
              name: 'backgroundColor',
              type: 'color',
              title: 'Background Color (Optional) color code to be used on the HEX field: 314D55, 1E2E32, 1C2532, 534293, 00FFC2',
              options: {
                enableAlpha: true,
              },
            },
            {
              name: 'backgroundImage',
              type: 'image',
              title: 'Background image (It will cover the whole column with an image)',
              options: { hotspot: true },
            }, 
            // {
            //   name: 'extraClass',
            //   type: 'string',
            //   title: 'Extra Class for CSS (Optional and just if the css class is set up)',
            //   options: {
            //     list: [
            //         { title: 'Align Center', value: 'content-center', name: 'Align Center' },
            //         { title: 'Align Left', value: 'content-left', name: 'Align Left' },
            //         { title: 'Align Right', value: 'content-right', name: 'Align Right' },                    
            //     ],
            //     layout: 'radio',
            //     },
            //     initialValue: '',
            // },
              {
              title: 'Text Color (Optional)',
              name: 'textColor',
              type: 'color',
              options: {
                enableAlpha: true,
              },
              },
              {
                title: 'Heading (Optional)',
                name: 'heading',
                type: 'string',
                initialValue: '',
                options: {
                  list: [
                    {
                      title: 'H1',
                      value: 'h1',
                      name: 'H1',
                    },
                    {
                      title: 'H2',
                      value: 'h2',
                      name: 'H2',
                    },
                    {
                      title: 'H3',
                      value: 'h3',
                      name: 'H3',
                    },
                    {
                      title: 'H4',
                      value: 'h4',
                      name: 'H4',
                    },
                  ]
              }
              },
              {
                title: 'Title (Optional)',
                type: 'string',
                name: 'title'
              },
            // {
            //   type: 'code',
            //   name: 'myCodeField',
            //   title: 'Custom code',
            //   options: {
            //   language: 'javascript',
            //   languageAlternatives: [
            //     {title: 'Javascript', value: 'javascript'},
            //     {title: 'HTML', value: 'html'},
            //     {title: 'CSS', value: 'css'},
            //   ],
            //   // withFilename: true,
            // },
            // },
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
                      { title: 'Left',    value: 'left',    icon: AlignLeftIcon },
                      { title: 'Center',  value: 'center',  icon: AlignCenterIcon },
                      { title: 'Right',   value: 'right',   icon: AlignRightIcon },
                      { title: 'Justify', value: 'justify', icon: AlignJustifyIcon }
                    ],
                  },                  
                },
                {
                  title: 'Video',
                  name: 'video',
                  type: 'video'
                },
                {
                  title: 'iFrame',
                  name: 'iframe',
                  type: 'iframe'
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
                {
                  title: 'Sections',
                  name: 'sections',
                  type: 'reference',
                  to: [ {type: 'sections'}]
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
                {
                  title: 'Forms',
                  name: 'form',
                  type: 'reference',
                  to: [{type: 'form'}]
                },
              ],
            },
          ],
          preview: {
            select: {
              name: 'contentName'
            },
            prepare({ name }) {
              return {
                title: name
              }
            },
          },
        },
      ],
      validation: Rule =>
        Rule.custom((columns, context) => {
            //const parent = context?.parent as { columns?: any };
            // const columnCount = parent?.columns;
            const columnCount = (context?.parent as { columns?: any })?.columns;
            const columnArray = columns as unknown[];
           if (columnCount && columnArray.length !== columnCount) {
                return `You must provide exactly ${columnCount} column(s).`;
            }
            return true;
        }),
    },
  ],
  preview: {
    select: {
      layout: 'columnLayout',
      name: 'columnName'
    },
    prepare({ layout, name }) {
      return {
        title: `${layout} Column${layout > 1 ? 's' : ''}`,
        subtitle: name
      }
    },
  },
});
