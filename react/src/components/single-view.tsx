import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Spinner } from './spinner';
import { CloseBtn } from './close-btn';
import { newsApi } from '../service/newsApi';
import { articleLoaderSlice } from '../store/loaders-slice';
import { useDispatch } from 'react-redux';

export const SingleView = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const ref = useRef<HTMLElement | null>(null);
  const { data, isError, isLoading } = newsApi.useGetArticleQuery(
    params['*'] as string
  );

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
    dispatch(articleLoaderSlice.actions.isLoadingArticle(isLoading));
  });

  return (
    <>
      {isLoading && <Spinner />}
      {data && (
        <>
          <Link to={'/'}>
            <CloseBtn />
          </Link>
          <article
            ref={ref}
            className="flex flex-col items-center p-3 max-w-4xl mx-auto"
          >
            <h1 className="underline-offset-1	m-2 text-center	text-sky-900 font-extrabold	text-xl">
              {data.webTitle}
            </h1>
            <p>
              Date:
              {`${new Date(data.webPublicationDate).getFullYear()}-${
                new Date(data.webPublicationDate).getMonth() + 1
              }-${new Date(data.webPublicationDate).getDate()}`}
            </p>
            <img
              src={data.fields.thumbnail || '/no-image.png'}
              width={420}
              height={250}
              alt={data.webTitle}
            />
            <div
              className="overflow-hidden"
              dangerouslySetInnerHTML={{ __html: data.fields.body }}
            />
          </article>
        </>
      )}
      {isError && (
        <div>Something wrong with the server, try again later, please.</div>
      )}
    </>
  );
};
