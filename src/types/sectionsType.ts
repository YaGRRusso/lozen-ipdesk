export type SectionTS = {
  category_id: number
  created_at: string
  description: string
  html_url: string
  id: number
  locale: string
  name: string
  outdated: boolean
  parent_section_id: null | number
  position: number
  sorting: 'manual'
  source_locale: 'pt-br' | 'en-us'
  theme_template: string
  updated_at: string
  url: string
}

export type NewSectionTS = {
  section: SectionTS
  error?: string
}

export type SectionsTS = {
  sections: SectionTS[]
  count: number
  next_page: null | string
  page: number
  page_count: number
  per_page: number
  previous_page: null | string
  sort_by: 'position'
  sort_order: 'asc' | 'desc'
}
