import { Component } from 'react';
import { CompProps } from '../types';

type NewsState = {
  news: string;
};

export default class NewsSection extends Component<CompProps, NewsState> {
  constructor(props: CompProps) {
    super(props);
    this.state = { news: 'Loading news' };
  }

  render() {
    return <div>{this.state.news}</div>;
  }
}
