import { describe, it, expect, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./components/search', () => {
  return {
    Search: vi.fn().mockReturnValue(<div>Search block</div>),
  };
});
vi.mock('./components/news-section', () => {
  return {
    NewsSection: vi.fn().mockReturnValue(<div>News block</div>),
  };
});
vi.mock('./components/error-thrower', () => {
  return {
    ErrorThrower: vi.fn().mockReturnValue(<div>Error block</div>),
  };
});
vi.mock('react-router-dom', () => {
  return {
    useLocatoin: vi.fn(),
    useSearchParams: vi.fn().mockReturnValue([{ get: vi.fn() }, vi.fn()]),
  };
});

describe('App component ', () => {
  it('Should render basic elements: search, news & error thrower', () => {
    act(() => {
      render(<App />);
    });

    const search = screen.getByText('Search block');
    const news = screen.getByText('News block');
    const errorBtn = screen.getByText('Error block');

    expect(search).toBeInTheDocument();
    expect(news).toBeInTheDocument();
    expect(errorBtn).toBeInTheDocument();
  });
});
