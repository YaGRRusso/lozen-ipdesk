export interface CategoryProps {
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

export interface NewCategoryProps {
  category: CategoryProps
  error?: string
}

export interface CategoriesProps {
  categories: CategoryProps[]
  count: number
  next_page: string | null
  page: number
  page_count: number
  per_page: number
  previous_page: string | null
  sort_by: 'position'
  sort_order: 'asc' | 'desc'
}
