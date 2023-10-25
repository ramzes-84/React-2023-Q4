import { Component } from 'react';
import Navigation from './components/navigation';
import Search from './components/search';
import NewsSection from './components/news-section';
import { CompProps } from './types';

type AppState = {
  keyword: string;
};

export default class App extends Component<CompProps, AppState> {
  constructor(props: CompProps) {
    super(props);
    this.state = { keyword: localStorage.getItem('keyword') || '' };
    this.setState = this.setState.bind(this);
  }

  render() {
    return (
      <>
        <Navigation />
        <Search keywordCallback={this.setState} />
        <NewsSection keyword={this.state.keyword} />
      </>
    );
  }
}
