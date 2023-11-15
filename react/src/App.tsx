import { Search } from './components/search';
import { NewsSection } from './components/news-section';
import {
  // ArticleInCatalog,
  // NewsResponse,
  RequestParams,
  StorageValues,
} from './types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { paramsCreator } from './utils/params-creator';
import { ErrorThrower } from './components/error-thrower';
// import { ApiService } from './service/apiService';
import { useDispatch, useSelector } from 'react-redux';
// import { totalPagesSlice } from './store/total-pages-slice';
// import { newsSlice } from './store/news-slice';
import { paramsSlice } from './store/params-slice';
import { RootState } from './store/store';
// import { newsApi } from './service/newsApi';

export default function App() {
  const dispatch = useDispatch();
  const params = useSelector((state: RootState) => state.params.value);
  const [urlParams, setUrlParams] = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const savedParams = JSON.parse(
    localStorage.getItem(StorageValues.Settings) as string
  ) as RequestParams;
  dispatch(
    paramsSlice.actions.updateParams(paramsCreator(savedParams, urlParams))
  );
  // const { data, error, isLoading } = newsApi.useGetNewsQuery(params);

  useEffect(() => {
    if (errorMsg) throw new Error(errorMsg);
  });

  useEffect(() => {
    localStorage.setItem(StorageValues.Settings, JSON.stringify(params));
    setUrlParams(params);
  }, [params, setUrlParams]);

  // useEffect(() => {
  //   async function fetchNews() {
  //     const apiService = new ApiService();
  //     const newsResponse: NewsResponse<ArticleInCatalog[]> =
  //       await apiService.getNews(params);
  //     dispatch(totalPagesSlice.actions.updateTotalPages(newsResponse.pages));
  //     dispatch(newsSlice.actions.updateNews(newsResponse.results));
  //   }
  //   fetchNews();
  // }, [dispatch, params]);

  return (
    <section className="flex flex-col items-stretch">
      <Search />
      <NewsSection />
      <ErrorThrower cb={() => setErrorMsg('Manually envoked error')} />
    </section>
  );
}
