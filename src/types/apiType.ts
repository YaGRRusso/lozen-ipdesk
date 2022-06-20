import { ArticlesTS } from "./articleType"
import { CategoriesTS } from "./categoriesType"
import { SectionsTS } from "./sectionsType"

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
   locale?: string,
   name?: string,
   title?: string,
   description?: string,
   body?: string,
   permission_group_id?: number
}

export type ApiContextTS = {
   categories?: CategoriesTS | null,
   sections?: SectionsTS | null,
   articles?: ArticlesTS | null
}