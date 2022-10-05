import { FormEvent, useEffect, useMemo, useState } from 'react'
import { randomGenerator } from '@helpers/randomGenerator'
import { useZendeskContext } from '@context/ZendeskContext'
import { useAuthContext } from '@context/AuthContext'
import { CreateCategoryProps } from '@api/categoriesApi'
import {
  ConnectionButton,
  FormButton,
  FormInput,
  InfoTable,
  InfoTableRowsProps,
} from '@components/index'

const CategoryPage = () => {
  const {
    categories,
    categoriesLoading,
    loadCategories,
    deleteCategory,
    createCategory,
  } = useZendeskContext()
  const { loggedAccount } = useAuthContext()

  const [categoryNameInput, setCategoryNameInput] = useState('')
  const [categoryDescInput, setCategoryDescInput] = useState('')
  const [categoryPositionInput, setCategoryPositionInput] = useState(0)
  const [currentPage, setCurrentPage] = useState(categories?.page ?? 1)

  const loadZendeskInfo = async () => {
    await loadCategories(currentPage)
  }

  useEffect(() => {
    loadZendeskInfo()
  }, [loggedAccount, currentPage])

  const handleCreateCategory = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    let newCategory: CreateCategoryProps = {
      name: categoryNameInput || randomGenerator.title(),
      description: categoryDescInput || randomGenerator.description(),
      locale: loggedAccount?.locale || 'pt-br',
      position: categoryPositionInput || 0,
    }
    createCategory(newCategory, categoryPositionInput)

    setCategoryNameInput('')
    setCategoryDescInput('')
    setCategoryPositionInput(0)
  }

  const infoTableValue = useMemo(() => {
    const tableRows: InfoTableRowsProps[] = []
    if (categories?.categories) {
      categories.categories.map((item) => {
        tableRows.push({
          id: item?.id,
          name: item?.name,
          link: item?.html_url,
        })
      })
    }
    return tableRows
  }, [categories])

  return (
    <>
      <form
        className="my-24 rounded flex flex-col gap-4 justify-center items-center"
        onSubmit={(ev) => {
          handleCreateCategory(ev)
        }}
      >
        <h2 className="text-2xl mb-5 text-sky-800 font-semibold">
          Criar Categoria
        </h2>
        <FormInput
          placeholder="nome... (deixe vazio para gerar aleatoriamente)"
          value={categoryNameInput ?? ''}
          onChange={(ev) => setCategoryNameInput(ev.target.value)}
        />
        <FormInput
          placeholder="descrição... (deixe vazio para gerar aleatoriamente)"
          value={categoryDescInput ?? ''}
          onChange={(ev) => setCategoryDescInput(ev.target.value)}
        />
        <FormInput
          min={1}
          max={categories ? categories.count + 1 : 1}
          value={categoryPositionInput || ''}
          type="number"
          onChange={(ev) => setCategoryPositionInput(parseInt(ev.target.value))}
          placeholder="posição... (deixe vazio para criar no início da lista)"
        />
        <FormButton disabled={categoriesLoading} />
      </form>
      {categories && (
        <InfoTable
          titles={['Identificação', 'Nome']}
          deleteInfo={deleteCategory}
          count={categories.count}
          data={infoTableValue}
          refreshInfo={() => loadCategories()}
          totalPages={categories.page_count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          infoLoading={categoriesLoading}
        />
      )}
      {!categories && <ConnectionButton loading={categoriesLoading} />}
    </>
  )
}

export default CategoryPage
