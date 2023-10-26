import { Component, ReactElement } from 'react';
import { AppProps } from '../types';

interface NewsProps extends AppProps {
  newsBatch: ReactElement[];
}

export default class NewsSection extends Component<NewsProps> {
  render() {
    return (
      <main className="flex flex-wrap gap-3 justify-center">
        {this.props.newsBatch}
      </main>
    );
  }
}
