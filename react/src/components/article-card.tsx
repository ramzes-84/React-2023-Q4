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
      <a
        href={this.articleLink}
        className="inline-block max-w-xs	border-2 rounded-2xl border-purple-500 overflow-hidden"
      >
        <img
          width={320}
          height={144}
          src={this.props.article.fields.thumbnail || '/no-image.png'}
          alt="photo"
        />
        <h4 className="p-1">{this.props.article.webTitle}</h4>
        <p className="p-1">Category: {this.props.article.sectionName}</p>
      </a>
    );
  }
}
