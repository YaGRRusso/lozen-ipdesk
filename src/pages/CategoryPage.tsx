import { FormEvent, useEffect, useState } from "react";
import { randomGenerator } from "../helpers/randomGenerator";
import { InfoTable } from "../components/InfoTable";
import { FormInput } from "../components/FormInputs/FormInput";
import { FormButton } from "../components/FormInputs/FormButton";
import { RefreshButton } from "../components/RefreshButton";
import { useZendeskContext } from "../context/ZendeskContext";
import { useAuthContext } from "../context/AuthContext";
import { CreateCategoryProps } from "../api/categoriesApi";

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
  const [currentPage, setCurrentPage] = useState(categories?.page ?? 1);

  const loadZendeskInfo = async () => {
    await loadCategories(currentPage);
  };

  useEffect(() => {
    loadZendeskInfo();
  }, [loggedAccount, currentPage]);

  const handleCreateCategory = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    let newCategory: CreateCategoryProps = {
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
      {!categoriesLoading && categories && (
        <InfoTable
          titles={["Identificação", "Nome"]}
          deleteFunction={handleDeleteCategory}
          count={categories.count}
          data={categories.categories.map((item) => ({
            id: item.id,
            name: item.name,
          }))}
          totalPages={categories.page_count}
          currentPage={{
            value: currentPage,
            setValue: setCurrentPage,
          }}
        />
      )}
      {(categoriesLoading || !categories) && (
        <RefreshButton loading={categoriesLoading} />
      )}
    </>
  );
};

export default CategoryPage;
