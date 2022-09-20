import React, { createContext, useContext, useEffect, useState } from "react";

import { CategoriesTS } from "@customTypes/categoriesType";
import { SectionsTS } from "@customTypes/sectionsType";
import { ArticlesTS } from "@customTypes/articleType";
import { useAuthContext } from "./AuthContext";

type IdProps = { title: string; oldId: number; newId: number }[];

interface ImportContextProps {
  categoriesFile: CategoriesTS | undefined;
  setCategoriesFile: React.Dispatch<
    React.SetStateAction<CategoriesTS | undefined>
  >;
  categoriesIds: IdProps | undefined;
  setCategoriesIds: React.Dispatch<React.SetStateAction<IdProps>>;

  sectionsFile: SectionsTS | undefined;
  setSectionsFile: React.Dispatch<React.SetStateAction<SectionsTS | undefined>>;
  sectionsIds: IdProps | undefined;
  setSectionsIds: React.Dispatch<React.SetStateAction<IdProps>>;

  articlesFile: ArticlesTS | undefined;
  setArticlesFile: React.Dispatch<React.SetStateAction<ArticlesTS | undefined>>;
  articlesIds: IdProps | undefined;
  setArticlesIds: React.Dispatch<React.SetStateAction<IdProps>>;
}

const ImportContext = createContext<ImportContextProps>(
  {} as ImportContextProps
);

export const ImportProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loggedAccount } = useAuthContext();

  const [categoriesFile, setCategoriesFile] = useState<CategoriesTS>();
  const [categoriesIds, setCategoriesIds] = useState<IdProps>([]);

  const [sectionsFile, setSectionsFile] = useState<SectionsTS>();
  const [sectionsIds, setSectionsIds] = useState<IdProps>([]);

  const [articlesFile, setArticlesFile] = useState<ArticlesTS>();
  const [articlesIds, setArticlesIds] = useState<IdProps>([]);

  const clearImportContext = () => {
    setCategoriesFile(undefined);
    setCategoriesIds([]);
    setSectionsFile(undefined);
    setSectionsIds([]);
    setArticlesFile(undefined);
    setArticlesIds([]);
  };

  useEffect(() => {
    clearImportContext();
  }, [loggedAccount]);

  return (
    <ImportContext.Provider
      value={{
        categoriesFile,
        categoriesIds,
        setCategoriesFile,
        setCategoriesIds,
        articlesFile,
        articlesIds,
        setArticlesFile,
        setArticlesIds,
        sectionsFile,
        sectionsIds,
        setSectionsFile,
        setSectionsIds,
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
