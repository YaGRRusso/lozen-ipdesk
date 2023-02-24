import { AuthProps, SearchProps } from '@customTypes/ApiType'

export const searchApi = {
  getSearch: async (
    zd: AuthProps,
    query: string
  ): Promise<SearchProps | undefined> => {
    try {
      const res = await fetch(
        `https://${zd.domain}/api/v2/help_center/${zd.locale}/articles/search?query=${query}`,
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
}
