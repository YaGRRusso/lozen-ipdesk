import Chance from "chance";
import { ArticleTS } from "../types/articleType";
import { CategoryTS } from "../types/categoriesType";
import { SectionTS } from "../types/sectionsType";

const chance = new Chance();
const between = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomGenerator = {
  title: () => chance.sentence({ words: between(2, 4) }).replace(".", ""),
  description: () => chance.sentence({ words: between(4, 6) }),
  body: () => chance.sentence({ words: between(24, 56) }),
  randomCategory: (position: number) => {
    const category: CategoryTS = {
      description: chance.sentence({ words: between(4, 6) }),
      locale: "pt-br",
      name: chance.sentence({ words: between(2, 4) }).replace(".", ""),
      position,
    };
    return category;
  },
  randomSection: (categoryId: number, position: number) => {
    const category: SectionTS = {
      category_id: categoryId,
      description: chance.sentence({ words: between(4, 6) }),
      locale: "pt-br",
      name: chance.sentence({ words: between(2, 4) }).replace(".", ""),
      position,
    };
    return category;
  },
  randomArticle: (
    sectionId: number,
    permissionId: number,
    userId: number | null,
    promoted?: boolean
  ) => {
    const article: ArticleTS = {
      section_id: sectionId,
      permission_group_id: permissionId,
      user_segment_id: userId,
      title: chance.sentence({ words: between(2, 4) }).replace(".", ""),
      description: chance.sentence({ words: between(4, 6) }),
      body: chance.sentence({ words: between(24, 56) }),
      locale: "pt-br",
      promoted: promoted ?? false,
    };
    return article;
  },
};
