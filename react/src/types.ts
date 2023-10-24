import { ReactNode } from 'react';

export interface CompProps {
  children?: ReactNode;
}

export type RequestParams = {
  limit: number;
  sort: Sort;
  page: number;
  keyword: string;
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
