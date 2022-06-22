import { DomainTS } from "../types/apiType";
import { CategoryTS, NewCategoryTS, CategoriesTS } from "../types/categoriesType";

export const categoriesApi = {
   getCategories: async (zd: DomainTS): Promise<CategoriesTS | undefined> => {
      try {
         const res = await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/${zd.locale}/categories.json`, {
            headers: {
               'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
            }
         })
         return res.json()
      } catch (e) {
         alert('Usuário Não Conectado')
      }
   },
   createCategory: async (zd: DomainTS, category: CategoryTS): Promise<NewCategoryTS | undefined> => {
      try {
         const res = await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/categories.json`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
            },
            body: JSON.stringify({
               category
            })
         })
         return res.json();
      } catch (e) {
         alert('Usuário Não Conectado')
      }
   },
   deleteCategory: async (zd: DomainTS, id: number) => {
      try {
         await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/categories/${id}`, {
            method: 'DELETE',
            headers: {
               'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
            }
         })
      } catch (e) {
         alert('Usuário Não Conectado')
      }
   }
}