import type {PortableTextBlock} from '@portabletext/types'

export interface SanityPost {
  _id: string
  title: string
  slug: string
  excerpt?: string
  body?: PortableTextBlock[]
  publishedAt: string
  modifiedAt?: string
  featuredImage?: {alt?: string; caption?: string; asset?: {url?: string; metadata?: {dimensions?: {width?: number; height?: number}; lqip?: string}}}
  author?: {name?: string; slug?: string; designation?: string}
  categories?: Array<{_id: string; title: string; slug: string}>
  seo?: {title?: string; description?: string; canonicalUrl?: string; noIndex?: boolean; ogTitle?: string; ogDescription?: string; ogImage?: {alt?: string; asset?: {url?: string}}}
  wordpressId?: number
  legacyUrl?: string
}
