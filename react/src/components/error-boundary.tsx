import { Component } from 'react';
import { AppProps } from '../types';
import { Navigation } from './navigation';

type ErrorState = {
  hasError: boolean;
  message: string;
};

export class ErrorBoundary extends Component<AppProps, ErrorState> {
  state: ErrorState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: string) {
    return { hasError: true, message: error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Navigation />
          <div className="flex flex-col max-w-xs mx-auto">
            <p className="text-lg text-center">
              There is an error in application...
            </p>
            <p className="text-lg text-center">
              Please reload the page to fix it.
            </p>
            <img src="/error.svg" alt="error" />
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
