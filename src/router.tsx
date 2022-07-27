import { useRoutes } from "react-router-dom";
import { ArticlePage } from "./pages/ArticlePage";
import { CategoryPage } from "./pages/CategoryPage";
import { SectionPage } from "./pages/SectionPage";

export const RouteList = () => {
  return useRoutes([
    { path: "/", element: <CategoryPage /> },
    { path: "/sections", element: <SectionPage /> },
    { path: "/articles", element: <ArticlePage /> },
  ]);
};
