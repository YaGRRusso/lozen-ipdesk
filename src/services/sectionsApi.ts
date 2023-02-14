import { AuthProps } from '@customTypes/ApiType'
import { NewSectionProps, SectionsProps } from '@customTypes/SectionsType'

export interface CreateSectionProps {
  category_id: number
  name: string
  description: string
  locale: string
  position: number
}

export const sectionsApi = {
  getSections: async (
    zd: AuthProps,
    page?: number
  ): Promise<SectionsProps | undefined> => {
    try {
      const res = await fetch(
        `https://${zd.domain}/api/v2/help_center/${
          zd.locale
        }/sections.json?page=${page || 1}&per_page=100`,
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
  createSection: async (
    zd: AuthProps,
    section: CreateSectionProps
  ): Promise<NewSectionProps | undefined> => {
    try {
      const res = await fetch(
        `https://${zd.domain}/api/v2/help_center/categories/${section.category_id}/sections.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Basic ' + btoa(`${zd.email_address}:${zd.password}`),
          },
          body: JSON.stringify({
            section,
          }),
        }
      )
      return res.json()
    } catch (e) {
      console.error(e)
    }
  },
  deleteSection: async (zd: AuthProps, id: number) => {
    try {
      await fetch(
        `https://${zd.domain}/api/v2/help_center/sections/${id}.json`,
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
