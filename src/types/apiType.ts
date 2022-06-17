export type DomainTS = {
   subdomain: string,
   email_address: string,
   password: string,
   locale: 'pt-br' | 'en-us'
}

export type ApiTS = {
   category_id?: number,
   section_id?: number,
   id?: number,
   position?: number,
   locale?: string,
   name?: string,
   description?: string
}