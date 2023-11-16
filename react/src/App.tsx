import { Search } from './components/search';
import { NewsSection } from './components/news-section';
import { StorageValues } from './types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ErrorThrower } from './components/error-thrower';
import { RootState } from './store/store';
import { useSelector } from 'react-redux';

export default function App() {
  const params = useSelector((state: RootState) => state.params.value);

  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  useEffect(() => {
    if (errorMsg) throw new Error(errorMsg);
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [urlParams, setUrlParams] = useSearchParams();

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
