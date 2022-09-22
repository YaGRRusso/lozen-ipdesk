import { FormEvent, useEffect, useState } from 'react'
import { randomGenerator } from '@helpers/randomGenerator'
import { useZendeskContext } from '@context/ZendeskContext'
import { useAuthContext } from '@context/AuthContext'
import { CreateSectionProps } from '@api/sectionsApi'
import {
  ConnectionButton,
  FormButton,
  FormInput,
  FormSelect,
  InfoTable,
} from '@components/index'

const SectionPage = () => {
  const {
    categories,
    loadCategories,
    sections,
    sectionsLoading,
    loadSections,
    createSection,
    deleteSection,
  } = useZendeskContext()
  const { loggedAccount } = useAuthContext()

  const [sectionCategoryInput, setSectionCategoryInput] = useState('')
  const [sectionNameInput, setSectionNameInput] = useState('')
  const [sectionDescInput, setSectionDescInput] = useState('')
  const [sectionPositionInput, setSectionPositionInput] = useState(0)
  const [currentPage, setCurrentPage] = useState(sections?.page ?? 1)

  const loadZendeskInfo = async () => {
    await Promise.all([
      loadCategories(categories?.page),
      loadSections(currentPage),
    ])
  }

  useEffect(() => {
    loadZendeskInfo()
  }, [loggedAccount, currentPage])

  const handleCreateSection = async (ev: FormEvent<HTMLElement>) => {
    ev.preventDefault()

    let newSection: CreateSectionProps = {
      category_id: parseInt(sectionCategoryInput),
      name: sectionNameInput || randomGenerator.title(),
      description: sectionDescInput || randomGenerator.description(),
      locale: loggedAccount?.locale || 'pt-br',
      position: sectionPositionInput || 0,
    }
    createSection(newSection, sectionPositionInput)

    setSectionNameInput('')
    setSectionDescInput('')
    setSectionPositionInput(0)
  }

  const handleDeleteSection = (id: number) => {
    deleteSection(id)
  }

  return (
    <>
      <form
        className="my-24 rounded flex flex-col gap-4 justify-center items-center"
        onSubmit={(ev) => {
          handleCreateSection(ev)
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
          value={sectionPositionInput || ''}
          onChange={(ev) => setSectionPositionInput(parseInt(ev.target.value))}
          placeholder="posição... (deixe vazio para criar no início da lista)"
        />
        <FormButton disabled={sectionsLoading} />
      </form>
      {!sectionsLoading && sections && (
        <InfoTable
          titles={['Identificação', 'Nome', 'Categoria']}
          deleteFunction={handleDeleteSection}
          count={sections.count}
          data={sections.sections.map((item) => ({
            id: item?.id,
            name: item?.name,
            link: item?.html_url,
            parentId: item?.category_id,
          }))}
          refresh={() => loadSections()}
          totalPages={sections.page_count}
          currentPage={{
            value: currentPage,
            setValue: setCurrentPage,
          }}
        />
      )}
      {(sectionsLoading || !sections) && (
        <ConnectionButton loading={sectionsLoading} />
      )}
    </>
  )
}

export default SectionPage
