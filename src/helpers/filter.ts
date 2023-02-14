import { InfoTableRowsProps } from '@components'
import { ArticlesProps, ArticleProps } from '../types/ArticleType'

export type PermissionListProps = {
  id?: number
  name?: string
}

export const getPermissionList = (
  articlesObj: ArticlesProps | null | undefined
): PermissionListProps[] | undefined => {
  if (articlesObj) {
    const { articles } = articlesObj
    const listId = articles.reduce((acc: PermissionListProps[], current) => {
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
  articlesList: ArticleProps[],
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
