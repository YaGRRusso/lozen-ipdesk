import { JsonViewer } from "../components/JsonViewer";
import { useZendeskContext } from "../context/ZendeskContext";

const ExportPage = () => {
  const { categories, sections, articles } = useZendeskContext();

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
