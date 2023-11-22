import { expect, it, vi, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './error-boundary';
import { BrowserRouter } from 'react-router-dom';

vi.mock('/navigation', () => {
  return {
    Navigation: vi.fn().mockReturnValue(<div>Navigation</div>),
  };
});

const ChildWithError = ({ err }: { err: Error }) => {
  if (err) {
    throw err;
  }
  return (
    <div>
      <p>Some text</p>
    </div>
  );
};

describe('Error boundary testing', () => {
  it('Should render children without errors', () => {
    const children = <div>Test Children</div>;

    render(<ErrorBoundary>{children}</ErrorBoundary>);
    const child = screen.getByText('Test Children');

    expect(child).toBeInTheDocument();
  });

  it('Should display an error', () => {
    // eslint-disable-next-line no-console
    console.error = vi.fn();
    const error = new Error('Test Error');
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ChildWithError err={error} />
        </ErrorBoundary>
      </BrowserRouter>
    );
    const errorBlock = screen.getByText('There is an error in application...');

    expect(errorBlock).toBeInTheDocument();
  });

  it('Should set hasError to true in getDerivedStateFromError', () => {
    const result = ErrorBoundary.getDerivedStateFromError('Test error');

    expect(result).toEqual({ hasError: true, message: 'Test error' });
  });
});
