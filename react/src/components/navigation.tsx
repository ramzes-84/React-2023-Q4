import { Component, SyntheticEvent } from 'react';
import { AppProps } from '../types';

type NavState = {
  isBurgerOpen: boolean;
};

export default class Navigation extends Component<AppProps, NavState> {
  state: NavState = { isBurgerOpen: false };

  handleBurgerAction = (e: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    this.setState({ isBurgerOpen: !this.state.isBurgerOpen });
  };

  render() {
    return (
      <nav className="relative flex flex-wrap items-center justify-between px-2  bg-slate-500	 z-10 drop-shadow-md ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              target="_blank"
              href="https://open-platform.theguardian.com/documentation/"
              rel="noreferrer"
            >
              <img
                src="https://open-platform.theguardian.com/public/img/theguardian-op-logo.svg"
                width={300}
                alt="Logo"
                className="inline-block hover:opacity-75"
              />
            </a>
            <button
              className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
              type="button"
              onClick={this.handleBurgerAction}
            >
              <img
                src="/menu.svg"
                width={50}
                height={50}
                alt="menu"
                className="inline-block"
              />
            </button>
          </div>
          <div
            className={
              'md:flex flex-grow items-center' +
              (this.state.isBurgerOpen ? ' flex' : ' hidden')
            }
            data-testid="nav"
          >
            <div className="flex flex-col md:flex-row list-none md:ml-auto font-serif text-white	text-xl	">
              <button className="m-2">Main Page</button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
