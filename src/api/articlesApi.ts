import { DomainTS } from "../types/apiType";
import { ArticlesTS, ArticleTS, NewArticleTS } from "../types/articleType";

export const articlesApi = {
   getArticles: async (zd: DomainTS): Promise<ArticlesTS | undefined> => {
      const res = await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/${zd.locale}/articles.json`, {
         headers: {
            'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
         }
      });
      return res.json()
   },
   createArticle: async (zd: DomainTS, article: ArticleTS): Promise<NewArticleTS | undefined> => {
      const res = await fetch(`https://${zd.subdomain}.zendesk.com/api/v2/help_center/sections/${article.section_id}/articles.json`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${zd.email_address}:${zd.password}`)
         },
         body: JSON.stringify({
            article
         })
      });
      return res.json()
   },
   deleteArticle: async (zd: DomainTS) => {

   }
}