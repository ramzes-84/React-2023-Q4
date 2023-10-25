import { Component, ReactElement } from 'react';
import { ArticleInCatalog, CompProps, RequestParams, Sort } from '../types';
import Spinner from './spinner';
import { ApiService } from '../service/apiService';
import ArticleCard from './article-card';

type NewsState = {
  news: ReactElement[];
  isLoading: boolean;
};

interface NewsProps extends CompProps {
  keyword: string;
}

export default class NewsSection extends Component<NewsProps, NewsState> {
  state: NewsState = { news: [], isLoading: true };
  params: RequestParams = {
    limit: 10,
    sort: Sort.Newest,
    page: 1,
    keyword: this.props.keyword,
  };

  componentDidMount = async () => {
    const apiService = new ApiService();
    const newsArr: ArticleInCatalog[] = await apiService.getNews(this.params);
    if (newsArr.length > 0) {
      const newsCards = newsArr.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ));
      this.setState({ news: newsCards, isLoading: false });
    } else {
      this.setState({
        news: [<p key="nothing">Nothing was found</p>],
        isLoading: false,
      });
    }
  };

  render() {
    return (
      <>
        {this.state.isLoading && <Spinner />}
        <main className="flex flex-wrap gap-3 justify-center">
          {this.state.news}
        </main>
      </>
    );
  }
}
