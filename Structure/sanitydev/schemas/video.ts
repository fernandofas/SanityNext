import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'kind',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Upload', value: 'upload' },
          { title: 'YouTube', value: 'youtube' },
        ],
        layout: 'radio',
      },
      initialValue: 'upload',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Video File',
      type: 'file',
      options: { accept: 'video/*' },
      hidden: ({ parent }) => parent?.kind !== 'upload',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      hidden: ({ parent }) => parent?.kind !== 'youtube',
    }),
    defineField({ name: 'poster', title: 'Poster Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: false }),
    defineField({ name: 'controls', title: 'Show Controls', type: 'boolean', initialValue: true }),
    defineField({ name: 'loop', title: 'Loop', type: 'boolean', initialValue: false }),
    defineField({ name: 'muted', title: 'Muted', type: 'boolean', initialValue: false }),
    defineField({ name: 'playsInline', title: 'Plays Inline (iOS)', type: 'boolean', initialValue: true }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '1:1', value: '1:1' },
        ],
        layout: 'radio',
      },
      initialValue: '16:9',
    }),
  ],
  preview: {
    select: { kind: 'kind', youtubeUrl: 'youtubeUrl', file: 'file' },
    prepare({ kind, youtubeUrl, file }) {
      const title = kind === 'youtube' ? `YouTube: ${youtubeUrl || ''}` : (file?.asset ? 'Uploaded video' : 'Video');
      return { title };
    },
  },
})
