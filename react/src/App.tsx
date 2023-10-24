import { Component } from 'react';
import Navigation from './components/navigation';
import Search from './components/search';
import NewsSection from './components/news-section';

export default class App extends Component {
  render() {
    return (
      <div className="">
        <Navigation />
        <Search />
        <NewsSection />
      </div>
    );
  }
}
