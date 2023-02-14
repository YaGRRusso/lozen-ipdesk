import { AuthProps } from '@customTypes/ApiType'
import { ArticlesProps, NewArticleProps } from '@customTypes/ArticleType'

export interface CreateArticleProps {
  permission_group_id: number
  user_segment_id?: null
  section_id: number
  title: string
  body: string
  promoted?: boolean
}

export const articlesApi = {
  getArticles: async (
    zd: AuthProps,
    page?: number
  ): Promise<ArticlesProps | undefined> => {
    try {
      const res = await fetch(
        `https://${zd.domain}/api/v2/help_center/${
          zd.locale
        }/articles.json?page=${page || 1}&per_page=100`,
        {
          headers: {
            Authorization:
              'Basic ' + btoa(`${zd.email_address}:${zd.password}`),
          },
        }
      )
      return res.json()
    } catch (e) {
      console.error(e)
    }
  },
  createArticle: async (
    zd: AuthProps,
    article: CreateArticleProps
  ): Promise<NewArticleProps | undefined> => {
    try {
      const res = await fetch(
        `https://${zd.domain}/api/v2/help_center/sections/${article.section_id}/articles.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Basic ' + btoa(`${zd.email_address}:${zd.password}`),
          },
          body: JSON.stringify({
            article,
            notify_subscribers: false,
            promoted: true,
          }),
        }
      )
      return res.json()
    } catch (e) {
      console.error(e)
    }
  },
  deleteArticle: async (zd: AuthProps, id: number) => {
    try {
      await fetch(
        `https://${zd.domain}/api/v2/help_center/articles/${id}.json`,
        {
          method: 'DELETE',
          headers: {
            Authorization:
              'Basic ' + btoa(`${zd.email_address}:${zd.password}`),
          },
        }
      )
    } catch (e) {
      console.error(e)
    }
  },
}
