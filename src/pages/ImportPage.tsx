import { useState } from "react";
import { JsonImporter } from "../components/JsonImporter";
import { ArticlesTS } from "../types/articleType";
import { CategoriesTS } from "../types/categoriesType";
import { SectionsTS } from "../types/sectionsType";

const ImportPage = () => {
  const [categories, setCategories] = useState<CategoriesTS>();
  const [sections, setSections] = useState<SectionsTS>();
  const [articles, setArticles] = useState<ArticlesTS>();

  return (
    <>
      <JsonImporter
        title="Categories"
        object={{ value: categories, setValue: setCategories }}
      />
      <br />
      <JsonImporter
        title="Sections"
        object={{ value: sections, setValue: setSections }}
      />
      <br />
      <JsonImporter
        title="Articles"
        object={{ value: articles, setValue: setArticles }}
      />
    </>
  );
};

export default ImportPage;
