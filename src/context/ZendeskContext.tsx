import React, { createContext, useContext, useEffect, useState } from "react";
import { articlesApi, CreateArticleProps } from "../api/articlesApi";
import { categoriesApi, CreateCategoryProps } from "../api/categoriesApi";
import { CreateSectionProps, sectionsApi } from "../api/sectionsApi";
import { ArticlesTS, ArticleTS } from "../types/articleType";
import { CategoriesTS, CategoryTS } from "../types/categoriesType";
import { SectionsTS, SectionTS } from "../types/sectionsType";
import { useAuthContext } from "./AuthContext";

interface ZendeskContextProps {
  loadCategories: (page?: number) => Promise<void>;
  deleteCategory: (id: number) => void;
  createCategory: (
    data: CreateCategoryProps,
    position?: number
  ) => Promise<void>;
  categories: CategoriesTS | undefined;
  categoriesLoading: boolean;

  loadSections: (page?: number) => Promise<void>;
  deleteSection: (id: number) => void;
  createSection: (data: CreateSectionProps, position?: number) => Promise<void>;
  sections: SectionsTS | undefined;
  sectionsLoading: boolean;

  loadArticles: (page?: number) => Promise<void>;
  deleteArticle: (id: number) => void;
  createArticle: (data: CreateArticleProps) => Promise<void>;
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

  const loadCategories = async (page?: number) => {
    if (
      (categories?.page !== (page ?? 1) && loggedAccount) ||
      (!categories && !categoriesLoading && loggedAccount)
    ) {
      setCategoriesLoading(true);
      const res = await categoriesApi.getCategories(loggedAccount, page);
      if (res) {
        setCategories(res);
      } else {
        setLogoutAccount();
      }
      setCategoriesLoading(false);
    }
  };

  const deleteCategory = async (id: number) => {
    if (loggedAccount) await categoriesApi.deleteCategory(loggedAccount, id);
    if (categories) {
      const newList = categories.categories.filter((item) => item.id !== id);
      setCategories({
        ...categories,
        count: categories.count - 1,
        categories: newList,
      });
    }
  };

  const createCategory = async (
    data: CreateCategoryProps,
    position?: number
  ) => {
    if (loggedAccount) {
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
    }
  };

  const loadSections = async (page?: number) => {
    if (
      (sections?.page !== (page ?? 1) && loggedAccount) ||
      (!sections && !sectionsLoading && loggedAccount)
    ) {
      setSectionsLoading(true);
      const res = await sectionsApi.getSections(loggedAccount, page);
      if (res) {
        setSections(res);
      } else {
        setLogoutAccount();
      }
      setSectionsLoading(false);
    }
  };

  const deleteSection = async (id: number) => {
    if (loggedAccount) await sectionsApi.deleteSection(loggedAccount, id);
    if (sections) {
      const newList = sections.sections.filter((item) => item.id !== id);
      setSections({
        ...sections,
        count: sections.count - 1,
        sections: newList,
      });
    }
  };

  const createSection = async (data: CreateSectionProps, position?: number) => {
    if (loggedAccount) {
      const createdSection = await sectionsApi.createSection(
        loggedAccount,
        data
      );
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
    }
  };

  const loadArticles = async (page?: number) => {
    if (
      (articles?.page !== (page ?? 1) && loggedAccount) ||
      (!articles && !articlesLoading && loggedAccount)
    ) {
      setArticlesLoading(true);
      const res = await articlesApi.getArticles(loggedAccount, page);
      if (res) {
        setArticles(res);
      } else {
        setLogoutAccount();
      }
      setArticlesLoading(false);
    }
  };

  const deleteArticle = async (id: number) => {
    if (loggedAccount) await articlesApi.deleteArticle(loggedAccount, id);
    if (articles) {
      const newList = articles.articles.filter((item) => item.id !== id);
      setArticles({
        ...articles,
        count: articles.count - 1,
        articles: newList,
      });
    }
  };

  const createArticle = async (data: CreateArticleProps, position?: number) => {
    if (loggedAccount) {
      const createdArticle = await articlesApi.createArticle(
        loggedAccount,
        data
      );
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
