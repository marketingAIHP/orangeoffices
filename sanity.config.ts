import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './sanity/schemaTypes'

export default defineConfig({
  name: 'orange-offices',
  title: 'Orange Offices',
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '7uyaubkj',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  plugins: [deskTool()],
  schema: {types: schemaTypes},
})
