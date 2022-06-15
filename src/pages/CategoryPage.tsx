import { FormEvent, useState } from 'react'
import { CategoriesTS, CategoryTS, NewCategoryTS } from '../types/types'
import { categoriesApi } from '../api/categoriesApi'
import { InfoTable } from '../components/InfoTable'
import randomGen from '../helpers/dataGen'
import { useForm } from '../context/DomainContext'
import { Header } from './Header'

export const CategoryPage = () => {
   const { state, dispatch } = useForm()
   const [categories, setCategories] = useState<CategoriesTS | null>(null)

   const [categoryNameInput, setCategoryNameInput] = useState('')
   const [categoryDescInput, setCategoryDescInput] = useState('')
   const [categoryLocaleInput, setCategoryLocaleInput] = useState('pt-br')

   const getInfo = async () => {
      setCategories(await categoriesApi.getCategories(state))
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

      const createdCategory = await categoriesApi.createCategory(state, newCategory)
      if (categories) {
         setCategories({
            categories: [createdCategory.category, ...categories.categories]
         })
      }
   }

   const deleteInfo = async (id: number) => {
      categoriesApi.deleteCategories(state, id)
      if (categories) {
         const newList = categories.categories.filter(item => item.id !== id)
         setCategories({
            categories: newList
         })
      }
   }

   return (
      <>
         <Header />
         <section>
            <form onSubmit={(ev) => { handleCategoryForm(ev) }}>

               <input type="text" onChange={(ev) => setCategoryNameInput(ev.target.value)} />
               <input type="text" onChange={(ev) => setCategoryDescInput(ev.target.value)} />
               <select onChange={(ev) => setCategoryLocaleInput(ev.target.value)} >
                  <option value="pt-br">Português</option>
                  <option value="en-us">Inglês</option>
               </select>
               <input type="submit" value="Criar" />

            </form>
            <br />
            <button onClick={() => getInfo()}>Get</button>
            {
               categories &&
               <InfoTable data={categories} deleteFunction={deleteInfo} />
            }
         </section>
      </>
   )
}