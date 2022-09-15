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
    await Promise.all([loadCategories(), loadSections(), loadArticles()]);
  };

  useEffect(() => {
    loadZendeskInfo();
  }, [loggedAccount]);

  return (
    <>
      <JsonViewer title="categories" object={categories} />
      <br />
      <JsonViewer title="sections" object={sections} />
      <br />
      <JsonViewer title="articles" object={articles} />
    </>
  );
};

export default ExportPage;
