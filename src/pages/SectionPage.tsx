import { useState } from 'react'
import { useForm } from '../context/DomainContext'

import { Plugs } from 'phosphor-react'
import { InfoTable } from '../components/InfoTable'
import { FormInput } from '../components/FormInputs/FormInput'
import { FormButton } from '../components/FormInputs/FormButton'

export const SectionPage = () => {
   const { state } = useForm()
   const [sectionsList, setSectionsList] = useState()
   const [loading, setLoading] = useState(false)

   const [sectionCategoryInput, setSectionCategoryInput] = useState('')
   const [sectionNameInput, setSectionNameInput] = useState('')
   const [sectionDescInput, setSectionDescInput] = useState('')

   const getSections = () => {

   }

   const postSection = () => {

   }

   const deleteSection = () => {

   }

   return (
      <>
         <form className='my-24 rounded flex flex-col gap-4 justify-center items-center' onSubmit={(ev) => { }}>
            <h2 className='text-2xl mb-5 text-sky-800 font-semibold'>Criar Section</h2>
            <FormInput placeholder='ID da categoria...' onChange={setSectionNameInput} />
            <FormInput placeholder='Nome...' onChange={setSectionNameInput} />
            <FormInput placeholder='Descrição...' onChange={setSectionDescInput} />
            <FormButton disable={loading} />
         </form>
         <br />
         {/* {
            sectionsList &&
            <InfoTable titles={['Identificação', 'Nome']} deleteFunction={deleteCategory} categoriesList={categoriesList} />
         } */}
         {
            !sectionsList &&
            <button onClick={() => { }}
               className={`${loading ? 'animate-spin' : ''} hover:bg-sky-100 transition-all border border-sky-800 rounded-full p-2 mx-auto block`}>
               <Plugs size={26} color='#075985' />
            </button>
         }
      </>
   )
}