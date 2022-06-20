export type ArticleTS = {
   permission_group_id?: number,
   id?: number,
   position?: number,
   locale?: string,
   title: string,
   body: string,
   description: string,
   section_id: number
}

export type NewArticleTS = {
   article: ArticleTS
}

export type ArticlesTS = {
   articles: ArticleTS[],
   count: number
}