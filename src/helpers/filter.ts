import { ArticlesTS } from "../types/articleType"

export type PermissionListTS = {
   id?: number
   name?: string
}

export const getPermissionList = (articlesObj: ArticlesTS | null | undefined): PermissionListTS[] | undefined => {
   if (articlesObj) {
      const { articles } = articlesObj
      const listId = articles.reduce((acc: PermissionListTS[], current) => {
         acc.push({ name: current.permission_group_id.toString(), id: current.permission_group_id })
         return acc
      }, [])
      const filteredList = listId.filter((value, index, self) => (
         index === self.findIndex((t) => (
            t.id === value.id
         ))
      ))
      return filteredList
   }
}