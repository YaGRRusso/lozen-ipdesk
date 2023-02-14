import { AuthProps, PermissionGroupsProps } from '@customTypes/ApiType'

export const permissionApi = {
  getPermissionGroups: async (
    zd: AuthProps
  ): Promise<PermissionGroupsProps | undefined> => {
    try {
      const res = await fetch(
        `https://${zd.domain}/api/v2/guide/permission_groups.json`,
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
