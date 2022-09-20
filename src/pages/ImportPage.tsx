import { useMemo, useState } from "react";
import { useImportContext } from "../context/ImportContext";
import { JsonImporter } from "../components/JsonImporter";
import { useZendeskContext } from "../context/ZendeskContext";

const ImportPage = () => {
  const { createCategory, createSection, createArticle } = useZendeskContext();
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
  } = useImportContext();

  const handleUploadCategories = async () => {
    if (categoriesFile?.categories && categoriesFile?.categories.length > 1) {
      for (let i in categoriesFile?.categories) {
        const res = await createCategory({
          description: categoriesFile?.categories[i].description,
          locale: categoriesFile?.categories[i].locale,
          name: categoriesFile?.categories[i].name,
          position: categoriesFile?.categories[i].position,
        });
        if (res) {
          setCategoriesIds((oldArray) => [
            ...oldArray,
            {
              oldId: categoriesFile?.categories[i].id,
              newId: res.category.id,
              title: res.category.name,
            },
          ]);
        }
      }
    }
  };

  const handleUploadSections = async () => {
    if (sectionsFile?.sections && sectionsFile?.sections.length > 1) {
      for (let i in sectionsFile?.sections) {
        const res = await createSection({
          description: sectionsFile?.sections[i].description,
          locale: sectionsFile?.sections[i].locale,
          name: sectionsFile?.sections[i].name,
          position: sectionsFile?.sections[i].position,
          category_id: sectionsFile?.sections[i].category_id,
        });
        if (res) {
          setSectionsIds((oldArray) => [
            ...oldArray,
            {
              oldId: sectionsFile?.sections[i].id,
              newId: res.section.id,
              title: res.section.name,
            },
          ]);
        }
      }
    }
  };

  const handleUploadArticles = async () => {
    if (articlesFile?.articles && articlesFile?.articles.length > 1) {
      for (let i in articlesFile?.articles) {
        const res = await createArticle({
          body: articlesFile?.articles[i].body,
          permission_group_id: articlesFile?.articles[i].permission_group_id,
          promoted: articlesFile?.articles[i].promoted,
          section_id: articlesFile?.articles[i].section_id,
          title: articlesFile?.articles[i].title,
        });
        if (res) {
          setArticlesIds((oldArray) => [
            ...oldArray,
            {
              oldId: articlesFile?.articles[i].id,
              newId: res.article.id,
              title: res.article.name,
            },
          ]);
        }
      }
    }
  };

  const articlesWithImg = useMemo(() => {
    const filteredArticles = articlesFile?.articles.filter((item) =>
      item.body.includes("img")
    );
    return filteredArticles?.map((item) => ({
      title: item.title,
      id: item.id,
    }));
  }, [articlesFile]);

  return (
    <>
      <JsonImporter
        title="Categories"
        object={{
          value: categoriesFile,
          setValue: setCategoriesFile,
          check: "categories",
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
          check: "sections",
        }}
        uploadEvent={handleUploadSections}
        progress={{
          current: sectionsIds?.length,
          max: sectionsFile?.sections.length,
        }}
        importedList={sectionsIds?.map((item) => ({
          title: item.title,
          new: item.newId,
          old: item.oldId,
        }))}
      />
      <JsonImporter
        title="Articles"
        object={{
          value: articlesFile,
          setValue: setArticlesFile,
          check: "articles",
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
        warningList={articlesWithImg}
      />
    </>
  );
};

export default ImportPage;
