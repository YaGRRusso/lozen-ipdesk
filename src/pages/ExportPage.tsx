import { useEffect } from "react";
import { JsonViewer } from "../components/JsonViewer";
import { useAuthContext } from "../context/AuthContext";
import { useZendeskContext } from "../context/ZendeskContext";

const ExportPage = () => {
  const {
    loadCategories,
    categories,
    loadSections,
    sections,
    loadArticles,
    articles,
  } = useZendeskContext();
  const { loggedAccount } = useAuthContext();

  const loadZendeskInfo = async () => {
    await Promise.all([
      loadCategories(categories?.page),
      loadSections(sections?.page),
      loadArticles(articles?.page),
    ]);
  };

  useEffect(() => {
    loadZendeskInfo();
  }, [loggedAccount]);

  return (
    <>
      <JsonViewer title="Categories" object={categories} />
      <br />
      <JsonViewer title="Sections" object={sections} />
      <br />
      <JsonViewer title="Articles" object={articles} />
    </>
  );
};

export default ExportPage;
