import { Component } from 'react';
import Navigation from './components/navigation';
import Search from './components/search';
import NewsSection from './components/news-section';
import { AppProps, AppState, ArticleInCatalog } from './types';
import { ApiService } from './service/apiService';
import ArticleCard from './components/article-card';
import Spinner from './components/spinner';

export default class App extends Component<AppProps, AppState> {
  state: AppState = {
    keyword: localStorage.getItem('keyword') || '',
    isLoading: true,
    news: [],
  };

  componentDidMount = () => {
    this.fetchNews();
  };

  setKeyword = () => {
    this.setState({
      keyword: localStorage.getItem('keyword') || '',
      news: [],
    });
    this.fetchNews();
  };

  fetchNews = async () => {
    this.setState({ isLoading: true });
    const apiService = new ApiService();
    const newsArr: ArticleInCatalog[] = await apiService.getNews(
      this.state.keyword
    );
    if (newsArr.length > 0) {
      const newsCards = newsArr.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ));
      this.setState({ isLoading: false, news: newsCards });
    } else {
      this.setState({
        isLoading: false,
        news: [<p key="nothing">Nothing was found</p>],
      });
    }
  };

  render() {
    return (
      <section className="flex flex-col items-stretch">
        <Navigation />
        <Search
          word={this.state.keyword}
          keywordCallback={() => {
            this.setKeyword();
          }}
        />
        {this.state.isLoading && <Spinner />}
        <NewsSection newsBatch={this.state.news} />
      </section>
    );
  }
}
