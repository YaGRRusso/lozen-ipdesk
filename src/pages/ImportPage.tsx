import { JsonImporter } from '@components/index'
import { useMemo, useState } from 'react'
import { useImportContext } from '@context/ImportContext'
import { useZendeskContext } from '@context/ZendeskContext'
import { toast } from 'react-toastify'

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
    setCategoriesIds((oldValue) => ({ ...oldValue, newOldIds: [] }))
    if (categoriesFile?.categories && categoriesFile?.categories?.length > 1) {
      for (let i in categoriesFile?.categories) {
        const res = await createCategory({
          description: categoriesFile?.categories[i].description,
          locale: categoriesFile?.categories[i].locale,
          name: categoriesFile?.categories[i].name,
          position: categoriesFile?.categories[i].position,
        })
        if (res?.category?.id) {
          setCategoriesIds((oldValue) => ({
            ...oldValue,
            newOldIds: [
              ...oldValue.newOldIds,
              {
                oldId: categoriesFile?.categories[i].id,
                newId: res.category.id,
                title: res.category.name,
              },
            ],
          }))
        } else {
          setUploadingArticles(false)
          toast.error(res?.error)
          break
        }
      }
    }
    setUploadingCategories(false)
  }

  const handleUploadSections = async () => {
    setUploadingSections(true)
    setSectionsIds((oldValue) => ({ ...oldValue, newOldIds: [] }))
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
          setSectionsIds((oldValue) => ({
            ...oldValue,
            newOldIds: [
              ...oldValue.newOldIds,
              {
                oldId: sectionsFile?.sections[i].id,
                newId: res.section.id,
                title: res.section.name,
              },
            ],
          }))
        } else {
          setUploadingSections(false)
          toast.error(res?.error)
          break
        }
      }
    }
    setUploadingSections(false)
  }

  const handleUploadArticles = async () => {
    setUploadingArticles(true)
    setArticlesIds((oldValue) => ({ ...oldValue, newOldIds: [] }))
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
          setArticlesIds((oldValue) => ({
            ...oldValue,
            newOldIds: [
              ...oldValue.newOldIds,
              {
                oldId: articlesFile?.articles[i].id,
                newId: res.article.id,
                title: res.article.name,
              },
            ],
          }))
        } else {
          setUploadingArticles(false)
          toast.error(res?.error)
          break
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
        infoLoading={uploadingCategories}
        uploadFunction={handleUploadCategories}
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
        infoLoading={uploadingSections}
        uploadFunction={handleUploadSections}
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
        infoLoading={uploadingArticles}
        uploadFunction={handleUploadArticles}
        progress={{
          current: articlesIds?.newOldIds?.length,
          max: articlesFile?.articles?.length,
        }}
        importedListNewOldIds={articlesIds}
        parentNewOldIds={sectionsIds}
        importedImagesList={articlesWithImg}
      />
    </>
  )
}

export default ImportPage
