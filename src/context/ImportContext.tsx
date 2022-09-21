import React, { createContext, useContext, useEffect, useState } from 'react'

import { CategoriesTS } from '@customTypes/categoriesType'
import { SectionsTS } from '@customTypes/sectionsType'
import { ArticlesTS } from '@customTypes/articleType'
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
  categoriesFile: CategoriesTS | undefined
  setCategoriesFile: React.Dispatch<
    React.SetStateAction<CategoriesTS | undefined>
  >
  categoriesIds: NewOldIdProps
  setCategoriesIds: React.Dispatch<React.SetStateAction<NewOldIdProps>>

  sectionsFile: SectionsTS | undefined
  setSectionsFile: React.Dispatch<React.SetStateAction<SectionsTS | undefined>>
  sectionsIds: NewOldIdProps
  setSectionsIds: React.Dispatch<React.SetStateAction<NewOldIdProps>>

  articlesFile: ArticlesTS | undefined
  setArticlesFile: React.Dispatch<React.SetStateAction<ArticlesTS | undefined>>
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

  const [categoriesFile, setCategoriesFile] = useState<CategoriesTS>()
  const [categoriesIds, setCategoriesIds] = useState<NewOldIdProps>({
    newOldIds: [],
    target: 'categories',
  })

  const [sectionsFile, setSectionsFile] = useState<SectionsTS>()
  const [sectionsIds, setSectionsIds] = useState<NewOldIdProps>({
    newOldIds: [],
    target: 'sections',
  })

  const [articlesFile, setArticlesFile] = useState<ArticlesTS>()
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
