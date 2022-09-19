import { useState } from "react";
import { useImportContext } from "../context/ImportContext";
import { JsonImporter } from "../components/JsonImporter";
import { useZendeskContext } from "../context/ZendeskContext";
import { ArticlesTS } from "../types/articleType";
import { SectionsTS } from "../types/sectionsType";

const ImportPage = () => {
  const { createCategory } = useZendeskContext();
  const { categoriesFile, categoriesIds, setCategoriesFile, setCategoriesIds } =
    useImportContext();

  const [sectionsFile, setSectionsFile] = useState<SectionsTS>();
  const [articlesFile, setArticlesFile] = useState<ArticlesTS>();

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

  const handleUploadSections = () => {
    console.log(sectionsFile);
  };

  const handleUploadArticles = () => {
    console.log(articlesFile);
  };

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
          current: 0,
          max: 0,
        }}
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
          current: 0,
          max: 0,
        }}
      />
    </>
  );
};

export default ImportPage;
