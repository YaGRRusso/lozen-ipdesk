import { FormEvent, useState } from 'react'
import { CategoriesTS, CategoryTS } from '../types/categoriesType'
import { useForm } from '../context/DomainContext'
import { randomGenerator } from '../helpers/randomGenerator'
import { categoriesApi } from '../api/categoriesApi'

import { Plugs } from 'phosphor-react'
import { InfoTable } from '../components/InfoTable'
import { FormInput } from '../components/FormInputs/FormInput'
import { FormButton } from '../components/FormInputs/FormButton'

export const CategoryPage = () => {
   const { state } = useForm()
   const [categoriesList, setCategoriesList] = useState<CategoriesTS | null>(null)
   const [loading, setLoading] = useState(false)

   const [categoryNameInput, setCategoryNameInput] = useState('')
   const [categoryDescInput, setCategoryDescInput] = useState('')

   const getCategories = async () => {
      setLoading(true)
      setCategoriesList(await categoriesApi.getCategories(state))
      setLoading(false)
   }

   const postCategory = async (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault()

      setLoading(true)
      let newCategory: CategoryTS = {
         name: categoryNameInput,
         description: categoryDescInput,
         locale: state.locale
      }
      if (newCategory.name === '') {
         newCategory = randomGenerator.randomCategory()
      }

      setCategoryNameInput('')
      setCategoryDescInput('')

      const createdCategory = await categoriesApi.createCategory(state, newCategory)
      if (categoriesList) {
         setCategoriesList({
            categories: [createdCategory.category, ...categoriesList.categories],
            count: categoriesList.count + 1
         })
      }
      setLoading(false)
   }

   const deleteCategory = (id: number) => {
      categoriesApi.deleteCategory(state, id)
      if (categoriesList) {
         const newList = categoriesList.categories.filter(item => item.id !== id)
         setCategoriesList({
            categories: newList,
            count: categoriesList.count - 1
         })
      }
   }

   return (
      <>
         <form className='my-24 rounded flex flex-col gap-4 justify-center items-center' onSubmit={(ev) => { postCategory(ev) }}>
            <h2 className='text-2xl mb-5 text-sky-800 font-semibold'>Criar Categoria</h2>
            <FormInput placeholder='nome (deixe vazio para gerar automaticamente)...' onChange={setCategoryNameInput} />
            <FormInput placeholder='descrição...' onChange={setCategoryDescInput} />
            <FormButton disable={loading} />
         </form>
         <br />
         {
            categoriesList &&
            <InfoTable titles={['Identificação', 'Nome']} deleteFunction={deleteCategory} infoList={categoriesList} />
         }
         {
            !categoriesList &&
            <button onClick={() => getCategories()}
               className={`${loading ? 'animate-spin' : ''} hover:bg-sky-100 transition-all border border-sky-800 rounded-full p-2 mx-auto block`}>
               <Plugs size={26} color='#075985' />
            </button>
         }
      </>
   )
}