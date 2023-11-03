import { Search } from './components/search';
import { NewsSection } from './components/news-section';
import { RequestParams, StorageValues } from './types';
import { useEffect, useState } from 'react';
import { Pagination } from './components/pagination';
import { useSearchParams } from 'react-router-dom';
import { paramsCreator } from './utils/params-creator';

export default function App() {
  const savedParams = JSON.parse(
    localStorage.getItem(StorageValues.Settings) as string
  ) as RequestParams;
  const [urlParams, setUrlParams] = useSearchParams();
  const [params, setParams] = useState<RequestParams>(
    paramsCreator(savedParams, urlParams)
  );
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  useEffect(() => {
    if (errorMsg) throw new Error(errorMsg);
  });

  useEffect(() => {
    localStorage.setItem(StorageValues.Settings, JSON.stringify(params));
    setUrlParams(params);
  }, [params, setUrlParams]);

  return (
    <section className="flex flex-col items-stretch">
      <Search params={params} paramsCallback={setParams} />
      <NewsSection params={params} />
      <Pagination params={params} paramsCallback={setParams} />
      <button
        className="m-2 p-2 text-white	bg-red-600 rounded-2xl"
        onClick={() => setErrorMsg('Manually envoked error')}
      >
        Throw error
      </button>
    </section>
  );
}
