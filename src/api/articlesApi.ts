import { DomainTS } from "../types/apiType";
import { ArticlesTS, ArticleTS, NewArticleTS } from "../types/articleType";

export const articlesApi = {
   getArticles: async (zd: DomainTS): Promise<ArticlesTS | undefined> => {
      try {
         const res = await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/${zd.locale}/articles.json`, {
            headers: {
               'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
            }
         });
         return res.json()
      } catch (e) {
         alert('Usuário Não Conectado')
      }
   },
   createArticle: async (zd: DomainTS, article: ArticleTS): Promise<NewArticleTS | undefined> => {
      try {
         const res = await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/sections/${article.section_id}/articles.json`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
            },
            body: JSON.stringify({
               article, notify_subscribers: false, promoted: true
            })
         });
         return res.json()
      } catch (e) {
         alert('Usuário Não Conectado')
      }
   },
   deleteArticle: async (zd: DomainTS, id: number) => {
      try {
         await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/articles/${id}.json`, {
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