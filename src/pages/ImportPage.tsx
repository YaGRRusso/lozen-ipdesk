import { JsonImporter } from '@components/index'
import { useMemo } from 'react'
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

  const handleUploadCategories = async () => {
    setCategoriesIds([])
    if (categoriesFile?.categories && categoriesFile?.categories?.length > 1) {
      for (let i in categoriesFile?.categories) {
        const res = await createCategory({
          description: categoriesFile?.categories[i].description,
          locale: categoriesFile?.categories[i].locale,
          name: categoriesFile?.categories[i].name,
          position: categoriesFile?.categories[i].position,
        })
        if (res?.category?.id) {
          setCategoriesIds((oldArray) => [
            ...oldArray,
            {
              oldId: categoriesFile?.categories[i].id,
              newId: res.category.id,
              title: res.category.name,
            },
          ])
        } else {
          return alert('error')
        }
      }
    }
  }

  const handleUploadSections = async () => {
    setSectionsIds([])
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
          setSectionsIds((oldArray) => [
            ...oldArray,
            {
              oldId: sectionsFile?.sections[i].id,
              newId: res.section.id,
              title: res.section.name,
            },
          ])
        } else {
          return alert('error')
        }
      }
    }
  }

  const handleUploadArticles = async () => {
    setArticlesIds([])
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
          setArticlesIds((oldArray) => [
            ...oldArray,
            {
              oldId: articlesFile?.articles[i].id,
              newId: res.article.id,
              title: res.article.name,
            },
          ])
        } else {
          return alert('error')
        }
      }
    }
  }

  const articlesWithImg = useMemo(() => {
    const filteredArticles = articlesFile?.articles?.filter((item) =>
      item.body.includes('img')
    )
    return filteredArticles?.map((item) => ({
      title: item.title,
      id: item.id,
    }))
  }, [articlesFile])

  return (
    <>
      <JsonImporter
        title="Categories"
        object={{
          value: categoriesFile,
          setValue: setCategoriesFile,
          check: 'categories',
        }}
        uploadEvent={handleUploadCategories}
        progress={{
          current: categoriesIds?.length,
          max: categoriesFile?.categories?.length,
        }}
        importedList={categoriesIds?.map((item) => ({
          title: item.title,
          new: item.newId,
          old: item.oldId,
        }))}
      />
      <JsonImporter
        title="Sections"
        object={{
          value: sectionsFile,
          setValue: setSectionsFile,
          check: 'sections',
          parent: 'category_id',
        }}
        uploadEvent={handleUploadSections}
        progress={{
          current: sectionsIds?.length,
          max: sectionsFile?.sections?.length,
        }}
        importedList={sectionsIds?.map((item) => ({
          title: item.title,
          new: item.newId,
          old: item.oldId,
        }))}
        convertObject={categoriesIds}
      />
      <JsonImporter
        title="Articles"
        object={{
          value: articlesFile,
          setValue: setArticlesFile,
          check: 'articles',
          parent: 'section_id',
        }}
        uploadEvent={handleUploadArticles}
        progress={{
          current: articlesIds?.length,
          max: articlesFile?.articles?.length,
        }}
        importedList={articlesIds?.map((item) => ({
          title: item.title,
          new: item.newId,
          old: item.oldId,
        }))}
        imagesList={articlesWithImg}
        convertObject={sectionsIds}
      />
    </>
  )
}

export default ImportPage
