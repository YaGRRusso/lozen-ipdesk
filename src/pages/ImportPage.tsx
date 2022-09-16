import { useState } from "react";
import { JsonImporter } from "../components/JsonImporter";
import { ArticlesTS } from "../types/articleType";
import { CategoriesTS } from "../types/categoriesType";
import { SectionsTS } from "../types/sectionsType";

const ImportPage = () => {
  const [categories, setCategories] = useState<CategoriesTS>();
  const [sections, setSections] = useState<SectionsTS>();
  const [articles, setArticles] = useState<ArticlesTS>();

  const handleUploadCategories = () => {
    console.log(categories);
  };

  const handleUploadSections = () => {
    console.log(sections);
  };

  const handleUploadArticles = () => {
    console.log(articles);
  };

  return (
    <>
      <JsonImporter
        title="Categories"
        object={{
          value: categories,
          setValue: setCategories,
          check: "categories",
        }}
        uploadEvent={handleUploadCategories}
      />
      <br />
      <JsonImporter
        title="Sections"
        object={{ value: sections, setValue: setSections, check: "sections" }}
        uploadEvent={handleUploadSections}
      />
      <br />
      <JsonImporter
        title="Articles"
        object={{ value: articles, setValue: setArticles, check: "articles" }}
        uploadEvent={handleUploadArticles}
      />
    </>
  );
};

export default ImportPage;
