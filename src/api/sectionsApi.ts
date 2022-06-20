import { DomainTS } from "../types/apiType";
import { NewSectionTS, SectionsTS, SectionTS } from "../types/sectionsType";

export const sectionsApi = {
   getSections: async (zd: DomainTS): Promise<SectionsTS | undefined> => {
      try {
         const res = await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/${zd.locale}/sections.json`, {
            headers: {
               'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
            }
         })
         return res.json()
      } catch (e) {
         alert('Usuário Não Conectado')
      }
   },
   createSection: async (zd: DomainTS, section: SectionTS): Promise<NewSectionTS | undefined> => {
      try {
         const res = await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/categories/${section.category_id}/sections.json`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
            },
            body: JSON.stringify({
               section
            })
         });
         return res.json()
      } catch (e) {
         alert('Usuário Não Conectado')
      }
   },
   deleteSection: async (zd: DomainTS, id: number) => {
      try {
         await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/sections/${id}.json`, {
            method: 'DELETE',
            headers: {
               'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
            }
         });
      } catch (e) {
         alert('Usuário Não Conectado')
      }
   }
}