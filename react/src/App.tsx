import { Search } from './components/search';
import { NewsSection } from './components/news-section';
import {
  AppContextType,
  ArticleInCatalog,
  ArticlesResponse,
  RequestParams,
  StorageValues,
} from './types';
import { createContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { paramsCreator } from './utils/params-creator';
import { ErrorThrower } from './components/error-thrower';
import { ApiService } from './service/apiService';

export const AppContext = createContext<null | AppContextType>(null);

export default function App() {
  const [urlParams, setUrlParams] = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [news, setNews] = useState<null | ArticleInCatalog[]>(null);
  const totalPages = useRef<number>(0);
  const savedParams = JSON.parse(
    localStorage.getItem(StorageValues.Settings) as string
  ) as RequestParams;
  const [params, setParams] = useState<RequestParams>(
    paramsCreator(savedParams, urlParams)
  );

  useEffect(() => {
    if (errorMsg) throw new Error(errorMsg);
  });

  useEffect(() => {
    localStorage.setItem(StorageValues.Settings, JSON.stringify(params));
    setUrlParams(params);
  }, [params, setUrlParams]);

  useEffect(() => {
    async function fetchNews() {
      const apiService = new ApiService();
      const newsResponse: ArticlesResponse = await apiService.getNews(params);
      totalPages.current = newsResponse.pages;
      setNews(newsResponse.results);
    }
    fetchNews();
  }, [params]);

  return (
    <AppContext.Provider
      value={{ params, setParams, setErrorMsg, news, totalPages }}
    >
      <section className="flex flex-col items-stretch">
        <Search />
        <NewsSection />
        <ErrorThrower callback={() => setErrorMsg('Manually envoked error')} />
      </section>
    </AppContext.Provider>
  );
}
