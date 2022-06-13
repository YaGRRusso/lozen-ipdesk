import zendesk from './domain'
import { randomCategory } from "../helpers/loremIpsum";
import { CategoryTS, CategoriesTS } from "../types/types";

export const categoriesApi = {
   getCategories: async (): Promise<CategoriesTS> => {
      const res = await fetch(`https://${zendesk.subdomain}.zendesk.com/api/v2/help_center/${zendesk.locale}/categories.json`, {
         headers: {
            'Authorization': 'Basic ' + btoa(`${zendesk.email_address}:${zendesk.password}`)
         }
      })
      return res.json();
   },
   createCategory: async (category: CategoryTS | void): Promise<CategoryTS> => {
      const res = await fetch(`https://${zendesk.subdomain}.zendesk.com/api/v2/help_center/categories.json`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${zendesk.email_address}:${zendesk.password}`)
         },
         body: JSON.stringify({
            category: category ?? randomCategory
         })
      })
      return res.json();
   },
   deleteCategories: async (id: number) => {
      await fetch(`https://${zendesk.subdomain}.zendesk.com/api/v2/help_center/categories/${id}`, {
         method: 'DELETE',
         headers: {
            'Authorization': 'Basic ' + btoa(`${zendesk.email_address}:${zendesk.password}`)
         }
      })
   }
}