import { FormEvent, useState } from 'react'
import { useForm } from '../context/DomainContext'

import { Plugs } from 'phosphor-react'
import { InfoTable } from '../components/InfoTable'
import { FormInput } from '../components/FormInputs/FormInput'
import { FormButton } from '../components/FormInputs/FormButton'
import { sectionsApi } from '../api/sectionsApi'
import { SectionsTS, SectionTS } from '../types/sectionsType'
import { randomGenerator } from '../helpers/randomGenerator'

export const SectionPage = () => {
   const { state } = useForm()
   const [sectionsList, setSectionsList] = useState<SectionsTS | null>(null)
   const [loading, setLoading] = useState(false)

   const [sectionCategoryInput, setSectionCategoryInput] = useState('')
   const [sectionNameInput, setSectionNameInput] = useState('')
   const [sectionDescInput, setSectionDescInput] = useState('')

   const getSections = async () => {
      setLoading(true)
      setSectionsList(await sectionsApi.getSections(state))
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
      if (sectionsList) {
         setSectionsList({
            sections: [createdSection.section, ...sectionsList.sections],
            count: sectionsList.count + 1
         })
      }
      setLoading(false)
   }

   const deleteSection = (id: number) => {
      sectionsApi.deleteSection(state, id)
      if (sectionsList) {
         const newList = sectionsList.sections.filter(item => item.id !== id)
         setSectionsList({
            sections: newList,
            count: sectionsList.count - 1
         })
      }
   }

   return (
      <>
         <form className='my-24 rounded flex flex-col gap-4 justify-center items-center' onSubmit={(ev) => { postSection(ev) }}>
            <h2 className='text-2xl mb-5 text-sky-800 font-semibold'>Criar Section</h2>
            <FormInput placeholder='ID da categoria...' onChange={setSectionCategoryInput} require />
            <FormInput placeholder='Nome (deixe vazio para gerar automaticamente)...' onChange={setSectionNameInput} />
            <FormInput placeholder='Descrição...' onChange={setSectionDescInput} />
            <FormButton disable={loading} />
         </form>
         <br />
         {
            sectionsList &&
            <InfoTable titles={['Identificação', 'Nome', 'Categoria']} deleteFunction={deleteSection} infoList={sectionsList} />
         }
         {
            !sectionsList &&
            <button onClick={() => { getSections() }}
               className={`${loading ? 'animate-spin' : ''} hover:bg-sky-100 transition-all border border-sky-800 rounded-full p-2 mx-auto block`}>
               <Plugs size={26} color='#075985' />
            </button>
         }
      </>
   )
}