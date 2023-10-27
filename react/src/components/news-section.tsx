import { Component } from 'react';
import { AppProps, ArticleInCatalog } from '../types';
import ArticleCard from './article-card';

interface NewsProps extends AppProps {
  newsBatch: ArticleInCatalog[];
}

export default class NewsSection extends Component<NewsProps> {
  render() {
    if (this.props.newsBatch.length > 0) {
      const newsCards = this.props.newsBatch.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ));
      return (
        <main className="flex flex-wrap gap-3 justify-center">{newsCards}</main>
      );
    } else {
      return (
        <main className="flex flex-wrap gap-3 justify-center">
          Nothing was found
        </main>
      );
    }
  }
}
