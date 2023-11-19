import { useNavigate } from 'react-router-dom';
import { ArticleInCatalog } from '../types';

interface ArticleCardProps {
  article: ArticleInCatalog;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const navigation = useNavigate();

  return (
    <div className="flex flex-row border rounded-2xl border-slate-500 overflow-hidden">
      <div
        onClick={() => navigation(`/split/${article.id}`)}
        className="flex flex-row"
      >
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
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-evenly">
        <div
          onClick={() => navigation(`/split/${article.id}`)}
          className="px-3 text-white grow	bg-slate-300"
        >
          <button>&#128269;</button>
        </div>
        <div
          onClick={() => navigation(`/article/${article.id}`)}
          className="px-3 text-white grow	bg-slate-400"
        >
          <button>&#8599;</button>
        </div>
        <a
          href={article.webUrl}
          target="_blank"
          rel="noreferrer"
          className="px-3 text-white grow	bg-slate-500"
        >
          <button>&#127760;</button>
        </a>
      </div>
    </div>
  );
}
