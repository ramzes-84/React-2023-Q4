import { Search } from './components/search';
import { NewsSection } from './components/news-section';
import { RequestParams, StorageValues } from './types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { paramsCreator } from './utils/params-creator';
import { ErrorThrower } from './components/error-thrower';

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
      <NewsSection params={params} paramsCallback={setParams} />
      <ErrorThrower callback={() => setErrorMsg('Manually envoked error')} />
    </section>
  );
}
