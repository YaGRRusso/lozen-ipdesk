import { useRoutes } from "react-router-dom";
import { CategoryPage } from "./pages/CategoryPage";

export const RouteList = () => {
   return useRoutes([
      { path: '/', element: <CategoryPage /> }
   ])
}