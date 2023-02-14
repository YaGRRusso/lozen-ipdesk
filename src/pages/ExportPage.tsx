import { JsonViewer } from '@components'
import { useEffect } from 'react'
import { useAuthContext } from '@hooks/AuthContext'
import { useZendeskContext } from '@hooks/ZendeskContext'

const ExportPage = () => {
  const {
    loadCategories,
    categories,
    categoriesLoading,
    loadSections,
    sections,
    sectionsLoading,
    loadArticles,
    articles,
    articlesLoading,
  } = useZendeskContext()
  const { loggedAccount } = useAuthContext()

  const loadZendeskInfo = async () => {
    await Promise.all([
      loadCategories(categories?.page),
      loadSections(sections?.page),
      loadArticles(articles?.page),
    ])
  }

  useEffect(() => {
    loadZendeskInfo()
  }, [loggedAccount])

  const categoriesPagesButtons = {
    next: async () => {
      await loadCategories((categories?.page ?? 0) + 1)
    },
    prev: async () => {
      await loadCategories((categories?.page ?? 0) - 1)
    },
  }

  const sectionsPagesButtons = {
    next: async () => {
      await loadSections((sections?.page ?? 0) + 1)
    },
    prev: async () => {
      await loadSections((sections?.page ?? 0) - 1)
    },
  }

  const articlesPagesButtons = {
    next: async () => {
      await loadArticles((articles?.page ?? 0) + 1)
    },
    prev: async () => {
      await loadArticles((articles?.page ?? 0) - 1)
    },
  }

  return (
    <>
      <JsonViewer
        title="Categories"
        object={categories}
        prevPage={categoriesPagesButtons.prev}
        nextPage={categoriesPagesButtons.next}
        infoLoading={categoriesLoading}
      />
      <JsonViewer
        title="Sections"
        object={sections}
        prevPage={sectionsPagesButtons.prev}
        nextPage={sectionsPagesButtons.next}
        infoLoading={sectionsLoading}
      />
      <JsonViewer
        title="Articles"
        object={articles}
        prevPage={articlesPagesButtons.prev}
        nextPage={articlesPagesButtons.next}
        infoLoading={articlesLoading}
      />
    </>
  )
}

export default ExportPage
