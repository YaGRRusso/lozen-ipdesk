import { AuthProps, SearchTS } from '@customTypes/apiType'

export const searchApi = {
  getSearch: async (
    zd: AuthProps,
    query: string
  ): Promise<SearchTS | undefined> => {
    try {
      const res = await fetch(
        `https://${zd.subdomain}.zendesk.com/api/v2/help_center/articles/search?query=${query}`,
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
