import { ReactNode } from 'react';

export interface AppProps {
  children?: ReactNode;
}

export type RequestParams = {
  limit: string;
  sort: string;
  page: string;
  q: string;
};

export enum Sort {
  Newest = 'newest',
  Oldest = 'oldest',
  Relevance = 'relevance',
}

export type ArticleInCatalog = {
  fields: {
    body: string;
    thumbnail: string;
    trailText: string;
  };
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

export type ContextType = {
  params: RequestParams;
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
