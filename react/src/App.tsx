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
    errorMsg: null,
    news: [],
  };

  componentDidMount = () => {
    this.fetchNews(this.state.keyword);
  };

  fetchNews = async (word: string) => {
    this.setState({ isLoading: true, keyword: word });
    const apiService = new ApiService();
    const newsArr: ArticleInCatalog[] = await apiService.getNews(word);
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

  setKeyword = (word: string) => {
    this.setState({
      keyword: word,
    });
    localStorage.setItem('keyword', word);
    this.fetchNews(word);
  };

  render() {
    return (
      <section className="flex flex-col items-stretch">
        <Navigation />
        <Search
          word={this.state.keyword}
          keywordCallback={(word) => {
            this.setKeyword(word);
          }}
        />
        {this.state.isLoading && <Spinner />}
        {!this.state.isLoading && <NewsSection newsBatch={this.state.news} />}
        <button
          className="m-2 p-2 text-white	bg-red-600 rounded-2xl"
          onClick={() => {
            throw new Error('Manually envoked error');
          }}
        >
          Throw error
        </button>
      </section>
    );
  }
}
