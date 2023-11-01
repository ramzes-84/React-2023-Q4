import { ArticleInCatalog } from '../types';
import { ArticleCard } from './article-card';

interface NewsProps {
  newsBatch: ArticleInCatalog[];
}

export function NewsSection({ newsBatch }: NewsProps) {
  if (newsBatch.length > 0) {
    const newsCards = newsBatch.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ));
    return (
      <main className="flex flex-col gap-3 m-2 max-w-4xl	mx-auto">
        {newsCards}
      </main>
    );
  }
  return <main className="text-center">Nothing was found</main>;
}
