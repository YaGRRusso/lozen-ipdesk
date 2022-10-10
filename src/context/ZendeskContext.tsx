import React, { createContext, useContext, useEffect, useState } from 'react'
import { articlesApi, CreateArticleProps } from '@api/articlesApi'
import { categoriesApi, CreateCategoryProps } from '@api/categoriesApi'
import { CreateSectionProps, sectionsApi } from '@api/sectionsApi'
import { permissionApi } from '@api/permissionApi'
import { ArticlesTS, ArticleTS, NewArticleTS } from '@customTypes/articleType'
import { PermissionGroupsTS } from '@customTypes/apiType'
import {
  CategoriesTS,
  CategoryTS,
  NewCategoryTS,
} from '@customTypes/categoriesType'
import { NewSectionTS, SectionsTS, SectionTS } from '@customTypes/sectionsType'
import { useAuthContext } from './AuthContext'

interface ZendeskContextProps {
  easyDelete: boolean
  setEasyDelete: React.Dispatch<React.SetStateAction<boolean>>

  loadCategories: (page?: number) => Promise<void>
  deleteCategory: (id: number) => void
  createCategory: (
    data: CreateCategoryProps,
    position?: number
  ) => Promise<NewCategoryTS | undefined>
  categories: CategoriesTS | undefined
  categoriesLoading: boolean

  loadSections: (page?: number) => Promise<void>
  deleteSection: (id: number) => void
  createSection: (
    data: CreateSectionProps,
    position?: number
  ) => Promise<NewSectionTS | undefined>
  sections: SectionsTS | undefined
  sectionsLoading: boolean

  loadPermission: () => Promise<void>
  permission: PermissionGroupsTS | undefined
  permissionLoading: boolean

  loadArticles: (page?: number) => Promise<void>
  deleteArticle: (id: number) => void
  createArticle: (data: CreateArticleProps) => Promise<NewArticleTS | undefined>
  articles: ArticlesTS | undefined
  articlesLoading: boolean
}

const ZendeskContext = createContext<ZendeskContextProps>(
  {} as ZendeskContextProps
)

