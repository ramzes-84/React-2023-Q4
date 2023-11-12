import { describe, it, expect, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import App from './App';

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

export class LocalStorageMock {
  store: { [key: string]: string };

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  key(n: number) {
    return Object.keys(this.store)[n];
  }

  length: number = 0;
}

global.localStorage = new LocalStorageMock();

describe('App component ', () => {
  it('Should render basic elements: search, news & error thrower', () => {
    act(() => {
      render(<App />);
    });

    const searchBox = screen.getByRole('textbox');
    const news = screen.getByText('News block');
    const errorBtn = screen.getByText('Error block');

    expect(searchBox).toBeInTheDocument();
    expect(news).toBeInTheDocument();
    expect(errorBtn).toBeInTheDocument();
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    global.localStorage.setItem(
      'settings',
      JSON.stringify({ limit: '10', q: 'football', sort: 'newest', page: '1' })
    );
    render(<App />);

    await waitFor(() => {
      const searchBox = screen.getByRole('textbox');

      expect((searchBox as HTMLInputElement).value).toEqual('football');
    });
  });
});
