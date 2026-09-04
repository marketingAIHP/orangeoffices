import {defineQuery} from 'groq'

const postProjection = `{
  _id, title, "slug": slug.current, excerpt, body, publishedAt, modifiedAt,
  readingTime, featured,
  featuredImage{alt, caption, asset->{_id, url, metadata{dimensions, lqip}}},
  author->{_id, name, "slug": slug.current, designation, image{alt, asset->{url}}},
  faqs[]{question, answer},
  categories[]->{_id, title, "slug": slug.current},
  seo{title, description, canonicalUrl, noIndex, ogTitle, ogDescription,
    ogImage{alt, asset->{url}}},
  wordpressId, legacyUrl
}`

export const ALL_POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${postProjection}`)
export const POST_BY_SLUG_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0] ${postProjection}`)
export const POST_SLUGS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)]{"slug": slug.current}`)
export const FEATURED_POSTS_QUERY = defineQuery(`*[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc)[0...6] ${postProjection}`)
export const POSTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "post" && $category in categories[]->slug.current && defined(slug.current)] | order(publishedAt desc) ${postProjection}`)
export const RELATED_POSTS_QUERY = defineQuery(`*[_type == "post" && _id != $id && count((categories[]._ref)[@ in $categoryRefs]) > 0 && defined(slug.current)] | order(publishedAt desc)[0...3] ${postProjection}`)
