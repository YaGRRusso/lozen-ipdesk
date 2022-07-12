import { FormEvent, useEffect, useState } from 'react'
import { CategoryTS } from '../types/categoriesType'
import { useDomainContext } from '../context/DomainContext'
import { randomGenerator } from '../helpers/randomGenerator'
import { categoriesApi } from '../api/categoriesApi'
import { InfoTable } from '../components/InfoTable'
import { FormInput } from '../components/FormInputs/FormInput'
import { FormButton } from '../components/FormInputs/FormButton'
import { ApiAction, useApiContext } from '../context/ApiContext'
import { RefreshButton } from '../components/RefreshButton'

export const CategoryPage = () => {
   const { state } = useDomainContext()
   const { state: apiState, dispatch: apiDispatch } = useApiContext()
   const [loading, setLoading] = useState(false)

   const [categoryNameInput, setCategoryNameInput] = useState('')
   const [categoryDescInput, setCategoryDescInput] = useState('')
   const [categoryPositionInput, setCategoryPositionInput] = useState(0)

   useEffect(()=> {
      if (apiState.categories?.count){
         setCategoryPositionInput(apiState.categories?.count)
      }
   },[apiState.categories?.count])

   const getCategories = async () => {
      setLoading(true)
      apiDispatch({ type: ApiAction.setCategories, payload: await categoriesApi.getCategories(state) })
      setLoading(false)
   }

   const postCategory = async (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault()

      setLoading(true)
      let newCategory: CategoryTS = {
         name: categoryNameInput,
         description: categoryDescInput,
         locale: state.locale,
         position: categoryPositionInput
      }
      if (newCategory.name === '') {
         newCategory = randomGenerator.randomCategory(categoryPositionInput-1)
      }

      setCategoryNameInput('')
      setCategoryDescInput('')

      const createdCategory = await categoriesApi.createCategory(state, newCategory)
      if (apiState.categories && createdCategory) {
         const newList: CategoryTS[] = apiState.categories.categories
         newList.splice(categoryPositionInput-1, 0, createdCategory.category)
         apiDispatch({
            type: ApiAction.setCategories, payload: {
               categories: newList,
               count: apiState.categories.count + 1
            }
         })
      }
      setLoading(false)
   }

   const deleteCategory = (id: number) => {
      categoriesApi.deleteCategory(state, id)
      if (apiState.categories) {
         const newList = apiState.categories.categories.filter(item => item.id !== id)
         apiDispatch({
            type: ApiAction.setCategories, payload: {
               categories: newList,
               count: apiState.categories.count - 1
            }
         })
      }
   }

   return (
      <>
         <form className='my-24 rounded flex flex-col gap-4 justify-center items-center' onSubmit={(ev) => { postCategory(ev) }}>
            <h2 className='text-2xl mb-5 text-sky-800 font-semibold'>Criar Categoria</h2>
            <FormInput placeholder='nome (deixe vazio para gerar automaticamente)...' onChange={ev => setCategoryNameInput(ev.target.value)} />
            <FormInput placeholder='descrição...' onChange={ev => setCategoryDescInput(ev.target.value)} />
            <FormInput min={1} max={apiState.categories?.count} value={categoryPositionInput} type='number' onChange={ev => setCategoryPositionInput(parseInt(ev.target.value))} placeholder='posição...'/>
            <FormButton disabled={loading} />
         </form>
         <br />
         {
            apiState.categories &&
            <InfoTable titles={['Identificação', 'Nome']} deleteFunction={deleteCategory} infoList={{
               data: apiState.categories.categories, count: apiState.categories.count
            }} />
         }
         {
            !apiState.categories &&
            <RefreshButton loading={loading} onclick={getCategories} />
         }
      </>
   )
}