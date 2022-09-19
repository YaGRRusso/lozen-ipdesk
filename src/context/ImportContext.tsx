import React, { createContext, useContext, useState } from "react";

import { CategoriesTS } from "@customTypes/categoriesType";
import { SectionsTS } from "@customTypes/sectionsType";
import { ArticlesTS } from "@customTypes/articleType";

type IdProps = { title: string; oldId: number; newId: number }[];

interface ImportContextProps {
  categoriesFile: CategoriesTS | undefined;
  setCategoriesFile: React.Dispatch<
    React.SetStateAction<CategoriesTS | undefined>
  >;
  categoriesIds: IdProps | undefined;
  setCategoriesIds: React.Dispatch<React.SetStateAction<IdProps>>;
}

const ImportContext = createContext<ImportContextProps>(
  {} as ImportContextProps
);

export const ImportProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categoriesFile, setCategoriesFile] = useState<CategoriesTS>();
  const [categoriesIds, setCategoriesIds] = useState<IdProps>([]);

  const [sectionsFile, setSectionsFile] = useState<SectionsTS>();
  const [sectionsIds, setSectionsIds] = useState<IdProps>([]);

  const [articlesFile, setArticlesFile] = useState<ArticlesTS>();
  const [articlesIds, setArticlesIds] = useState<IdProps>([]);

  return (
    <ImportContext.Provider
      value={{
        categoriesFile,
        categoriesIds,
        setCategoriesFile,
        setCategoriesIds,
      }}
    >
      {children}
    </ImportContext.Provider>
  );
};

export const useImportContext = () => {
  const context = useContext(ImportContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
};
