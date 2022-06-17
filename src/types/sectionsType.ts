export type SectionTS = {
   category_id: number,
   id?: number,
   position?: number,
   locale?: string,
   name: string,
   description: string
}

export type NewSectionTS = {
   section: SectionTS
}

export type SectionsTS = {
   sections: SectionTS[],
   count: number
}