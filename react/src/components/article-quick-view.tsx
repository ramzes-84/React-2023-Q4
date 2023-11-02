import { ArticleInCatalog } from '../types';

interface ArticleQuickViewProps {
  articleData: ArticleInCatalog;
}

export const ArticleQuickView = ({ articleData }: ArticleQuickViewProps) => {
  return (
    <>
      <article className="flex flex-col	items-center p-3 max-w-4xl mx-auto">
        <h1 className="underline-offset-1	m-2 text-center	text-sky-900 font-extrabold	text-xl">
          {articleData.webTitle}
        </h1>
        <img src={articleData.fields.thumbnail || '/no-image.png'} alt="" />
        <div>{articleData.fields.bodyText}</div>
      </article>
    </>
  );
};
