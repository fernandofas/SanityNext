import { defineType } from 'sanity'

export default defineType({
  name: 'logoMenu',
  type: 'document',
  title: 'Logo Header',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Logo Title',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Logo Image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image', // to show the thumbnail
      dimensions: 'image.asset.metadata.dimensions',
      format: 'image.asset.metadata.format',
      size: 'image.asset.size', // in bytes
      imageUrl: 'image.asset.url',
    },
    prepare({ title, media, dimensions, format, size, imageUrl }) {
      const width = dimensions?.width || '?'
      const height = dimensions?.height || '?'
      const ext = format?.toUpperCase() || 'Unknown'
      const formattedSize = size
        ? size >= 1048576
          ? `${(size / 1048576).toFixed(1)} MB`
          : `${(size / 1024).toFixed(1)} KB`
        : 'N/A'

      const subtitle = `${width}×${height} px • ${ext} • ${formattedSize} • URL: ${imageUrl || 'N/A'}`

      return {
        title: title || 'Untitled Logo',
        subtitle,
        media,
      }
    },
  },
})


