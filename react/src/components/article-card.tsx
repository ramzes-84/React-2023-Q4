import { Component } from 'react';
import { ArticleInCatalog } from '../types';

type ArticleCardProps = {
  article: ArticleInCatalog;
};

export default class ArticleCard extends Component<ArticleCardProps> {
  articleLink: string;

  constructor(props: ArticleCardProps | Readonly<ArticleCardProps>) {
    super(props);
    this.articleLink = `article/${this.props.article.id}`;
  }

  render() {
    return (
      <a href={this.props.article.webUrl} target="_blank" rel="noreferrer">
        <div className="flex flex-row border-2 rounded-2xl border-purple-500 overflow-hidden">
          <img
            width={320}
            height={144}
            src={this.props.article.fields.thumbnail || '/no-image.png'}
            alt="photo"
          />
          <div className="flex flex-col p-2">
            <h2 className="p-1 text-lg text-blue-950 underline underline-offset-2">
              {this.props.article.webTitle}
            </h2>
            <p className="grow p-1 italic">
              {this.props.article.fields.trailText}
            </p>
            <p className="p-1">Category: {this.props.article.sectionName}</p>
          </div>
        </div>
      </a>
    );
  }
}
