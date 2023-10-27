import { ChangeEvent, Component } from 'react';
import { AppProps } from '../types';

interface SearchProps extends AppProps {
  word: string;
  keywordCallback: (word: string) => void;
}

type SearchState = {
  keyword: string;
};

export default class Search extends Component<SearchProps, SearchState> {
  state: SearchState = { keyword: this.props.word };

  handleSearch = () => {
    this.props.keywordCallback(this.state.keyword.trim());
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    this.setState({ keyword: newKeyword });
  };

  render() {
    return (
      <section className="rounded-2xl bg-slate-500 text-white m-2 p-2">
        <div className="flex justify-center gap-2">
          <input
            placeholder="football?"
            className="text-black px-1 rounded"
            type="text"
            name="keyword"
            value={this.state.keyword}
            onChange={this.handleChange}
          />
          <input type="button" value="Search" onClick={this.handleSearch} />
        </div>
      </section>
    );
  }
}
