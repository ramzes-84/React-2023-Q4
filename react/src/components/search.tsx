import { ChangeEvent, Component, SyntheticEvent } from 'react';
import { CompProps } from '../types';

type SearchState = {
  keyword: string;
};

export default class Search extends Component<CompProps, SearchState> {
  state = { keyword: localStorage.getItem('keyword') || '' };

  handleSearch = (e: SyntheticEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault;
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault;
    const keyword = e.target.value;
    localStorage.setItem('keyword', keyword);
    this.setState({ keyword });
  };

  render() {
    return (
      <section className="rounded-2xl bg-slate-500 text-white m-2 p-2">
        <form className="flex justify-center gap-2" name="myInput">
          <input
            placeholder="Enter 3 or more letters..."
            className="text-black"
            type="text"
            name="keyword"
            value={this.state.keyword}
            onChange={this.handleChange}
          />
          <input type="button" value="Search" onClick={this.handleSearch} />
        </form>
      </section>
    );
  }
}
