import { useEffect } from "react";
import { JsonViewer } from "../components/JsonViewer";
import { useAuthContext } from "../context/AuthContext";
import { useZendeskContext } from "../context/ZendeskContext";

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
  } = useZendeskContext();
  const { loggedAccount } = useAuthContext();

  const loadZendeskInfo = async () => {
    await Promise.all([
      loadCategories(categories?.page),
      loadSections(sections?.page),
      loadArticles(articles?.page),
    ]);
  };

  const categoriesPagesButtons = {
    next: async () => {
      await loadCategories((categories?.page ?? 0) + 1);
    },
    prev: async () => {
      await loadCategories((categories?.page ?? 0) - 1);
    },
  };

  const sectionsPagesButtons = {
    next: async () => {
      await loadSections((sections?.page ?? 0) + 1);
    },
    prev: async () => {
      await loadSections((sections?.page ?? 0) - 1);
    },
  };

  const articlesPagesButtons = {
    next: async () => {
      await loadArticles((articles?.page ?? 0) + 1);
    },
    prev: async () => {
      await loadArticles((articles?.page ?? 0) - 1);
    },
  };

  useEffect(() => {
    loadZendeskInfo();
  }, [loggedAccount]);

  return (
    <>
      <JsonViewer
        title="Categories"
        object={categories}
        prevPage={categoriesPagesButtons.prev}
        nextPage={categoriesPagesButtons.next}
        loading={categoriesLoading}
      />
      <br />
      <JsonViewer
        title="Sections"
        object={sections}
        prevPage={sectionsPagesButtons.prev}
        nextPage={sectionsPagesButtons.next}
        loading={sectionsLoading}
      />
      <br />
      <JsonViewer
        title="Articles"
        object={articles}
        prevPage={articlesPagesButtons.prev}
        nextPage={articlesPagesButtons.next}
        loading={articlesLoading}
      />
    </>
  );
};

export default ExportPage;
