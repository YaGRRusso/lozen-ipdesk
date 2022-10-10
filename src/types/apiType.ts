import { ArticlesTS, ArticleTS } from './articleType'
import { CategoriesTS } from './categoriesType'
import { SectionsTS } from './sectionsType'

export type AuthProps = {
  subdomain: string
  email_address: string
  password: string
  locale: 'pt-br' | 'en-us'
}

export type PermissionGroupsTS = {
  count: number
  page_count: number
  per_page: number
  page: number
  next_page: null | string
  previous_page: null | string
  permission_groups: {
    id: number
    name: string
    built_in: boolean
    publish: string[]
    created_at: string
    updated_at: string
    edit: string[]
  }[]
}

export type SearchTS = {
  count: number
  next_page: string
  page: number
  page_count: number
  per_page: number
  previous_page: string
  results: ArticleTS[]
}

export type ApiTS = {
  category_id?: number
  section_id?: number
  id?: number
  locale?: string
  name?: string
  title?: string
  description?: string
  body?: string
  permission_group_id?: number
  user_segment_id?: number | null
}

export type ApiContextTS = {
  categories?: CategoriesTS | null
  sections?: SectionsTS | null
  articles?: ArticlesTS | null
}
