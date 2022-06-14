import Chance from "chance";
import { CategoryTS } from "../types/types";

const randomGen = new Chance()
const randomNum = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

export default {
   randomCategory: () => {
      const category: CategoryTS = {
         description: randomGen.sentence({ words: randomNum(4, 6) }),
         locale: 'pt-br',
         name: randomGen.sentence({ words: randomNum(2, 4) }).replace('.', ''),
      }
      console.log(category)
      return category
   }
}