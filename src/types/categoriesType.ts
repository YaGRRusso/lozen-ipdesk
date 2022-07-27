export type CategoryTS = {
  id?: number;
  position?: number;
  locale?: string;
  name: string;
  description: string;
};

export type NewCategoryTS = {
  category: CategoryTS;
};

export type CategoriesTS = {
  categories: CategoryTS[];
  count: number;
};
