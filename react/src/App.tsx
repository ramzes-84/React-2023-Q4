import { Search } from './components/search';
import { NewsSection } from './components/news-section';
import { AppContextType, RequestParams, StorageValues } from './types';
import { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { paramsCreator } from './utils/params-creator';
import { ErrorThrower } from './components/error-thrower';

export const AppContext = createContext<null | AppContextType>(null);

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
    <AppContext.Provider value={{ params, setParams, setErrorMsg }}>
      <section className="flex flex-col items-stretch">
        <Search />
        <NewsSection params={params} paramsCallback={setParams} />
        <ErrorThrower callback={() => setErrorMsg('Manually envoked error')} />
      </section>
    </AppContext.Provider>
  );
}
