import { Component } from 'react';
import Navigation from './components/navigation';
import { Search } from './components/search';
import NewsSection from './components/news-section';
import { AppProps, AppState, ArticleInCatalog, StorageValues } from './types';
import { ApiService } from './service/apiService';
import Spinner from './components/spinner';

export default class App extends Component<AppProps, AppState> {
  state: AppState = {
    keyword: localStorage.getItem(StorageValues.Keyword) || '',
    isLoading: true,
    errorMsg: null,
    news: [],
  };

  componentDidMount = () => {
    this.fetchNews(this.state.keyword);
  };

  componentDidUpdate = () => {
    if (this.state.errorMsg) throw new Error('Manually envoked error');
  };

  fetchNews = async (word: string) => {
    this.setState({ isLoading: true, keyword: word });
    const apiService = new ApiService();
    const newsArr: ArticleInCatalog[] = await apiService.getNews(word);
    this.setState({ isLoading: false, news: newsArr });
  };

  setKeyword = (word: string) => {
    this.setState({
      keyword: word,
    });
    localStorage.setItem(StorageValues.Keyword, word);
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
            this.setState({ errorMsg: 'Manually envoked error' });
          }}
        >
          Throw error
        </button>
      </section>
    );
  }
}
