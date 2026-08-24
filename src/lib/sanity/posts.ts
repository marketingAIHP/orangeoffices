import {sanityClient} from 'sanity:client'
import {ALL_POSTS_QUERY, POST_BY_SLUG_QUERY, POST_SLUGS_QUERY} from './queries'

export const getAllPosts = () => sanityClient.fetch(ALL_POSTS_QUERY)
export const getPostBySlug = (slug: string) => sanityClient.fetch(POST_BY_SLUG_QUERY, {slug})
export const getPostSlugs = () => sanityClient.fetch(POST_SLUGS_QUERY)
