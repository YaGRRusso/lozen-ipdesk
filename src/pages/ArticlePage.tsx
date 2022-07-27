import { FormEvent, useEffect, useState } from "react";
import { useDomainContext } from "../context/DomainContext";
import { InfoTable } from "../components/InfoTable";
import { FormInput } from "../components/FormInputs/FormInput";
import { FormButton } from "../components/FormInputs/FormButton";
import { ApiAction, useApiContext } from "../context/ApiContext";
import { articlesApi } from "../api/articlesApi";
import { ArticleTS } from "../types/articleType";
import { randomGenerator } from "../helpers/randomGenerator";
import { FormSelect } from "../components/FormInputs/FormSelect";
import { sectionsApi } from "../api/sectionsApi";
import { RefreshButton } from "../components/RefreshButton";
import { TextAreaInput } from "../components/FormInputs/TextAreaInput";
import { getPermissionList } from "../helpers/filter";
import { FormCheck } from "../components/FormInputs/FormCheck";

export const ArticlePage = () => {
  const { state } = useDomainContext();
  const { state: apiState, dispatch: apiDispatch } = useApiContext();
  const [loading, setLoading] = useState(false);

  const [articleBodyInput, setArticleBodyInput] = useState("");
  const [articleSectionInput, setArticleSectionInput] = useState("");
  const [articlePermissionInput, setArticlePermissionInput] = useState("");
  const [articleTitleInput, setArticleTitleInput] = useState("");
  const [articleDescInput, setArticleDescInput] = useState("");
  const [articlePromotedInput, setArticlePromotedInput] = useState(false);

  useEffect(() => {
    if (apiState.articles) {
      startCheck();
    }
  }, [apiState.articles]);

  const startCheck = async () => {
    if (apiState.articles?.articles) {
      getPermissionList(apiState.articles);
    }
    if (!apiState.sections) {
      apiDispatch({
        type: ApiAction.setSections,
        payload: await sectionsApi.getSections(state),
      });
    }
  };

  const getArticles = async () => {
    setLoading(true);
    apiDispatch({
      type: ApiAction.setArticles,
      payload: await articlesApi.getArticles(state),
    });
    setLoading(false);
  };

  const postArticle = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setLoading(true);
    let newArticle: ArticleTS = {
      permission_group_id: parseInt(articlePermissionInput),
      user_segment_id: null,
      section_id: parseInt(articleSectionInput),
      title: articleTitleInput || randomGenerator.title(),
      description: articleDescInput || randomGenerator.description(),
      body: articleBodyInput || randomGenerator.body(),
      promoted: articlePromotedInput,
    };

    const createdArticle = await articlesApi.createArticle(state, newArticle);
    if (apiState.articles && createdArticle) {
      console.log(createdArticle);
      apiDispatch({
        type: ApiAction.setArticles,
        payload: {
          articles: [createdArticle.article, ...apiState.articles.articles],
          count: apiState.articles.count + 1,
        },
      });
    }
    setArticleTitleInput("");
    setArticleDescInput("");
    setArticleBodyInput("");
    setArticlePromotedInput(false);
    setLoading(false);
  };

  const deleteArticle = (id: number) => {
    articlesApi.deleteArticle(state, id);
    if (apiState.articles) {
      const newList = apiState.articles.articles.filter(
        (item) => item.id !== id
      );
      apiDispatch({
        type: ApiAction.setArticles,
        payload: {
          articles: newList,
          count: apiState.articles.count - 1,
        },
      });
    }
  };

  return (
    <>
      <form
        className="my-24 rounded flex flex-col gap-4 justify-center items-center"
        onSubmit={(ev) => {
          postArticle(ev);
        }}
      >
        <h2 className="text-2xl mb-5 text-sky-800 font-semibold">
          Criar Article
        </h2>
        <FormSelect
          value={articlePermissionInput}
          onChange={(ev) => setArticlePermissionInput(ev.target.value)}
          options={getPermissionList(apiState.articles)}
          placeholder="permission ID pertencente... (deve estar conectado)"
          required
        />
        <FormSelect
          value={articleSectionInput}
          onChange={(ev) => setArticleSectionInput(ev.target.value)}
          options={apiState.sections?.sections}
          placeholder="artigo pertencente... (deve estar conectado)"
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
        <TextAreaInput
          value={articleBodyInput}
          onBlur={(newContent) => setArticleBodyInput(newContent)}
        />
        <FormCheck
          onChange={() => setArticlePromotedInput(!articlePromotedInput)}
          checked={articlePromotedInput}
        />
        <FormButton disabled={loading} />
      </form>
      <br />
      {apiState.articles && (
        <InfoTable
          titles={["Identificação", "Nome", "Section"]}
          deleteFunction={deleteArticle}
          infoList={{
            data: apiState.articles.articles,
            count: apiState.articles.count,
          }}
        />
      )}
      {!apiState.articles && (
        <RefreshButton loading={loading} onclick={getArticles} />
      )}
    </>
  );
};
