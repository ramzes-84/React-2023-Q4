import { useLoaderData } from 'react-router-dom';
import { Article } from '../types';

export const SingleView = () => {
  const article = useLoaderData() as unknown as Article;
  const articleDate = new Date(article.webPublicationDate);

  return (
    <>
      <article className="flex flex-col	items-center p-3">
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
          alt=""
        />
        <div dangerouslySetInnerHTML={{ __html: article.fields.body }} />
      </article>
    </>
  );
};
