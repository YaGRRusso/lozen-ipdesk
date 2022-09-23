export type CategoryTS = {
  created_at: string
  description: string
  html_url: string
  id: number
  locale: 'pt-br' | 'en-us'
  name: string
  outdated: boolean
  position: number
  source_locale: 'pt-br' | 'en-us'
  updated_at: string
  url: string
}

export type NewCategoryTS = {
  category: CategoryTS
  error?: string
}

export type CategoriesTS = {
  categories: CategoryTS[]
  count: number
  next_page: string | null
  page: number
  page_count: number
  per_page: number
  previous_page: string | null
  sort_by: 'position'
  sort_order: 'asc' | 'desc'
}
