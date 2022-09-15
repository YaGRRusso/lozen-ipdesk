import { FormEvent, useEffect, useState } from "react";
import { InfoTable } from "../components/InfoTable";
import { FormInput } from "../components/FormInputs/FormInput";
import { FormButton } from "../components/FormInputs/FormButton";
import { SectionTS } from "../types/sectionsType";
import { randomGenerator } from "../helpers/randomGenerator";
import { FormSelect } from "../components/FormInputs/FormSelect";
import { RefreshButton } from "../components/RefreshButton";
import { useZendeskContext } from "../context/ZendeskContext";
import { useAuthContext } from "../context/AuthContext";

const SectionPage = () => {
  const {
    categories,
    loadCategories,
    sections,
    sectionsLoading,
    loadSections,
    createSection,
    deleteSection,
  } = useZendeskContext();
  const { loggedAccount } = useAuthContext();

  const [sectionCategoryInput, setSectionCategoryInput] = useState("");
  const [sectionNameInput, setSectionNameInput] = useState("");
  const [sectionDescInput, setSectionDescInput] = useState("");
  const [sectionPositionInput, setSectionPositionInput] = useState(0);

  const loadZendeskInfo = async () => {
    await Promise.all([loadCategories(), loadSections()]);
  };

  useEffect(() => {
    loadZendeskInfo();
  }, [loggedAccount]);

  const handleCreateSection = async (ev: FormEvent<HTMLElement>) => {
    ev.preventDefault();

    let newSection: SectionTS = {
      category_id: parseInt(sectionCategoryInput),
      name: sectionNameInput || randomGenerator.title(),
      description: sectionDescInput || randomGenerator.description(),
      locale: loggedAccount?.locale || "pt-br",
      position: sectionPositionInput || 0,
    };
    createSection(newSection, sectionPositionInput);

    setSectionNameInput("");
    setSectionDescInput("");
    setSectionPositionInput(0);
  };

  const handleDeleteSection = (id: number) => {
    deleteSection(id);
  };

  return (
    <>
      <form
        className="my-24 rounded flex flex-col gap-4 justify-center items-center"
        onSubmit={(ev) => {
          handleCreateSection(ev);
        }}
      >
        <h2 className="text-2xl mb-5 text-sky-800 font-semibold">
          Criar Section
        </h2>
        <FormSelect
          onChange={(ev) => setSectionCategoryInput(ev.target.value)}
          value={sectionCategoryInput}
          options={categories?.categories}
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
          max={sections ? sections.count + 1 : 1}
          value={sectionPositionInput || ""}
          onChange={(ev) => setSectionPositionInput(parseInt(ev.target.value))}
          placeholder="posição... (deixe vazio para criar no início da lista)"
        />
        <FormButton disabled={sectionsLoading} />
      </form>
      <br />
      {sections && (
        <InfoTable
          titles={["Identificação", "Nome", "Categoria"]}
          deleteFunction={handleDeleteSection}
          infoList={{
            data: sections.sections,
            count: sections.count,
          }}
        />
      )}
      {!sections && <RefreshButton loading={sectionsLoading} />}
    </>
  );
};

export default SectionPage;
