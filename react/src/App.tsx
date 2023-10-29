import { Search } from './components/search';
import { NewsSection } from './components/news-section';
import { ArticleInCatalog, StorageValues } from './types';
import { ApiService } from './service/apiService';
import { Spinner } from './components/spinner';
import { useEffect, useState } from 'react';

export default function App() {
  const [keyword, setKeyword] = useState<string>(
    localStorage.getItem(StorageValues.Keyword) || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [news, setNews] = useState<ArticleInCatalog[]>([]);

  useEffect(() => {
    async function fetchNews() {
      localStorage.setItem(StorageValues.Keyword, keyword);
      setIsLoading(true);
      const apiService = new ApiService();
      const newsArr: ArticleInCatalog[] = await apiService.getNews(keyword);
      setNews(newsArr);
      setIsLoading(false);
    }
    fetchNews();
  }, [keyword]);

  useEffect(() => {
    if (errorMsg) throw new Error(errorMsg);
  });

  return (
    <section className="flex flex-col items-stretch">
      <Search word={keyword} keywordCallback={(word) => setKeyword(word)} />
      {isLoading && <Spinner />}
      {!isLoading && <NewsSection newsBatch={news} />}
      <button
        className="m-2 p-2 text-white	bg-red-600 rounded-2xl"
        onClick={() => setErrorMsg('Manually envoked error')}
      >
        Throw error
      </button>
    </section>
  );
}
