export type ArticleTS = {
   permission_group_id: number,
   user_segment_id: number | null,
   id?: number,
   position?: number,
   locale?: string,
   title: string,
   body: string,
   description: string,
   section_id: number,
   promoted?: boolean
}

export type NewArticleTS = {
   article: ArticleTS
}

export type ArticlesTS = {
   articles: ArticleTS[],
   count: number
}