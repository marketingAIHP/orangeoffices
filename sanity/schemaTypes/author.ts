import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'name'}}),
    defineField({name: 'designation', type: 'string'}),
    defineField({name: 'bio', type: 'text', rows: 4}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url'}),
  ],
  preview: {select: {title: 'name', subtitle: 'designation', media: 'image'}},
})
