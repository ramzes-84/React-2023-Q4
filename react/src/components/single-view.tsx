import { Link, useParams } from 'react-router-dom';
import { Article } from '../types';
import { useEffect, useRef, useState } from 'react';
import { Spinner } from './spinner';
import { ApiService } from '../service/apiService';
import { CloseBtn } from './close-btn';

export const SingleView = () => {
  const params = useParams();
  const [article, setArticle] = useState<null | Article>(null);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  });

  useEffect(() => {
    async function fetchNews() {
      const apiService = new ApiService();
      const fetchedArticle: Article = await apiService.getCurrentArticle(
        params['*'] as string
      );
      setArticle(fetchedArticle);
    }
    fetchNews();
  }, [params]);

  if (article) {
    const articleDate = new Date(article.webPublicationDate);

    return (
      <>
        <Link to={'/'}>
          <CloseBtn />
        </Link>
        <article
          ref={ref}
          className="flex flex-col items-center p-3 max-w-4xl mx-auto"
        >
          <h1 className="underline-offset-1	m-2 text-center	text-sky-900 font-extrabold	text-xl">
            {article.webTitle}
          </h1>
          <p>
            Date:
            {`${articleDate.getFullYear()}-${
              articleDate.getMonth() + 1
            }-${articleDate.getDate()}`}
          </p>
          <img
            src={article.fields.thumbnail || '/no-image.png'}
            width={420}
            height={250}
            alt={article.webTitle}
          />
          <div
            className="overflow-hidden"
            dangerouslySetInnerHTML={{ __html: article.fields.body }}
          />
        </article>
      </>
    );
  }
  return <Spinner />;
};
