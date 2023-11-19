import { ArticleCard } from './article-card';
import { Spinner } from './spinner';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Pagination } from './pagination';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

export function NewsSection() {
  const URLParams = useParams();
  const isSplitView = !!URLParams['*'];
  const isLoading = useSelector((state: RootState) => state.newsLoader.value);
  const data = useSelector((state: RootState) => state.news.news);

  if (isLoading) {
    return <Spinner />;
  }
  if (data && data.length > 0) {
    const newsCards = data.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ));
    return (
      <>
        <main className="flex flex-row relative">
          <section
            className={
              'flex flex-col gap-3 m-2 px-2 mx-auto ' +
              (isSplitView ? 'max-w-[50%]' : 'max-w-4xl')
            }
          >
            {newsCards}
          </section>
          <Link
            to={'/'}
            className={
              isSplitView
                ? 'absolute w-[50%] h-[100%] left-0 top-0 bg-slate-950/20 cursor-ew-resize'
                : 'hidden'
            }
          />
          <section className={isSplitView ? 'w-[50%]' : 'hidden'}>
            <Outlet />
          </section>
        </main>
        <Pagination />
      </>
    );
  } else if (data && data.length === 0) {
    return (
      <main className="bg-yellow-200 p-6 mx-4 rounded-xl text-center">
        Nothing was found
      </main>
    );
  }
}
