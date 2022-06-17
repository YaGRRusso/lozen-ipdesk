import { DomainTS } from "../types/domainType";
import { CategoryTS, NewCategoryTS, CategoriesTS } from "../types/categoriesType";

export const categoriesApi = {
   getCategories: async (zd: DomainTS): Promise<CategoriesTS> => {
      const res = await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/${zd.locale}/categories.json`, {
         headers: {
            'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
         }
      })
      return res.json()
   },
   createCategory: async (zd: DomainTS, category: CategoryTS): Promise<NewCategoryTS> => {
      const res = await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/categories.json`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
         },
         body: JSON.stringify({
            category: category
         })
      })
      return res.json();
   },
   deleteCategory: async (zd: DomainTS, id: number) => {
      await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/categories/${id}`, {
         method: 'DELETE',
         headers: {
            'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
         }
      })
   }
}