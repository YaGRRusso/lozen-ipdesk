import { useState } from 'react'
import { CategoriesTS, CategoryTS } from './types/types'
import { categoriesApi } from './api/categories'
import { Category } from './components/Category'

const App = () => {
  const [categories, setCategories] = useState<CategoriesTS | null>(null)

  const logCat = () => {
    console.log(categories)
  }

  const getInfo = async () => {
    setCategories(await categoriesApi.getCategories())
  }

  const postInfo = async () => {
    const newCategory: CategoryTS = await categoriesApi.createCategory()
    console.log(newCategory)

    if (categories) {
      setCategories({
        categories: [{ name: newCategory.name, description: newCategory.description, locale: newCategory.locale }]
      })
      console.log(categories)
      // setCategories({ categories: [...categories.categories, newCategory] })
    } else {
    }
  }

  return (
    <>
      <h1>Lozen Ipdesk</h1>
      <hr />
      <button onClick={() => postInfo()}>Post</button>
      <button onClick={() => getInfo()}>Get</button>
      <button onClick={() => logCat()}>Log</button>
      {categories &&
        categories.categories.map((item, index) => (
          <Category key={index} data={item} />
        ))
      }
    </>
  )
}

export default App