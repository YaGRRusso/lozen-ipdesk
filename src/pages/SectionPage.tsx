import { FormEvent, useEffect, useState } from "react";
import { useDomainContext } from "../context/DomainContext";
import { InfoTable } from "../components/InfoTable";
import { FormInput } from "../components/FormInputs/FormInput";
import { FormButton } from "../components/FormInputs/FormButton";
import { sectionsApi } from "../api/sectionsApi";
import { SectionTS } from "../types/sectionsType";
import { randomGenerator } from "../helpers/randomGenerator";
import { ApiAction, useApiContext } from "../context/ApiContext";
import { FormSelect } from "../components/FormInputs/FormSelect";
import { categoriesApi } from "../api/categoriesApi";
import { RefreshButton } from "../components/RefreshButton";

export const SectionPage = () => {
  const { state } = useDomainContext();
  const { state: apiState, dispatch: apiDispatch } = useApiContext();
  const [loading, setLoading] = useState(false);

  const [sectionCategoryInput, setSectionCategoryInput] = useState("");
  const [sectionNameInput, setSectionNameInput] = useState("");
  const [sectionDescInput, setSectionDescInput] = useState("");
  const [sectionPositionInput, setSectionPositionInput] = useState(0);

  useEffect(() => {
    if (apiState.sections) {
      startCheck();
    }
  }, [apiState.sections]);

  const startCheck = async () => {
    if (!apiState.categories) {
      apiDispatch({
        type: ApiAction.setCategories,
        payload: await categoriesApi.getCategories(state),
      });
    }
  };

  const getSections = async () => {
    setLoading(true);
    apiDispatch({
      type: ApiAction.setSections,
      payload: await sectionsApi.getSections(state),
    });
    setLoading(false);
  };

  const postSection = async (ev: FormEvent<HTMLElement>) => {
    ev.preventDefault();

    setLoading(true);
    let newSection: SectionTS = {
      category_id: parseInt(sectionCategoryInput),
      name: sectionNameInput || randomGenerator.title(),
      description: sectionDescInput || randomGenerator.description(),
      locale: state.locale,
      position: sectionPositionInput || 0,
    };

    const createdSection = await sectionsApi.createSection(state, newSection);
    if (apiState.sections && createdSection) {
      console.log(createdSection);
      const newList: SectionTS[] = apiState.sections.sections;
      if (sectionPositionInput) {
        newList.splice(sectionPositionInput - 1, 0, createdSection.section);
      } else {
        newList.unshift(createdSection.section);
      }
      apiDispatch({
        type: ApiAction.setSections,
        payload: {
          sections: newList,
          count: apiState.sections.count + 1,
        },
      });
    }
    setSectionNameInput("");
    setSectionDescInput("");
    setSectionPositionInput(0);
    setLoading(false);
  };

  const deleteSection = (id: number) => {
    sectionsApi.deleteSection(state, id);
    if (apiState.sections) {
      const newList = apiState.sections.sections.filter(
        (item) => item.id !== id
      );
      apiDispatch({
        type: ApiAction.setSections,
        payload: {
          sections: newList,
          count: apiState.sections.count - 1,
        },
      });
    }
  };

  return (
    <>
      <form
        className="my-24 rounded flex flex-col gap-4 justify-center items-center"
        onSubmit={(ev) => {
          postSection(ev);
        }}
      >
        <h2 className="text-2xl mb-5 text-sky-800 font-semibold">
          Criar Section
        </h2>
        <FormSelect
          onChange={(ev) => setSectionCategoryInput(ev.target.value)}
          value={sectionCategoryInput}
          options={apiState.categories?.categories}
          placeholder="categoria pertencente... (deve estar conectado)"
          required
        />
        <FormInput
          placeholder="nome... (deixe vazio para gerar aleatoriamente)"
          value={sectionNameInput}
          onChange={(ev) => setSectionNameInput(ev.target.value)}
        />
        <FormInput
          placeholder="descrição... (deixe vazio para gerar aleatoriamente)"
          value={sectionDescInput}
          onChange={(ev) => setSectionDescInput(ev.target.value)}
        />
        <FormInput
          type="number"
          min={1}
          max={apiState.categories ? apiState.categories.count + 1 : 1}
          value={sectionPositionInput || ""}
          onChange={(ev) => setSectionPositionInput(parseInt(ev.target.value))}
          placeholder="posição... (deixe vazio para criar no início da lista)"
        />
        <FormButton disabled={loading} />
      </form>
      <br />
      {apiState.sections && (
        <InfoTable
          titles={["Identificação", "Nome", "Categoria"]}
          deleteFunction={deleteSection}
          infoList={{
            data: apiState.sections.sections,
            count: apiState.sections.count,
          }}
        />
      )}
      {!apiState.sections && (
        <RefreshButton loading={loading} onclick={getSections} />
      )}
    </>
  );
};
