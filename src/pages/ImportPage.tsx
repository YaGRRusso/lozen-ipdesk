import { JsonImporter } from '@components/index'
import { useMemo, useState } from 'react'
import { useImportContext } from '@context/ImportContext'
import { useZendeskContext } from '@context/ZendeskContext'

const ImportPage = () => {
  const { createCategory, createSection, createArticle } = useZendeskContext()
  const {
    categoriesFile,
    categoriesIds,
    setCategoriesFile,
    setCategoriesIds,
    sectionsFile,
    sectionsIds,
    setSectionsFile,
    setSectionsIds,
    articlesFile,
    articlesIds,
    setArticlesFile,
    setArticlesIds,
  } = useImportContext()
  const [uploadingCategories, setUploadingCategories] = useState(false)
  const [uploadingSections, setUploadingSections] = useState(false)
  const [uploadingArticles, setUploadingArticles] = useState(false)

  const handleUploadCategories = async () => {
    setUploadingCategories(true)
    setCategoriesIds((oldArray) => ({ ...oldArray, newOldIds: [] }))
    if (categoriesFile?.categories && categoriesFile?.categories?.length > 1) {
      for (let i in categoriesFile?.categories) {
        const res = await createCategory({
          description: categoriesFile?.categories[i].description,
          locale: categoriesFile?.categories[i].locale,
          name: categoriesFile?.categories[i].name,
          position: categoriesFile?.categories[i].position,
        })
        if (res?.category?.id) {
          setCategoriesIds((oldArray) => ({
            ...oldArray,
            newOldIds: [
              ...oldArray.newOldIds,
              {
                oldId: categoriesFile?.categories[i].id,
                newId: res.category.id,
                title: res.category.name,
              },
            ],
          }))
        } else {
          setUploadingCategories(false)
          return alert('error')
        }
      }
    }
    setUploadingCategories(false)
  }

  const handleUploadSections = async () => {
    setUploadingSections(true)
    setSectionsIds((oldArray) => ({ ...oldArray, newOldIds: [] }))
    if (sectionsFile?.sections && sectionsFile?.sections?.length > 1) {
      for (let i in sectionsFile?.sections) {
        const res = await createSection({
          description: sectionsFile?.sections[i].description,
          locale: sectionsFile?.sections[i].locale,
          name: sectionsFile?.sections[i].name,
          position: sectionsFile?.sections[i].position,
          category_id: sectionsFile?.sections[i].category_id,
        })
        if (res?.section?.id) {
          setSectionsIds((oldArray) => ({
            ...oldArray,
            newOldIds: [
              ...oldArray.newOldIds,
              {
                oldId: sectionsFile?.sections[i].id,
                newId: res.section.id,
                title: res.section.name,
              },
            ],
          }))
        } else {
          setUploadingSections(false)
          return alert('error')
        }
      }
    }
    setUploadingSections(false)
  }

  const handleUploadArticles = async () => {
    setUploadingArticles(true)
    setArticlesIds((oldArray) => ({ ...oldArray, newOldIds: [] }))
    if (articlesFile?.articles && articlesFile?.articles?.length > 1) {
      for (let i in articlesFile?.articles) {
        const res = await createArticle({
          body: articlesFile?.articles[i].body,
          permission_group_id: articlesFile?.articles[i].permission_group_id,
          user_segment_id: null,
          promoted: articlesFile?.articles[i].promoted,
          section_id: articlesFile?.articles[i].section_id,
          title: articlesFile?.articles[i].title,
        })
        if (res?.article?.id) {
          setArticlesIds((oldArray) => ({
            ...oldArray,
            newOldIds: [
              ...oldArray.newOldIds,
              {
                oldId: articlesFile?.articles[i].id,
                newId: res.article.id,
                title: res.article.name,
              },
            ],
          }))
        } else {
          setUploadingArticles(false)
          return alert('error')
        }
      }
    }
    setUploadingArticles(false)
  }

  const articlesWithImg = useMemo(() => {
    const filteredArticles = articlesFile?.articles?.filter((item) =>
      item.body.includes('img')
    )
    return filteredArticles?.map((item) => ({
      title: item.title,
    }))
  }, [articlesFile])

  return (
    <>
      <JsonImporter
        title="Categories"
        object={{
          value: categoriesFile,
          setValue: setCategoriesFile,
          setIds: setCategoriesIds,
          target: 'categories',
        }}
        uploadEvent={{
          onClick: handleUploadCategories,
          loading: uploadingCategories,
        }}
        progress={{
          current: categoriesIds?.newOldIds?.length,
          max: categoriesFile?.categories?.length,
        }}
        importedListNewOldIds={categoriesIds}
      />
      <JsonImporter
        title="Sections"
        object={{
          value: sectionsFile,
          setValue: setSectionsFile,
          setIds: setSectionsIds,
          target: 'sections',
          parent: 'category_id',
        }}
        uploadEvent={{
          onClick: handleUploadSections,
          loading: uploadingSections,
        }}
        progress={{
          current: sectionsIds?.newOldIds?.length,
          max: sectionsFile?.sections?.length,
        }}
        importedListNewOldIds={sectionsIds}
        parentNewOldIds={categoriesIds}
      />
      <JsonImporter
        title="Articles"
        object={{
          value: articlesFile,
          setValue: setArticlesFile,
          setIds: setArticlesIds,
          target: 'articles',
          parent: 'section_id',
        }}
        uploadEvent={{
          onClick: handleUploadArticles,
          loading: uploadingArticles,
        }}
        progress={{
          current: articlesIds?.newOldIds?.length,
          max: articlesFile?.articles?.length,
        }}
        importedListNewOldIds={articlesIds}
        parentNewOldIds={sectionsIds}
        importedImagesList={{ data: articlesWithImg }}
      />
    </>
  )
}

export default ImportPage
