import {
  NewsResponse,
  ArticleInCatalog,
  RequestParams,
  Article,
  ArticleResponse,
} from "../types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const API_KEY = "b0706de8-b3da-4a9b-ac07-af4a3fec399a";
const NEWS_ENDPOINT = "search";
const ENDPOINT = "https://content.guardianapis.com/";
const enum NewsUrlQuery {
  q = "q",
  sort = "order-by",
  limit = "page-size",
  page = "page",
  additionalFields = "show-fields",
  apiKey = "api-key",
}
const enum AdditionalFields {
  all = "all",
}

export const newsApi = createApi({
  // reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: ENDPOINT }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse<ArticleInCatalog[]>, RequestParams>({
      query: (params) => ({
        url: NEWS_ENDPOINT,
        params: {
          [NewsUrlQuery.additionalFields]: AdditionalFields.all,
          [NewsUrlQuery.apiKey]: API_KEY,
          [NewsUrlQuery.limit]: params.limit,
          [NewsUrlQuery.sort]: params.sort,
          [NewsUrlQuery.page]: params.page,
          [NewsUrlQuery.q]: params.q,
        },
      }),
      transformResponse: (resp: {
        response: NewsResponse<ArticleInCatalog[]>;
      }) => resp.response,
    }),
    getArticle: builder.query<Article, string>({
      query: (id: string) => ({
        url: id,
        params: {
          [NewsUrlQuery.apiKey]: API_KEY,
          [NewsUrlQuery.additionalFields]: AdditionalFields.all,
        },
      }),
      transformResponse: (resp: { response: ArticleResponse }) =>
        resp.response.content,
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetArticleQuery,
  util: { getRunningQueriesThunk },
} = newsApi;

export const { getNews, getArticle } = newsApi.endpoints;
