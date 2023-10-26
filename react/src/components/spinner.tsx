import { Component } from 'react';

export default class Spinner extends Component {
  render() {
    return (
      <div className="self-center">
        <img src="/spinner.gif" alt="Loading..." width={200} />
      </div>
    );
  }
}
