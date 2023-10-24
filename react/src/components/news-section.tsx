import { Component, ReactElement } from 'react';
import { CompProps } from '../types';
import Spinner from './spinner';

type NewsState = {
  news: ReactElement[];
  isLoading: boolean;
};

export default class NewsSection extends Component<CompProps, NewsState> {
  state: NewsState = { news: [], isLoading: true };

  componentDidMount = async () => {};

  render() {
    return <div>{this.state.isLoading && <Spinner />}</div>;
  }
}
