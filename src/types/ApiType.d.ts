import { ArticlesProps, ArticleProps } from './ArticleType'
import { CategoriesProps } from './CategoriesType'
import { SectionsProps } from './SectionsType'

export type ThemeProps = 'dark' | 'light'

export interface AuthProps {
  domain: string
  email_address: string
  password: string
  // locale: 'pt-br' | 'en-us'
  locale: string
}

export interface PermissionGroupsProps {
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

export interface SearchProps {
  count: number
  next_page: string
  page: number
  page_count: number
  per_page: number
  previous_page: string
  results: ArticleProps[]
}

export interface ApiProps {
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

export interface ApiContextProps {
  categories?: CategoriesProps | null
  sections?: SectionsProps | null
  articles?: ArticlesProps | null
}
