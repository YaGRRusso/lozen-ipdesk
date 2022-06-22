import { FormEvent, useEffect, useState } from 'react'
import { useDomainContext } from '../context/DomainContext'
import { InfoTable } from '../components/InfoTable'
import { FormInput } from '../components/FormInputs/FormInput'
import { FormButton } from '../components/FormInputs/FormButton'
import { sectionsApi } from '../api/sectionsApi'
import { SectionTS } from '../types/sectionsType'
import { randomGenerator } from '../helpers/randomGenerator'
import { ApiAction, useApiContext } from '../context/ApiContext'
import { FormSelect } from '../components/FormInputs/FormSelect'
import { categoriesApi } from '../api/categoriesApi'
import { RefreshButton } from '../components/RefreshButton'

export const SectionPage = () => {
   const { state } = useDomainContext()
   const { state: apiState, dispatch: apiDispatch } = useApiContext()
   const [loading, setLoading] = useState(false)

   const [sectionCategoryInput, setSectionCategoryInput] = useState('')
   const [sectionNameInput, setSectionNameInput] = useState('')
   const [sectionDescInput, setSectionDescInput] = useState('')

   useEffect(() => {
      if (apiState.sections) {
         startCheck()
      }
   }, [apiState.sections])

   const startCheck = async () => {
      if (!apiState.categories) {
         apiDispatch({ type: ApiAction.setCategories, payload: await categoriesApi.getCategories(state) })
      }
   }

   const getSections = async () => {
      setLoading(true)
      apiDispatch({ type: ApiAction.setSections, payload: await sectionsApi.getSections(state) })
      setLoading(false)
   }

   const postSection = async (ev: FormEvent<HTMLElement>) => {
      ev.preventDefault()

      setLoading(true)
      let newSection: SectionTS = {
         category_id: parseInt(sectionCategoryInput),
         name: sectionNameInput,
         description: sectionDescInput,
         locale: state.locale
      }
      if (newSection.name === '') {
         newSection = randomGenerator.randomSection(newSection.category_id)
      }

      setSectionNameInput('')
      setSectionDescInput('')

      const createdSection = await sectionsApi.createSection(state, newSection)
      if (apiState.sections && createdSection) {
         apiDispatch({
            type: ApiAction.setSections, payload: {
               sections: [createdSection.section, ...apiState.sections.sections],
               count: apiState.sections.count + 1
            }
         })
      }
      setLoading(false)
   }

   const deleteSection = (id: number) => {
      sectionsApi.deleteSection(state, id)
      if (apiState.sections) {
         const newList = apiState.sections.sections.filter(item => item.id !== id)
         apiDispatch({
            type: ApiAction.setSections, payload: {
               sections: newList,
               count: apiState.sections.count - 1
            }
         })
      }
   }

   return (
      <>
         <form className='my-24 rounded flex flex-col gap-4 justify-center items-center' onSubmit={(ev) => { postSection(ev) }}>
            <h2 className='text-2xl mb-5 text-sky-800 font-semibold'>Criar Section</h2>
            <FormSelect onChange={setSectionCategoryInput} options={apiState.categories?.categories} />
            <FormInput placeholder='Nome (deixe vazio para gerar automaticamente)...' onChange={setSectionNameInput} />
            <FormInput placeholder='Descrição...' onChange={setSectionDescInput} />
            <FormButton disable={loading} />
         </form>
         <br />
         {
            apiState.sections &&
            <InfoTable titles={['Identificação', 'Nome', 'Categoria']} deleteFunction={deleteSection} infoList={{
               data: apiState.sections.sections, count: apiState.sections.count
            }} />
         }
         {
            !apiState.sections &&
            <RefreshButton loading={loading} onclick={getSections} />
         }
      </>
   )
}