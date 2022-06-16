export type DomainTS = {
   subdomain: string,
   email_address: string,
   password: string,
   locale: 'pt-br' | 'en-us'
}

export type CategoryTS = {
   id?: number,
   position?: number,
   locale?: string,
   name: string,
   description: string
}

export type NewCategoryTS = {
   category: CategoryTS
}

export type CategoriesTS = {
   categories: CategoryTS[],
   count: number
}