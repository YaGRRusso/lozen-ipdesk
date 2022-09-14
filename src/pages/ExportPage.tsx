import { useApiContext } from "../context/ApiContext";
import { JsonViewer } from "../components/JsonViewer";

const ExportPage = () => {
  const { state } = useApiContext();

  return (
    <>
      <JsonViewer title="categories" object={state.categories} />
      <br />
      <JsonViewer title="sections" object={state.sections} />
      <br />
      <JsonViewer title="articles" object={state.articles} />
    </>
  );
};

export default ExportPage;
