import {defineAssetAspect, defineField} from 'sanity'

export default defineAssetAspect({
  name: 'all',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'string',
      title: 'Plain String',
      type: 'string',
    }),
  ],
})
