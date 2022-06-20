import { FormEvent, useState } from 'react'
import { useDomainContext } from '../context/DomainContext'
import { Plugs } from 'phosphor-react'
import { InfoTable } from '../components/InfoTable'
import { FormInput } from '../components/FormInputs/FormInput'
import { FormButton } from '../components/FormInputs/FormButton'
import { ApiAction, useApiContext } from '../context/ApiContext'
import { articlesApi } from '../api/articlesApi'
import { ArticleTS } from '../types/articleType'
import { randomGenerator } from '../helpers/randomGenerator'

export const ArticlePage = () => {
   const { state } = useDomainContext()
   const { state: apiState, dispatch: apiDispatch } = useApiContext()
   const [loading, setLoading] = useState(false)

   const [articleSectionInput, setArticleSectionInput] = useState('')
   const [articleTitleInput, setArticleTitleInput] = useState('')
   const [articleDescInput, setArticleDescInput] = useState('')
   const [articleBodyInput, setArticleBodyInput] = useState('')

   const getArticles = async () => {
      setLoading(true)
      apiDispatch({ type: ApiAction.setArticles, payload: await articlesApi.getArticles(state) })
      setLoading(false)
   }

   const postArticle = async (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault()

      setLoading(true)
      let newArticle: ArticleTS = {
         title: articleTitleInput,
         description: articleDescInput,
         section_id: parseInt(articleSectionInput),
         body: articleBodyInput
      }
      if (newArticle.title === '') {
         newArticle = randomGenerator.randomArticle(newArticle.section_id)
      }

      setArticleTitleInput('')
      setArticleDescInput('')
      setArticleBodyInput('')

      const createdArticle = await articlesApi.createArticle(state, newArticle)
      if (apiState.articles && createdArticle) {
         apiDispatch({
            type: ApiAction.setArticles, payload: {
               articles: [createdArticle.article, ...apiState.articles.articles],
               count: apiState.articles.count + 1
            }
         })
      }
      setLoading(false)
   }

   const deleteArticle = () => {

   }

   return (
      <>
         <form className='my-24 rounded flex flex-col gap-4 justify-center items-center' onSubmit={(ev) => { postArticle(ev) }}>
            <h2 className='text-2xl mb-5 text-sky-800 font-semibold'>Criar Article</h2>
            <FormInput placeholder='ID da section...' onChange={setArticleSectionInput} />
            <FormInput placeholder='Nome (deixe vazio para gerar automaticamente)...' onChange={setArticleTitleInput} />
            <FormInput placeholder='Descrição...' onChange={setArticleDescInput} />
            <FormInput placeholder='Corpo...' onChange={setArticleBodyInput} />
            <FormButton disable={loading} />
         </form>
         <br />
         {
            apiState.articles &&
            <InfoTable titles={['Identificação', 'Nome', 'Section']} deleteFunction={deleteArticle} infoList={{
               data: apiState.articles.articles, count: apiState.articles.count
            }} />
         }
         {
            !apiState.articles &&
            <button onClick={() => { getArticles() }}
               className={`${loading ? 'animate-spin' : ''} hover:bg-sky-100 transition-all border border-sky-800 rounded-full p-2 mx-auto block`}>
               <Plugs size={26} color='#075985' />
            </button>
         }
      </>
   )
}