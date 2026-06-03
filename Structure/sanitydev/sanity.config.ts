import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {defineConfig} from 'sanity'
import {schemaTypes} from './schemaTypes'
import {structureTool} from 'sanity/structure'
import {structure} from './structure'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'SanityNext',
  title: 'NextSanity',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
    codeInput(),
    colorInput(),
  ],

  schema: {
    types: [
      ...schemaTypes,
    ],
  },
})
