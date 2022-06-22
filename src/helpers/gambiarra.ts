import { ArticlesTS } from "../types/articleType"

export type PermissionListTS = {
   id: number
   name?: string
}

// export const getPermissionList = (articles: ArticlesTS): PermissionListTS[] | undefined => {
export const getPermissionList = async (articles: ArticlesTS) => {
   if (articles.articles) {
      let permissionIds: PermissionListTS[] = []
      for (let i = 0; i < articles.count; i++) {
         permissionIds[i].id = articles.articles[i].id as number
      }
      //    return [...new Set(permissionIds)]
      console.log(permissionIds)
      return articles.articles
   }
}