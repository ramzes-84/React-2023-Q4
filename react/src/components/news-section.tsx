import { useEffect, useRef, useState } from 'react';
import { ArticleInCatalog, ArticlesResponse, RequestParams } from '../types';
import { ArticleCard } from './article-card';
import { ApiService } from '../service/apiService';
import { Spinner } from './spinner';
import { Outlet, useParams } from 'react-router-dom';
import { Pagination } from './pagination';

interface NewsProps {
  params: RequestParams;
  paramsCallback: (params: RequestParams) => void;
}

export function NewsSection({ params, paramsCallback }: NewsProps) {
  const [news, setNews] = useState<null | ArticleInCatalog[]>(null);
  const URLParams = useParams();
  const isSplitView = !!URLParams['*'];
  const totalPages = useRef<number>(0);

  useEffect(() => {
    async function fetchNews() {
      const apiService = new ApiService();
      const newsResponse: ArticlesResponse = await apiService.getNews(params);
      totalPages.current = newsResponse.pages;
      setNews(newsResponse.results);
    }
    fetchNews();
  }, [params]);

  if (news && news.length > 0) {
    const newsCards = news.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ));
    return (
      <>
        <main className="flex flex-row">
          <section
            className={
              'flex flex-col gap-3 m-2 px-2 mx-auto ' +
              (isSplitView ? 'max-w-[50%]' : 'max-w-4xl')
            }
          >
            {newsCards}
          </section>
          <section className={isSplitView ? 'w-[50%]' : 'hidden'}>
            <Outlet />
          </section>
        </main>
        <Pagination
          params={params}
          paramsCallback={paramsCallback}
          totalPages={totalPages.current}
        />
      </>
    );
  } else if (news && news.length === 0) {
    return <main className="text-center">Nothing was found</main>;
  }
  return <Spinner />;
}
