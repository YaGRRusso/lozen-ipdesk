import { FormEvent, useState } from 'react'
import { CategoriesTS, CategoryTS } from '../types/types'

import randomGen from '../helpers/dataGen'
import { categoriesApi } from '../api/categoriesApi'
import { useForm } from '../context/DomainContext'
import { Plugs } from 'phosphor-react'

import { InfoTable } from '../components/InfoTable'
import { FormInput } from '../components/FormInputs/FormInput'
import { FormButton } from '../components/FormInputs/FormButton'

export const CategoryPage = () => {
   const { state } = useForm()
   const [categories, setCategories] = useState<CategoriesTS | null>(null)

   const [categoryNameInput, setCategoryNameInput] = useState('')
   const [categoryDescInput, setCategoryDescInput] = useState('')

   const getCategories = async () => {
      setCategories(await categoriesApi.getCategories(state))
   }

   const postCategory = async (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault()

      let newCategory: CategoryTS = {
         name: categoryNameInput,
         description: categoryDescInput,
         locale: state.locale
      }
      if (newCategory.name === '') {
         newCategory = randomGen.randomCategory()
      }

      setCategoryNameInput('')
      setCategoryDescInput('')

      const createdCategory = await categoriesApi.createCategory(state, newCategory)
      if (categories) {
         setCategories({
            categories: [createdCategory.category, ...categories.categories],
            count: categories.count + 1
         })
      }
   }

   const deleteCategory = async (id: number) => {
      categoriesApi.deleteCategory(state, id)
      if (categories) {
         const newList = categories.categories.filter(item => item.id !== id)
         setCategories({
            categories: newList,
            count: categories.count - 1
         })
      }
   }

   return (
      <>
         <form className='my-24 rounded flex flex-col gap-4 justify-center items-center' onSubmit={(ev) => { postCategory(ev) }}>
            <h2 className='text-2xl mb-5 text-sky-800 font-semibold'>Criar Categoria</h2>
            <FormInput placeholder='Nome...' onChange={setCategoryNameInput} />
            <FormInput placeholder='Descrição...' onChange={setCategoryDescInput} />
            <FormButton />
         </form>
         <br />
         {
            categories &&
            <InfoTable data={categories} deleteFunction={deleteCategory} />
         }
         {
            !categories &&
            <button className='border border-sky-800 rounded-full p-2 mx-auto block' onClick={() => getCategories()}>
               <Plugs size={26} color='#075985' />
            </button>
         }
      </>
   )
}