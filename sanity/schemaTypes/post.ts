import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'

const textBlocks = () => [
  defineArrayMember({type: 'block'}),
]

// These two members match the Portable Text objects already stored in existing
// post bodies. Defining them prevents the Studio from showing "Unknown block".
const bodyBlocks = () => [
  ...textBlocks(),
  defineArrayMember({
    type: 'object',
    name: 'contentImage',
    title: 'Image',
    fields: [
      defineField({name: 'asset', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
      defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
      defineField({name: 'caption', type: 'string'}),
      defineField({name: 'sourceUrl', title: 'Source URL', type: 'url'}),
    ],
    preview: {select: {title: 'alt', media: 'asset'}},
  }),
  defineArrayMember({
    type: 'object',
    name: 'table',
    title: 'Table',
    fields: [
      defineField({
        name: 'rows',
        type: 'array',
        of: [defineArrayMember({
          type: 'object',
          name: 'tableRow',
          fields: [defineField({name: 'cells', type: 'array', of: [defineArrayMember({type: 'string'})]})],
        })],
      }),
    ],
  }),
]

export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
        defineField({name: 'caption', type: 'string'}),
      ],
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'content',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'A short card summary. Do not put the TL;DR here.',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'tldr',
      title: 'TL;DR',
      description: 'A concise summary shown in its own highlighted box before the article body.',
      type: 'array',
      of: textBlocks(),
      validation: (rule) => rule.max(4).warning('Keep the TL;DR concise.'),
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Main content',
      description: 'The full article only. Do not add the TL;DR or FAQs here.',
      type: 'array',
      of: bodyBlocks(),
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      description: 'Questions and answers shown after the article body.',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        name: 'faq',
        title: 'FAQ',
        fields: [
          defineField({name: 'question', type: 'string', validation: (rule) => rule.required()}),
          defineField({name: 'answer', type: 'text', rows: 4, validation: (rule) => rule.required()}),
        ],
        preview: {select: {title: 'question'}},
      })],
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Meta title', type: 'string', validation: (rule) => rule.max(60).warning('Keep under 60 characters.')}),
        defineField({name: 'description', title: 'Meta description', type: 'text', rows: 3, validation: (rule) => rule.max(160).warning('Keep under 160 characters.')}),
      ],
      group: 'seo',
    }),
  ],
  preview: {select: {title: 'title', media: 'featuredImage'}},
})
