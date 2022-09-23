import { AuthProps } from '@customTypes/apiType'
import { PermissionGroupsTS } from '@customTypes/apiType'

export const permissionApi = {
  getPermissionGroups: async (
    zd: AuthProps
  ): Promise<PermissionGroupsTS | undefined> => {
    try {
      const res = await fetch(
        `https://${zd.subdomain}.zendesk.com/api/v2/guide/permission_groups.json`,
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
