import { Search } from './components/search';
import { NewsSection } from './components/news-section';
import {
  AppContextType,
  ArticlesResponse,
  RequestParams,
  StorageValues,
} from './types';
import { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { paramsCreator } from './utils/params-creator';
import { ErrorThrower } from './components/error-thrower';
import { ApiService } from './service/apiService';
import { useDispatch } from 'react-redux';
import { totalPagesSlice } from './store/total-pages-slice';
import { newsSlice } from './store/news-slice';

export const AppContext = createContext<null | AppContextType>(null);

export default function App() {
  const dispatch = useDispatch();
  // const [news, setNews] = useState<null | ArticleInCatalog[]>(null);

  const [urlParams, setUrlParams] = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

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
      // setNews(newsResponse.results);
      dispatch(totalPagesSlice.actions.updateTotalPages(newsResponse.pages));
      dispatch(newsSlice.actions.updateNews(newsResponse.results));
    }
    fetchNews();
  }, [dispatch, params]);

  return (
    <AppContext.Provider value={{ params, setParams, setErrorMsg }}>
      <section className="flex flex-col items-stretch">
        <Search />
        <NewsSection />
        <ErrorThrower />
      </section>
    </AppContext.Provider>
  );
}
