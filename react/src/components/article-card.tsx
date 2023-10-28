import { ArticleInCatalog } from '../types';

interface ArticleCardProps {
  article: ArticleInCatalog;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <a href={article.webUrl} target="_blank" rel="noreferrer">
      <div className="flex flex-row border rounded-2xl border-slate-500 overflow-hidden">
        <img
          width={320}
          height={144}
          src={article.fields.thumbnail || '/no-image.png'}
          alt="photo"
        />
        <div className="flex flex-col p-2">
          <h2 className="p-1 text-lg text-blue-950 underline underline-offset-2">
            {article.webTitle}
          </h2>
          <p className="grow p-1 italic">{article.fields.trailText}</p>
          <p className="p-1">Category: {article.sectionName}</p>
        </div>
      </div>
    </a>
  );
}
