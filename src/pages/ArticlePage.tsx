import { FormEvent, useEffect, useState } from 'react'
import { randomGenerator } from '../helpers/randomGenerator'
import { getPermissionList } from '../helpers/filter'
import { useZendeskContext } from '../context/ZendeskContext'
import { useAuthContext } from '../context/AuthContext'
import { CreateArticleProps } from '../api/articlesApi'
import {
  ConnectionButton,
  FormButton,
  FormCheck,
  FormInput,
  FormSelect,
  FormTextAreaInput,
  InfoTable,
} from '@components/index'

const ArticlePage = () => {
  const {
    sections,
    loadSections,
    articles,
    articlesLoading,
    loadArticles,
    deleteArticle,
    createArticle,
  } = useZendeskContext()
  const { loggedAccount } = useAuthContext()

  const [articleBodyInput, setArticleBodyInput] = useState('')
  const [articleSectionInput, setArticleSectionInput] = useState('')
  const [articlePermissionInput, setArticlePermissionInput] = useState('')
  const [articleTitleInput, setArticleTitleInput] = useState('')
  const [articleDescInput, setArticleDescInput] = useState('')
  const [articlePromotedInput, setArticlePromotedInput] = useState(false)
  const [currentPage, setCurrentPage] = useState(articles?.page ?? 1)

  const loadZendeskInfo = async () => {
    await Promise.all([loadSections(sections?.page), loadArticles(currentPage)])
  }

  useEffect(() => {
    loadZendeskInfo()
  }, [loggedAccount, currentPage])

  const handleCreateArticle = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    let newArticle: CreateArticleProps = {
      permission_group_id: parseInt(articlePermissionInput),
      user_segment_id: null,
      section_id: parseInt(articleSectionInput),
      title: articleTitleInput || randomGenerator.title(),
      description: articleDescInput || randomGenerator.description(),
      body: articleBodyInput || randomGenerator.body(),
      promoted: articlePromotedInput,
    }
    createArticle(newArticle)

    setArticleTitleInput('')
    setArticleDescInput('')
    setArticleBodyInput('')
    setArticlePromotedInput(false)
  }

  const handleDeleteArticle = (id: number) => {
    deleteArticle(id)
  }

  return (
    <>
      <form
        className="my-24 rounded flex flex-col gap-4 justify-center items-center"
        onSubmit={(ev) => {
          handleCreateArticle(ev)
        }}
      >
        <h2 className="text-2xl mb-5 text-sky-800 font-semibold">
          Criar Article
        </h2>
        <FormSelect
          value={articlePermissionInput}
          onChange={(ev) => setArticlePermissionInput(ev.target.value)}
          options={getPermissionList(articles)}
          placeholder="permission ID pertencente... (deve estar conectado)"
          required
        />
        <FormSelect
          value={articleSectionInput}
          onChange={(ev) => setArticleSectionInput(ev.target.value)}
          options={sections?.sections}
          placeholder="seção pertencente... (deve estar conectado)"
          required
        />
        <FormInput
          placeholder="nome... (deixe vazio para gerar aleatoriamente)"
          value={articleTitleInput}
          onChange={(ev) => setArticleTitleInput(ev.target.value)}
        />
        <FormInput
          placeholder="descrição... (deixe vazio para gerar aleatoriamente)"
          value={articleDescInput}
          onChange={(ev) => setArticleDescInput(ev.target.value)}
        />
        <FormTextAreaInput
          value={articleBodyInput}
          onBlur={(newContent) => setArticleBodyInput(newContent)}
        />
        <FormCheck
          onChange={() => setArticlePromotedInput(!articlePromotedInput)}
          checked={articlePromotedInput}
        />
        <FormButton disabled={articlesLoading} />
      </form>
      {!articlesLoading && articles && (
        <InfoTable
          titles={['Identificação', 'Nome', 'Section']}
          deleteFunction={handleDeleteArticle}
          count={articles.count}
          currentPage={{
            value: currentPage,
            setValue: setCurrentPage,
          }}
          totalPages={articles.page_count}
          data={articles.articles.map((item) => ({
            id: item.id,
            name: item.name,
            parentId: item.section_id,
          }))}
        />
      )}
      {(articlesLoading || !articles) && (
        <ConnectionButton loading={articlesLoading} />
      )}
    </>
  )
}

export default ArticlePage
