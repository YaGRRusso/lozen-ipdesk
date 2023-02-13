import { InfoTableRowsProps } from '@components/index'
import { ArticlesTS, ArticleTS } from '../types/articleType'

export type PermissionListTS = {
  id?: number
  name?: string
}

export const getPermissionList = (
  articlesObj: ArticlesTS | null | undefined
): PermissionListTS[] | undefined => {
  if (articlesObj) {
    const { articles } = articlesObj
    const listId = articles.reduce((acc: PermissionListTS[], current) => {
      acc.push({
        name: current?.permission_group_id.toString(),
        id: current?.permission_group_id,
      })
      return acc
    }, [])
    const filteredList = listId.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    )
    return filteredList
  }
}

export const articlesWithImages = (
  articlesList: ArticleTS[],
  domain: string
) => {
  const tableRows: InfoTableRowsProps[] = []
  if (articlesList) {
    articlesList.map((item) => {
      let warning = false
      let image = false
      const imageCheck = item.body?.match(/<img([^>]*[^/])>/g)
      if (imageCheck && domain) {
        image = true
        const imageUrl = imageCheck[0].match(
          /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))/g
        )
        if (imageUrl && !imageUrl[0].includes(domain)) {
          warning = true
        }
      }

      tableRows.push({
        id: item?.id,
        name: item?.name,
        link: item?.html_url,
        parentId: item?.section_id,
        warning,
        image,
      })
    })
  }
  return tableRows
}
