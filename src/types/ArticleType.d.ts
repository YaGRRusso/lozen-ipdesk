export interface ArticleProps {
  author_id: number
  body?: string
  comments_disabled: boolean
  created_at: string
  draft: boolean
  edited_at: string
  html_url: string
  id: number
  label_names: string[]
  locale: 'pt-br' | 'en-us'
  name: string
  outdated: boolean
  outdated_locales: string[]
  permission_group_id: number
  position: number
  promoted: boolean
  section_id: number
  source_locale: 'pt-br' | 'en-us'
  title: string
  updated_at: string
  url: string
  user_segment_id: number | null
  vote_count: number
  vote_sum: number
}

export interface NewArticleProps {
  article: ArticleProps
  error?: string
}

export interface ArticlesProps {
  articles: ArticleProps[]
  count: number
  next_page: string
  page: number
  page_count: number
  per_page: number
  previous_page: null | string
  sort_by: 'position'
  sort_order: 'asc' | 'desc'
}
