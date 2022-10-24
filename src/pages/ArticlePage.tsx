import { FormEvent, useEffect, useMemo, useState } from 'react'
import { randomGenerator } from '@helpers/randomGenerator'
import { articlesWithImages, getPermissionList } from '@helpers/filter'
import { useZendeskContext } from '@context/ZendeskContext'
import { useAuthContext } from '@context/AuthContext'
import { CreateArticleProps } from '@api/articlesApi'
import {
  ConnectionButton,
  FormButton,
  FormCheck,
  FormInput,
  FormSelect,
  FormTextAreaInput,
  InfoTable,
  InfoTooltip,
  FormSearch,
} from '@components/index'
import { searchApi } from '@api/searchApi'
import { SearchTS } from '@customTypes/apiType'
import { MagnifyingGlass } from 'phosphor-react'

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
  const [filteredArticles, setFilteredArticles] = useState<SearchTS>()

  const [articleBodyInput, setArticleBodyInput] = useState('')
  const [articleSectionInput, setArticleSectionInput] = useState('')
  const [articlePermissionInput, setArticlePermissionInput] = useState('')
  const [articlePermissionInputAlt, setArticlePermissionInputAlt] = useState('')
  const [articleTitleInput, setArticleTitleInput] = useState('')
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

    let permissionId = manuallySection
      ? parseInt(articlePermissionInputAlt)
      : parseInt(articlePermissionInput)

    let newArticle: CreateArticleProps = {
      permission_group_id: permissionId,
      user_segment_id: null,
      section_id: parseInt(articleSectionInput),
      title: articleTitleInput || randomGenerator.title(),
      body: articleBodyInput || randomGenerator.body(),
      promoted: articlePromotedInput,
    }
    createArticle(newArticle)

    setArticleTitleInput('')
    setArticleBodyInput('')
    setArticlePromotedInput(false)
  }

  const handleSearchArticle = async (query: string) => {
    if (loggedAccount) {
      setCurrentPage(1)
      if (query) {
        const searchResult = await searchApi.getSearch(loggedAccount, query)
        setFilteredArticles(searchResult)
      } else {
        setFilteredArticles(undefined)
      }
    }
  }

  const manuallySection = useMemo(() => {
    if (articlePermissionInput !== 'manually') {
      return false
    } else {
      return true
    }
  }, [articlePermissionInput])

  const infoTableValue = useMemo(() => {
    if (filteredArticles && loggedAccount) {
      return articlesWithImages(
        filteredArticles.results,
        loggedAccount?.subdomain
      )
    }

    if (articles && loggedAccount) {
      return articlesWithImages(articles.articles, loggedAccount?.subdomain)
    }

    return []
  }, [articles, filteredArticles])

  return (
    <>
      <form
        className="my-24 rounded flex flex-col gap-4 justify-center items-center"
        onSubmit={(ev) => {
          handleCreateArticle(ev)
        }}
      >
        <h2 className="text-2xl mb-5 text-sky-800 font-semibold flex gap-2 items-center justify-center">
          Criar Article
          <a
            href={`https://${loggedAccount?.subdomain}.zendesk.com/api/v2/guide/permission_groups.json`}
            target="_blank"
          >
            <InfoTooltip
              icon={<MagnifyingGlass size={20} weight="bold" />}
              title="O Zendesk não disponibiliza via API a lista de PERMISSION_ID, caso o ID que procura não esteja disponível no SELECT, clique aqui para consultar externamente a lista completa de PERMISSION_ID e inserir MANUALMENTE o ID desejado"
            />
          </a>
        </h2>
        <FormSelect
          value={articlePermissionInput}
          onChange={(ev) => setArticlePermissionInput(ev.target.value)}
          options={getPermissionList(articles)}
          placeholder="permission ID pertencente... (deve estar conectado)"
          required
          manually
        />
        {manuallySection && (
          <FormInput
            placeholder="permission ID pertencente..."
            value={articlePermissionInputAlt}
            onChange={(ev) => setArticlePermissionInputAlt(ev.target.value)}
            required
          />
        )}
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
      <div className="flex flex-col gap-2">
        <FormSearch handleSearch={handleSearchArticle} />
        {articles && (
          <InfoTable
            titles={['Identificação', 'Nome', 'Section']}
            deleteInfo={deleteArticle}
            count={filteredArticles?.count ?? articles.count}
            currentPage={currentPage}
            refreshInfo={() => loadArticles()}
            setCurrentPage={setCurrentPage}
            totalPages={filteredArticles?.page_count ?? articles.page_count}
            data={infoTableValue}
            infoLoading={articlesLoading}
          />
        )}
        {!articles && <ConnectionButton loading={articlesLoading} />}
      </div>
    </>
  )
}

export default ArticlePage