export const ZendeskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loggedAccount } = useAuthContext()
  const [easyDelete, setEasyDelete] = useState(false)

  const [categories, setCategories] = useState<CategoriesTS | undefined>()
  const [categoriesLoading, setCategoriesLoading] = useState(false)

  const [sections, setSections] = useState<SectionsTS | undefined>()
  const [sectionsLoading, setSectionsLoading] = useState(false)

  const [permission, setPermission] = useState<PermissionGroupsTS | undefined>()
  const [permissionLoading, setPermissionLoading] = useState(false)

  const [articles, setArticles] = useState<ArticlesTS | undefined>()
  const [articlesLoading, setArticlesLoading] = useState(false)

  const clearZendeskContext = () => {
    setCategories(undefined)
    setSections(undefined)
    setPermission(undefined)
    setArticles(undefined)
  }

  useEffect(() => {
    clearZendeskContext()
  }, [loggedAccount])

  const loadCategories = async (page?: number) => {
    if (
      (!page && loggedAccount) ||
      (categories?.page !== (page ?? 1) && loggedAccount) ||
      (!categories && !categoriesLoading && loggedAccount)
    ) {
      setCategoriesLoading(true)
      const res = await categoriesApi.getCategories(loggedAccount, page)
      if (res) {
        setCategories(res)
      }
      setCategoriesLoading(false)
    }
  }

  const deleteCategory = async (id: number) => {
    if (loggedAccount) {
      if (categories) {
        const newList = categories.categories.filter((item) => item.id !== id)
        setCategories({
          ...categories,
          count: categories.count - 1,
          categories: newList,
        })
      }
      await categoriesApi.deleteCategory(loggedAccount, id)
    }
  }

  const createCategory = async (
    data: CreateCategoryProps,
    position?: number
  ) => {
    if (loggedAccount) {
      setCategoriesLoading(true)
      const createdCategory = await categoriesApi.createCategory(
        loggedAccount,
        data
      )
      setCategoriesLoading(false)
      if (createdCategory) {
        console.log(createdCategory)
        if (categories) {
          let newList: CategoryTS[] = categories.categories
          if (position) {
            newList.splice(position - 1, 0, createdCategory.category)
          } else {
            newList.unshift(createdCategory.category)
          }
          setCategories((oldValue) => ({
            ...(oldValue as CategoriesTS),
            categories: newList,
            count: (oldValue?.count as number) + 1,
          }))
        }
        return createdCategory
      }
    }
  }

  const loadSections = async (page?: number) => {
    if (
      (!page && loggedAccount) ||
      (sections?.page !== (page ?? 1) && loggedAccount) ||
      (!sections && !sectionsLoading && loggedAccount)
    ) {
      setSectionsLoading(true)
      const res = await sectionsApi.getSections(loggedAccount, page)
      if (res) {
        setSections(res)
      }
      setSectionsLoading(false)
    }
  }

  const deleteSection = async (id: number) => {
    if (loggedAccount) {
      if (sections) {
        const newList = sections.sections.filter((item) => item.id !== id)
        setSections({
          ...sections,
          count: sections.count - 1,
          sections: newList,
        })
      }
      await sectionsApi.deleteSection(loggedAccount, id)
    }
  }

  const createSection = async (data: CreateSectionProps, position?: number) => {
    if (loggedAccount) {
      setSectionsLoading(true)
      const createdSection = await sectionsApi.createSection(
        loggedAccount,
        data
      )
      setSectionsLoading(false)
      if (createdSection) {
        console.log(createdSection)
        if (sections) {
          const newList: SectionTS[] = sections.sections
          if (position) {
            newList.splice(position - 1, 0, createdSection.section)
          } else {
            newList.unshift(createdSection.section)
          }
          setSections((oldValue) => ({
            ...(oldValue as SectionsTS),
            sections: newList,
            count: (oldValue?.count as number) + 1,
          }))
        }
        return createdSection
      }
    }
  }

  const loadPermission = async () => {
    if (loggedAccount && !permission && !permissionLoading) {
      setPermissionLoading(true)
      const res = await permissionApi.getPermissionGroups(loggedAccount)
      if (res) {
        setPermission(res)
      }
      setPermissionLoading(false)
    }
  }

  const loadArticles = async (page?: number) => {
    if (
      (!page && loggedAccount) ||
      (articles?.page !== (page ?? 1) && loggedAccount) ||
      (!articles && !articlesLoading && loggedAccount)
    ) {
      setArticlesLoading(true)
      const res = await articlesApi.getArticles(loggedAccount, page)
      if (res) {
        setArticles(res)
      }
      setArticlesLoading(false)
    }
  }

  const deleteArticle = async (id: number) => {
    if (loggedAccount) {
      if (articles) {
        const newList = articles.articles.filter((item) => item.id !== id)
        setArticles({
          ...articles,
          count: articles.count - 1,
          articles: newList,
        })
      }
      await articlesApi.deleteArticle(loggedAccount, id)
    }
  }

  const createArticle = async (data: CreateArticleProps, position?: number) => {
    if (loggedAccount) {
      setArticlesLoading(true)
      const createdArticle = await articlesApi.createArticle(
        loggedAccount,
        data
      )
      setArticlesLoading(false)
      if (createdArticle) {
        console.log(createdArticle)
        if (articles) {
          const newList: ArticleTS[] = articles.articles
          if (position) {
            newList.splice(position - 1, 0, createdArticle.article)
          } else {
            newList.unshift(createdArticle.article)
          }
          setArticles((oldValue) => ({
            ...(oldValue as ArticlesTS),
            articles: newList,
            count: (oldValue?.count as number) + 1,
          }))
        }
        return createdArticle
      }
    }
  }

  return (
    <ZendeskContext.Provider
      value={{
        easyDelete,
        setEasyDelete,
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
        loadPermission,
        permission,
        permissionLoading,
        loadArticles,
        deleteArticle,
        createArticle,
      }}
    >
      {children}
    </ZendeskContext.Provider>
  )
}

export const useZendeskContext = () => {
  const context = useContext(ZendeskContext)
  if (context === undefined) {
    throw new Error()
  }
  return context
}
