import { useState } from 'react'
import { useForm } from '../context/DomainContext'

import { Plugs } from 'phosphor-react'
import { InfoTable } from '../components/InfoTable'
import { FormInput } from '../components/FormInputs/FormInput'
import { FormButton } from '../components/FormInputs/FormButton'

export const ArticlePage = () => {
   const { state } = useForm()
   const [articlesList, setArticlesList] = useState()
   const [loading, setLoading] = useState(false)

   const [articleCategoryInput, setArticleSectionInput] = useState('')
   const [articleNameInput, setArticleNameInput] = useState('')
   const [articleDescInput, setArticleDescInput] = useState('')

   const getArticles = () => {

   }

   const postArticle = () => {

   }

   const deleteArticle = () => {

   }

   return (
      <>
         <form className='my-24 rounded flex flex-col gap-4 justify-center items-center' onSubmit={(ev) => { }}>
            <h2 className='text-2xl mb-5 text-sky-800 font-semibold'>Criar Article</h2>
            <FormInput placeholder='ID da section...' onChange={setArticleSectionInput} />
            <FormInput placeholder='Nome (deixe vazio para gerar automaticamente)...' onChange={setArticleNameInput} />
            <FormInput placeholder='Descrição...' onChange={setArticleDescInput} />
            <FormButton disable={loading} />
         </form>
         <br />
         {/* {
            articlesList &&
            <InfoTable titles={['Identificação', 'Nome']} deleteFunction={deleteCategory} categoriesList={categoriesList} />
         } */}
         {
            !articlesList &&
            <button onClick={() => { }}
               className={`${loading ? 'animate-spin' : ''} hover:bg-sky-100 transition-all border border-sky-800 rounded-full p-2 mx-auto block`}>
               <Plugs size={26} color='#075985' />
            </button>
         }
      </>
   )
}