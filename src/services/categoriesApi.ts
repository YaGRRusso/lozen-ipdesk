import { AuthProps } from '@customTypes/ApiType'
import { NewCategoryProps, CategoriesProps } from '@customTypes/CategoriesType'

export interface CreateCategoryProps {
  name: string
  description: string
  locale: string
  position: number
}

export const categoriesApi = {
  getCategories: async (
    zd: AuthProps,
    page?: number
  ): Promise<CategoriesProps | undefined> => {
    try {
      const res = await fetch(
        `https://${zd.domain}/api/v2/help_center/${
          zd.locale
        }/categories.json?page=${page || 1}&per_page=100`,
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
  createCategory: async (
    zd: AuthProps,
    category: CreateCategoryProps
  ): Promise<NewCategoryProps | undefined> => {
    try {
      const res = await fetch(
        `https://${zd.domain}/api/v2/help_center/${zd.locale}/categories.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Basic ' + btoa(`${zd.email_address}:${zd.password}`),
          },
          body: JSON.stringify({
            category,
          }),
        }
      )
      return res.json()
    } catch (e) {
      console.error(e)
    }
  },
  deleteCategory: async (zd: AuthProps, id: number) => {
    try {
      await fetch(
        `https://${zd.domain}/api/v2/help_center/${zd.locale}/categories/${id}`,
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
