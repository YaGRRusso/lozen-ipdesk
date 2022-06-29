import Chance from "chance";
import { ArticleTS } from "../types/articleType";
import { CategoryTS } from "../types/categoriesType";
import { SectionTS } from "../types/sectionsType";

const chance = new Chance()
const randomNumber = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomGenerator = {
   randomCategory: (position: number) => {
      const category: CategoryTS = {
         description: chance.sentence({ words: randomNumber(4, 6) }),
         locale: 'pt-br',
         name: chance.sentence({ words: randomNumber(2, 4) }).replace('.', ''),
         position
      }
      return category
   },
   randomSection: (categoryId: number, position: number) => {
      const category: SectionTS = {
         category_id: categoryId,
         description: chance.sentence({ words: randomNumber(4, 6) }),
         locale: 'pt-br',
         name: chance.sentence({ words: randomNumber(2, 4) }).replace('.', ''),
         position
      }
      return category
   },
   randomArticle: (sectionId: number, permissionId: number, userId: number | null, promoted?: boolean) => {
      const article: ArticleTS = {
         section_id: sectionId,
         permission_group_id: permissionId,
         user_segment_id: userId,
         title: chance.sentence({ words: randomNumber(2, 4) }).replace('.', ''),
         description: chance.sentence({ words: randomNumber(4, 6) }),
         body: chance.sentence({ words: randomNumber(24, 56) }),
         locale: 'pt-br',
         promoted: promoted ?? false
      }
      return article
   }
}