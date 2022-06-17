import Chance from "chance";
import { CategoryTS } from "../types/categoriesType";

const chance = new Chance()
const randomNumber = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomGenerator = {
   randomCategory: () => {
      const category: CategoryTS = {
         description: chance.sentence({ words: randomNumber(4, 6) }),
         locale: 'pt-br',
         name: chance.sentence({ words: randomNumber(2, 4) }).replace('.', ''),
      }
      return category
   }
}