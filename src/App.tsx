import { FormEvent, useState } from 'react'
import { CategoriesTS, CategoryTS, NewCategoryTS } from './types/types'
import { categoriesApi } from './api/categoriesApi'
import { Category } from './components/Category'
import randomGen from './helpers/dataGen'

const App = () => {
  const [categories, setCategories] = useState<CategoriesTS | null>(null)

  const [categoryNameInput, setCategoryNameInput] = useState('')
  const [categoryDescInput, setCategoryDescInput] = useState('')
  const [categoryLocaleInput, setCategoryLocaleInput] = useState('pt-br')

  const getInfo = async () => {
    setCategories(await categoriesApi.getCategories())
  }

  const handleCategoryForm = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    let newCategory: CategoryTS = {
      name: categoryNameInput,
      description: categoryDescInput,
      locale: categoryLocaleInput
    }
    if (newCategory.name === '') {
      newCategory = randomGen.randomCategory()
    }
    const createdCategory = await categoriesApi.createCategory(newCategory)

    if (categories) {
      setCategories({
        categories: [createdCategory.category, ...categories.categories]
      })
    }
  }

  const deleteInfo = async (id: number) => {
    categoriesApi.deleteCategories(id)
    if (categories) {
      const newList = categories.categories.filter(item => item.id !== id)
      setCategories({
        categories: newList
      })
    }
  }

  return (
    <>
      <h1>Lozen Ipdesk</h1>
      <hr />
      <div>
        <form onSubmit={(ev) => { handleCategoryForm(ev) }}>

          <input type="text" name="name" onChange={(ev) => setCategoryNameInput(ev.target.value)} />
          <input type="text" name="desc" onChange={(ev) => setCategoryDescInput(ev.target.value)} />
          <select name="locale" onChange={(ev) => setCategoryLocaleInput(ev.target.value)} >
            <option value="pt-br">Português</option>
            <option value="en-us">Inglês</option>
          </select>
          <input type="submit" value="Criar" />

        </form>
      </div>
      <br />
      {/* <button onClick={() => postInfo()}>Post</button> */}
      <button onClick={() => getInfo()}>Get</button>
      {categories &&
        categories.categories.map((item, index) => (
          <Category key={index} data={item} deleteFunction={deleteInfo} />
        ))
      }
    </>
  )
}

export default App