import { ReactNode } from 'react';

export interface ArticlesResponse {
  status: string;
  userTier: string;
  total: number;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  orderBy: string;
  results: ArticleInCatalog[];
}

export interface AppProps {
  children?: ReactNode;
}

export type RequestParams = {
  limit: PageLimitValue;
  sort: Sort;
  page: string;
  q: string;
};

export enum Sort {
  Newest = 'newest',
  Oldest = 'oldest',
  Relevance = 'relevance',
}

export enum AppUrlParams {
  Query = 'q',
  Limit = 'limit',
  Page = 'page',
  Sort = 'sort',
}

export enum PageLimitValue {
  ten = '10',
  twenty = '20',
  thirty = '30',
  fourty = '40',
  fifty = '50',
}

export type ArticleInCatalog = {
  fields: AdditionalFields;
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
};

export type AppState = {
  keyword: string;
  isLoading: boolean;
  news: ArticleInCatalog[];
  errorMsg: null | string;
};

export enum StorageValues {
  Settings = 'settings',
}

export type Article = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  fields: AdditionalFields;
};

export type AdditionalFields = {
  headline: string;
  standfirst: string;
  trailText: string;
  byline: string;
  main: string;
  body: string;
  newspaperPageNumber: string;
  wordcount: string;
  firstPublicationDate: string;
  isInappropriateForSponsorship: string;
  isPremoderated: string;
  lastModified: string;
  newspaperEditionDate: string;
  productionOffice: string;
  publication: string;
  shortUrl: string;
  shouldHideAdverts: string;
  showInRelatedContent: string;
  thumbnail: string;
  legallySensitive: string;
  lang: string;
  isLive: string;
  bodyText: string;
  charCount: string;
  shouldHideReaderRevenue: string;
  showAffiliateLinks: string;
  bylineHtml: string;
};

export type AppContextType = {
  // params: RequestParams;
  // setParams: React.Dispatch<React.SetStateAction<RequestParams>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
  // news: null | ArticleInCatalog[];
  // totalPages?: React.MutableRefObject<number>;
};

export interface AppReduxState<T> {
  value: T;
}
