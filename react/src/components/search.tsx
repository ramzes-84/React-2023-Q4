import { Component, SyntheticEvent } from 'react';
import { AppState, CompProps } from '../types';

interface SearchProps extends CompProps {
  keywordCallback: React.Dispatch<React.SetStateAction<AppState>>;
}

export default class Search extends Component<SearchProps> {
  handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    const keyword = localStorage.getItem('keyword') || '';
    this.props.keywordCallback({ keyword });
  };

  render() {
    return (
      <section className="rounded-2xl bg-slate-500 text-white m-2 p-2">
        <form
          className="flex justify-center gap-2"
          onSubmit={this.handleSearch}
        >
          <input
            placeholder="Enter 3 or more letters..."
            className="text-black"
            type="text"
            defaultValue={localStorage.getItem('keyword') || ''}
            onChange={(e) => localStorage.setItem('keyword', e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
      </section>
    );
  }
}
