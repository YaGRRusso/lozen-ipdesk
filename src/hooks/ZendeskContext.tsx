import React, { createContext, useContext, useEffect, useState } from 'react'
import { articlesApi, CreateArticleProps } from 'src/services/articlesApi'
import { categoriesApi, CreateCategoryProps } from 'src/services/categoriesApi'
import { CreateSectionProps, sectionsApi } from 'src/services/sectionsApi'
import { permissionApi } from 'src/services/permissionApi'
import {
  ArticlesProps,
  ArticleProps,
  NewArticleProps,
} from '@customTypes/ArticleType'
import { PermissionGroupsProps } from '@customTypes/ApiType'
import {
  CategoriesProps,
  CategoryProps,
  NewCategoryProps,
} from '@customTypes/CategoriesType'
import {
  NewSectionProps,
  SectionsProps,
  SectionProps,
} from '@customTypes/SectionsType'
import { useAuthContext } from './AuthContext'
import { toast } from 'react-toastify'

interface ZendeskContextProps {
  easyDelete: boolean
  setEasyDelete: React.Dispatch<React.SetStateAction<boolean>>

  loadCategories: (page?: number) => Promise<void>
  deleteCategory: (id: number) => void
  createCategory: (
    data: CreateCategoryProps,
    position?: number
  ) => Promise<NewCategoryProps | undefined>
  categories: CategoriesProps | undefined
  categoriesLoading: boolean

  loadSections: (page?: number) => Promise<void>
  deleteSection: (id: number) => void
  createSection: (
    data: CreateSectionProps,
    position?: number
  ) => Promise<NewSectionProps | undefined>
  sections: SectionsProps | undefined
  sectionsLoading: boolean

  loadPermission: () => Promise<void>
  permission: PermissionGroupsProps | undefined
  permissionLoading: boolean

  loadArticles: (page?: number) => Promise<void>
  deleteArticle: (id: number) => void
  createArticle: (
    data: CreateArticleProps
  ) => Promise<NewArticleProps | undefined>
  articles: ArticlesProps | undefined
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

  const [categories, setCategories] = useState<CategoriesProps | undefined>()
  const [categoriesLoading, setCategoriesLoading] = useState(false)

  const [sections, setSections] = useState<SectionsProps | undefined>()
  const [sectionsLoading, setSectionsLoading] = useState(false)

  const [permission, setPermission] = useState<
    PermissionGroupsProps | undefined
  >()
  const [permissionLoading, setPermissionLoading] = useState(false)

  const [articles, setArticles] = useState<ArticlesProps | undefined>()
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
      setSections(undefined)
      setArticles(undefined)
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
      if (createdCategory && createdCategory.error) {
        toast.error(createdCategory.error)
        return
      }
      if (createdCategory) {
        console.log(createdCategory)
        if (categories) {
          let newList: CategoryProps[] = categories.categories
          if (position) {
            newList.splice(position - 1, 0, createdCategory.category)
          } else {
            newList.unshift(createdCategory.category)
          }
          setCategories((oldValue) => ({
            ...(oldValue as CategoriesProps),
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
      setArticles(undefined)
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
      if (createdSection && createdSection.error) {
        toast.error(createdSection.error)
        return
      }
      if (createdSection) {
        console.log(createdSection)
        if (sections) {
          const newList: SectionProps[] = sections.sections
          if (position) {
            newList.splice(position - 1, 0, createdSection.section)
          } else {
            newList.unshift(createdSection.section)
          }
          setSections((oldValue) => ({
            ...(oldValue as SectionsProps),
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
      if (createdArticle && createdArticle.error) {
        toast.error(createdArticle.error)
        return
      }
      if (createdArticle) {
        console.log(createdArticle)
        if (articles) {
          const newList: ArticleProps[] = articles.articles
          if (position) {
            newList.splice(position - 1, 0, createdArticle.article)
          } else {
            newList.unshift(createdArticle.article)
          }
          setArticles((oldValue) => ({
            ...(oldValue as ArticlesProps),
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
