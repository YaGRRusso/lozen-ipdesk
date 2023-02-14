import { FormEvent, useEffect, useMemo, useState } from 'react'
import { randomGenerator } from '@helpers/randomGenerator'
import { articlesWithImages, getPermissionList } from '@helpers/filter'
import { useZendeskContext } from '@hooks/ZendeskContext'
import { useAuthContext } from '@hooks/AuthContext'
import { CreateArticleProps } from 'src/services/articlesApi'
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
  FormCounter,
} from '@components'
import { searchApi } from 'src/services/searchApi'
import { SearchProps } from '@customTypes/ApiType'
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
  const [filteredArticles, setFilteredArticles] = useState<SearchProps>()

  const [articleBodyInput, setArticleBodyInput] = useState('')
  const [articleSectionInput, setArticleSectionInput] = useState('')
  const [articlePermissionInput, setArticlePermissionInput] = useState('')
  const [articlePermissionInputAlt, setArticlePermissionInputAlt] = useState('')
  const [articleTitleInput, setArticleTitleInput] = useState('')
  const [articlePromotedInput, setArticlePromotedInput] = useState(false)
  const [articleCreateCount, setArticleCreateCount] = useState(1)
  const [articlesCreatedCount, setArticlesCreatedCount] = useState(0)
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

    for (let i = 0; i < articleCreateCount; i++) {
      let newArticle: CreateArticleProps = {
        permission_group_id: permissionId,
        user_segment_id: null,
        section_id: parseInt(articleSectionInput),
        title: articleTitleInput || randomGenerator.title(),
        body: articleBodyInput || randomGenerator.body(),
        promoted: articlePromotedInput,
      }
      await createArticle(newArticle)
      setArticlesCreatedCount(i + 1)
    }

    setArticleTitleInput('')
    setArticleBodyInput('')
    setArticlePromotedInput(false)
    setArticlesCreatedCount(0)
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
      return articlesWithImages(filteredArticles.results, loggedAccount?.domain)
    }

    if (articles && loggedAccount) {
      return articlesWithImages(articles.articles, loggedAccount?.domain)
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
        <h2 className="text-2xl dark:text-sky-700 mb-5 text-sky-800 font-semibold flex gap-2 items-center justify-center">
          Criar Article
          <a
            href={`https://${loggedAccount?.domain}/api/v2/guide/permission_groups.json`}
            target="_blank"
          >
            <InfoTooltip
              icon={<MagnifyingGlass size={20} weight="bold" />}
              title="Clique aqui para acessar externamente os permission ids (deve estar previamente logado na instância Zendesk via theming)"
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
        <div className="flex w-full justify-center items-center gap-1 mt-8">
          <FormButton
            disabled={articlesLoading}
            createProgress={articlesCreatedCount}
            createTarget={articleCreateCount}
          />
          <FormCounter
            value={articleCreateCount}
            onChange={(ev) => setArticleCreateCount(parseInt(ev.target.value))}
            onFocus={(ev) => ev.target.select()}
            disabled={articlesLoading}
          />
        </div>
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
