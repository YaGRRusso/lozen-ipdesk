export type ArticleTS = {
   section_id: number,
   id?: number,
   position?: number,
   locale?: string,
   name: string,
   description: string
}

export type NewArticleTS = {
   article: ArticleTS
}

export type ArticlesTS = {
   articles: ArticleTS[],
   count: number
}