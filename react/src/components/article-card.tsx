import { Link } from 'react-router-dom';
import { ArticleInCatalog } from '../types';

interface ArticleCardProps {
  article: ArticleInCatalog;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to={`/split/${article.id}`}>
      <div className="flex flex-row border rounded-2xl border-slate-500 overflow-hidden">
        <img
          className="hidden sm:block"
          width={320}
          height={144}
          src={article.fields.thumbnail || '/no-image.png'}
          alt="photo"
        />
        <div className="flex flex-col p-2 grow">
          <h2 className="p-1 text-lg text-blue-950 underline underline-offset-2">
            {article.webTitle}
          </h2>
          <p className="grow p-1 italic">{article.fields.trailText}</p>
          <div className="flex flex-row">
            <p className="p-1 grow">Category: {article.sectionName}</p>
            <p>
              Read
              <button className="mx-1 px-1 text-white	bg-slate-500 rounded-md">
                here
              </button>
              /
              <Link to={`/article/${article.id}`}>
                <button className="mx-1 px-1 text-white	bg-slate-500 rounded-md">
                  single
                </button>
              </Link>
              /
              <a href={article.webUrl} target="_blank" rel="noreferrer">
                <button className="mx-1 px-1 text-white	bg-slate-500 rounded-md">
                  on Guardian
                </button>
              </a>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
