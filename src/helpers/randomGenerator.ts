import Chance from 'chance'
import { ArticleProps } from '../types/ArticleType'
import { CategoryProps } from '../types/CategoriesType'
import { SectionProps } from '../types/SectionsType'

const chance = new Chance()
const between = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomGenerator = {
  title: () => chance.sentence({ words: between(2, 4) }).replace('.', ''),
  description: () => chance.sentence({ words: between(4, 6) }),
  body: () => chance.sentence({ words: between(24, 56) }),
}
