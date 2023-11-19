import { Search } from './components/search';
import { NewsSection } from './components/news-section';
import { StorageValues } from './types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ErrorThrower } from './components/error-thrower';
import { RootState } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { newsApi } from './service/newsApi';
import { newsSlice } from './store/news-slice';
import { totalPagesSlice } from './store/total-pages-slice';
import { newsLoaderSlice } from './store/loaders-slice';

export default function App() {
  const params = useSelector((state: RootState) => state.params.value);
  const { data, isLoading } = newsApi.useGetNewsQuery(params);
  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  useEffect(() => {
    if (errorMsg) throw new Error(errorMsg);
  });
  const [, setUrlParams] = useSearchParams();

  useEffect(() => {
    if (data) {
      dispatch(totalPagesSlice.actions.updateTotalPages(data.pages));
      dispatch(newsSlice.actions.updateNews(data.results));
    }
    dispatch(newsLoaderSlice.actions.isLoadingNews(isLoading));
  }, [data, dispatch, isLoading]);

  useEffect(() => {
    localStorage.setItem(StorageValues.Settings, JSON.stringify(params));
    setUrlParams(params);
  }, [params, setUrlParams]);

  return (
    <section className="flex flex-col items-stretch">
      <Search />
      <NewsSection />
      <ErrorThrower cb={() => setErrorMsg('Manually envoked error')} />
    </section>
  );
}
