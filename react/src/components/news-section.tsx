import { ReactNode, useEffect, useRef, useState } from 'react';
import { ArticleInCatalog, RequestParams } from '../types';
import { ArticleCard } from './article-card';
import { ApiService } from '../service/apiService';
import { Spinner } from './spinner';
import { ArticleQuickView } from './article-quick-view';
import { CloseBtn } from './close-btn';

interface NewsProps {
  params: RequestParams;
}

export function NewsSection({ params }: NewsProps) {
  const singleArticleRef = useRef<HTMLElement | null>(null);
  const [news, setNews] = useState<null | ArticleInCatalog[]>(null);
  const [quickArticle, setQuickArticle] = useState<null | ReactNode>(null);

  const splitViewCB = (id: string) => {
    const articleData: ArticleInCatalog | undefined = news?.find(
      (article) => id === article.id
    );
    if (articleData) {
      setQuickArticle(<ArticleQuickView articleData={articleData} />);
    } else throw new Error('There is no article with provided ID');
    singleArticleRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    async function fetchNews() {
      const apiService = new ApiService();
      const newsArr: ArticleInCatalog[] = await apiService.getNews(params);
      setNews(newsArr);
    }
    fetchNews();
  }, [params]);

  if (news && news.length > 0) {
    const newsCards = news.map((article) => (
      <ArticleCard
        key={article.id}
        article={article}
        splitViewCB={splitViewCB}
      />
    ));
    return (
      <main className="flex flex-row">
        <section className="flex flex-col gap-3 m-2 px-2 max-w-4xl mx-auto">
          {newsCards}
        </section>
        <section className="flex flex-col max-w-[50%]" ref={singleArticleRef}>
          {quickArticle && (
            <CloseBtn paramsCallback={() => setQuickArticle(null)} />
          )}
          {quickArticle}
        </section>
      </main>
    );
  } else if (news && news.length === 0) {
    return <main className="text-center">Nothing was found</main>;
  }
  return <Spinner />;
}
