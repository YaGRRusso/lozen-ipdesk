import React, { createContext, useContext, useEffect, useState } from 'react'

import { CategoriesProps } from '@customTypes/CategoriesType'
import { SectionsProps } from '@customTypes/SectionsType'
import { ArticlesProps } from '@customTypes/ArticleType'
import { useAuthContext } from './AuthContext'

export type NewOldIdProps = {
  newOldIds: {
    title?: string
    oldId: number
    newId: number
  }[]
  target: string
}

interface ImportContextProps {
  categoriesFile: CategoriesProps | undefined
  setCategoriesFile: React.Dispatch<
    React.SetStateAction<CategoriesProps | undefined>
  >
  categoriesIds: NewOldIdProps
  setCategoriesIds: React.Dispatch<React.SetStateAction<NewOldIdProps>>

  sectionsFile: SectionsProps | undefined
  setSectionsFile: React.Dispatch<
    React.SetStateAction<SectionsProps | undefined>
  >
  sectionsIds: NewOldIdProps
  setSectionsIds: React.Dispatch<React.SetStateAction<NewOldIdProps>>

  articlesFile: ArticlesProps | undefined
  setArticlesFile: React.Dispatch<
    React.SetStateAction<ArticlesProps | undefined>
  >
  articlesIds: NewOldIdProps
  setArticlesIds: React.Dispatch<React.SetStateAction<NewOldIdProps>>
}

const ImportContext = createContext<ImportContextProps>(
  {} as ImportContextProps
)

export const ImportProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loggedAccount } = useAuthContext()

  const [categoriesFile, setCategoriesFile] = useState<CategoriesProps>()
  const [categoriesIds, setCategoriesIds] = useState<NewOldIdProps>({
    newOldIds: [],
    target: 'categories',
  })

  const [sectionsFile, setSectionsFile] = useState<SectionsProps>()
  const [sectionsIds, setSectionsIds] = useState<NewOldIdProps>({
    newOldIds: [],
    target: 'sections',
  })

  const [articlesFile, setArticlesFile] = useState<ArticlesProps>()
  const [articlesIds, setArticlesIds] = useState<NewOldIdProps>({
    newOldIds: [],
    target: 'articles',
  })

  const clearImportContext = () => {
    setCategoriesFile(undefined)
    setCategoriesIds((oldObject) => ({ ...oldObject, newOldIds: [] }))
    setSectionsFile(undefined)
    setSectionsIds((oldObject) => ({ ...oldObject, newOldIds: [] }))
    setArticlesFile(undefined)
    setArticlesIds((oldObject) => ({ ...oldObject, newOldIds: [] }))
  }

  useEffect(() => {
    clearImportContext()
  }, [loggedAccount])

  return (
    <ImportContext.Provider
      value={{
        categoriesFile,
        categoriesIds,
        setCategoriesFile,
        setCategoriesIds,
        articlesFile,
        articlesIds,
        setArticlesFile,
        setArticlesIds,
        sectionsFile,
        sectionsIds,
        setSectionsFile,
        setSectionsIds,
      }}
    >
      {children}
    </ImportContext.Provider>
  )
}

export const useImportContext = () => {
  const context = useContext(ImportContext)
  if (context === undefined) {
    throw new Error()
  }
  return context
}
