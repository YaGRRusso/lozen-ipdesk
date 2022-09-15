import { FormEvent, useEffect, useState } from "react";
import { CategoryTS } from "../types/categoriesType";
import { randomGenerator } from "../helpers/randomGenerator";
import { InfoTable } from "../components/InfoTable";
import { FormInput } from "../components/FormInputs/FormInput";
import { FormButton } from "../components/FormInputs/FormButton";
import { RefreshButton } from "../components/RefreshButton";
import { useZendeskContext } from "../context/ZendeskContext";
import { useAuthContext } from "../context/AuthContext";

const CategoryPage = () => {
  const {
    categories,
    categoriesLoading,
    loadCategories,
    deleteCategory,
    createCategory,
  } = useZendeskContext();
  const { loggedAccount } = useAuthContext();

  const [categoryNameInput, setCategoryNameInput] = useState("");
  const [categoryDescInput, setCategoryDescInput] = useState("");
  const [categoryPositionInput, setCategoryPositionInput] = useState(0);

  const loadZendeskInfo = async () => {
    await loadCategories();
  };

  useEffect(() => {
    loadZendeskInfo();
  }, [loggedAccount]);

  const handleCreateCategory = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    let newCategory: CategoryTS = {
      name: categoryNameInput || randomGenerator.title(),
      description: categoryDescInput || randomGenerator.description(),
      locale: loggedAccount?.locale || "pt-br",
      position: categoryPositionInput || 0,
    };
    createCategory(newCategory, categoryPositionInput);

    setCategoryNameInput("");
    setCategoryDescInput("");
    setCategoryPositionInput(0);
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory(id);
  };

  return (
    <>
      <form
        className="my-24 rounded flex flex-col gap-4 justify-center items-center"
        onSubmit={(ev) => {
          handleCreateCategory(ev);
        }}
      >
        <h2 className="text-2xl mb-5 text-sky-800 font-semibold">
          Criar Categoria
        </h2>
        <FormInput
          placeholder="nome... (deixe vazio para gerar aleatoriamente)"
          value={categoryNameInput ?? ""}
          onChange={(ev) => setCategoryNameInput(ev.target.value)}
        />
        <FormInput
          placeholder="descrição... (deixe vazio para gerar aleatoriamente)"
          value={categoryDescInput ?? ""}
          onChange={(ev) => setCategoryDescInput(ev.target.value)}
        />
        <FormInput
          min={1}
          max={categories ? categories.count + 1 : 1}
          value={categoryPositionInput || ""}
          type="number"
          onChange={(ev) => setCategoryPositionInput(parseInt(ev.target.value))}
          placeholder="posição... (deixe vazio para criar no início da lista)"
        />
        <FormButton disabled={categoriesLoading} />
      </form>
      <br />
      {categories && (
        <InfoTable
          titles={["Identificação", "Nome"]}
          deleteFunction={handleDeleteCategory}
          infoList={{
            data: categories?.categories,
            count: categories?.count,
          }}
        />
      )}
      {!categories && <RefreshButton loading={categoriesLoading} />}
    </>
  );
};

export default CategoryPage;
