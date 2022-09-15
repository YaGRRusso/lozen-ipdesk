import React, { createContext, useContext, useEffect, useState } from "react";
import { articlesApi } from "../api/articlesApi";
import { categoriesApi } from "../api/categoriesApi";
import { sectionsApi } from "../api/sectionsApi";
import { ArticlesTS, ArticleTS } from "../types/articleType";
import {
  CategoriesTS,
  CategoryTS,
  NewCategoryTS,
} from "../types/categoriesType";
import { SectionsTS, SectionTS } from "../types/sectionsType";
import { useAuthContext } from "./AuthContext";

interface ZendeskContextProps {
  loadCategories: () => Promise<void>;
  deleteCategory: (id: number) => void;
  createCategory: (data: CategoryTS, position?: number) => Promise<void>;
  categories: CategoriesTS | undefined;
  categoriesLoading: boolean;

  loadSections: () => Promise<void>;
  deleteSection: (id: number) => void;
  createSection: (data: SectionTS, position?: number) => Promise<void>;
  sections: SectionsTS | undefined;
  sectionsLoading: boolean;

  loadArticles: () => Promise<void>;
  deleteArticle: (id: number) => void;
  createArticle: (data: ArticleTS) => Promise<void>;
  articles: ArticlesTS | undefined;
  articlesLoading: boolean;
}

const ZendeskContext = createContext<ZendeskContextProps>(
  {} as ZendeskContextProps
);

export const ZendeskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loggedAccount, setLogoutAccount } = useAuthContext();

  const [categories, setCategories] = useState<CategoriesTS | undefined>();
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const [sections, setSections] = useState<SectionsTS | undefined>();
  const [sectionsLoading, setSectionsLoading] = useState(false);

  const [articles, setArticles] = useState<ArticlesTS | undefined>();
  const [articlesLoading, setArticlesLoading] = useState(false);

  const clearZendeskContext = () => {
    setCategories(undefined);
    setSections(undefined);
    setArticles(undefined);
  };

  useEffect(() => {
    clearZendeskContext();
  }, [loggedAccount]);

  const loadCategories = async (refresh?: boolean) => {
    if (
      (refresh && loggedAccount) ||
      (!categories && !categoriesLoading && loggedAccount)
    ) {
      setCategoriesLoading(true);
      const res = await categoriesApi.getCategories(loggedAccount);
      if (res) {
        setCategories(res);
      } else {
        setLogoutAccount();
      }
      setCategoriesLoading(false);
    }
  };

  const deleteCategory = async (id: number) => {
    await categoriesApi.deleteCategory(loggedAccount, id);
    if (categories) {
      const newList = categories.categories.filter((item) => item.id !== id);
      setCategories({
        ...categories,
        count: categories.count - 1,
        categories: newList,
      });
    }
  };

  const createCategory = async (data: CategoryTS, position?: number) => {
    const createdCategory = await categoriesApi.createCategory(
      loggedAccount,
      data
    );
    if (categories && createdCategory) {
      console.log(createdCategory);
      const newList: CategoryTS[] = categories.categories;
      if (position) {
        newList.splice(position - 1, 0, createdCategory.category);
      } else {
        newList.unshift(createdCategory.category);
      }
      setCategories({
        ...categories,
        categories: newList,
        count: categories.count + 1,
      });
    }
  };

  const loadSections = async (refresh?: boolean) => {
    if (
      (refresh && loggedAccount) ||
      (!sections && !sectionsLoading && loggedAccount)
    ) {
      setSectionsLoading(true);
      const res = await sectionsApi.getSections(loggedAccount);
      if (res) {
        setSections(res);
      } else {
        setLogoutAccount();
      }
      setSectionsLoading(false);
    }
  };

  const deleteSection = async (id: number) => {
    await sectionsApi.deleteSection(loggedAccount, id);
    if (sections) {
      const newList = sections.sections.filter((item) => item.id !== id);
      setSections({
        ...sections,
        count: sections.count - 1,
        sections: newList,
      });
    }
  };

  const createSection = async (data: SectionTS, position?: number) => {
    const createdSection = await sectionsApi.createSection(loggedAccount, data);
    if (sections && createdSection) {
      console.log(createdSection);
      const newList: SectionTS[] = sections.sections;
      if (position) {
        newList.splice(position - 1, 0, createdSection.section);
      } else {
        newList.unshift(createdSection.section);
      }
      setSections({
        ...sections,
        sections: newList,
        count: sections.count + 1,
      });
    }
  };

  const loadArticles = async (refresh?: boolean) => {
    if (
      (refresh && loggedAccount) ||
      (!articles && !articlesLoading && loggedAccount)
    ) {
      setArticlesLoading(true);
      const res = await articlesApi.getArticles(loggedAccount);
      if (res) {
        setArticles(res);
      } else {
        setLogoutAccount();
      }
      setArticlesLoading(false);
    }
  };

  const deleteArticle = async (id: number) => {
    await articlesApi.deleteArticle(loggedAccount, id);
    if (articles) {
      const newList = articles.articles.filter((item) => item.id !== id);
      setArticles({
        ...articles,
        count: articles.count - 1,
        articles: newList,
      });
    }
  };

  const createArticle = async (data: ArticleTS, position?: number) => {
    const createdArticle = await articlesApi.createArticle(loggedAccount, data);
    if (articles && createdArticle) {
      console.log(createdArticle);
      const newList: ArticleTS[] = articles.articles;
      if (position) {
        newList.splice(position - 1, 0, createdArticle.article);
      } else {
        newList.unshift(createdArticle.article);
      }
      setArticles({
        ...articles,
        articles: newList,
        count: articles.count + 1,
      });
    }
  };

  return (
    <ZendeskContext.Provider
      value={{
        categories,
        categoriesLoading,
        loadCategories,
        deleteCategory,
        createCategory,
        sections,
        sectionsLoading,
        loadSections,
        deleteSection,
        createSection,
        articles,
        articlesLoading,
        loadArticles,
        deleteArticle,
        createArticle,
      }}
    >
      {children}
    </ZendeskContext.Provider>
  );
};

export const useZendeskContext = () => {
  const context = useContext(ZendeskContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
};
