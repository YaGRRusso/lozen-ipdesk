import { useRoutes } from "react-router-dom";
import {
  CategoryPage,
  SectionPage,
  ArticlePage,
  ExportPage,
  ImportPage,
} from "./pages";

export const RouteList = () => {
  return useRoutes([
    { path: "/", element: <CategoryPage /> },
    { path: "/sections", element: <SectionPage /> },
    { path: "/articles", element: <ArticlePage /> },
    { path: "/export", element: <ExportPage /> },
    { path: "/import", element: <ImportPage /> },
  ]);
};
