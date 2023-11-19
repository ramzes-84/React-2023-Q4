import { describe, it, expect, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { ErrorPage } from './components/error-page';
import { Navigation } from './components/navigation';
import { SingleView } from './components/single-view';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { articleResponse } from './utils/test-data';
import { Wrapper } from './utils/test-utils';
import { PageLimitValue, Sort } from './types';

const routes = [
  {
    path: '/',
    element: <Navigation />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: 'split/*',
            element: <SingleView />,
          },
        ],
      },
      {
        path: 'article/*',
        element: <SingleView />,
      },
    ],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/'],
});

const response = {
  status: 'ok',
  userTier: 'developer',
  total: 165529,
  startIndex: 11,
  pageSize: 10,
  currentPage: 2,
  pages: 16553,
  orderBy: 'relevance',
  results: [articleResponse],
};

type FakeResponse = () => Promise<Promise<Response>>;

const mockedFetch = vi.fn().mockResolvedValue({
  headers: '',
  ok: true,
  redirected: false,
  statusText: 'ok',
  type: 'basic',
  url: 'string',
  status: 200,
  clone: vi.fn(),
  json: () => Promise.resolve({ response }),
});

vi.spyOn(global, 'fetch').mockImplementation(
  mockedFetch as unknown as FakeResponse
);

describe('App component testing', () => {
  it('Should catch an error', () => {
    // eslint-disable-next-line no-console
    console.error = vi.fn();

    render(
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    );
    const errorBtn = screen.getByText('Throw error');
    fireEvent.click(errorBtn);
    const errorLabel = screen.getByText('Manually', { exact: false });
    expect(errorLabel).toBeInTheDocument();
  });

  it('Should call fetch function', async () => {
    render(
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    );
    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledTimes(1);
    });
  });

  it('Should show message on server error', () => {
    render(
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    );
    waitFor(() => {
      const errorMsg = screen.getByText('The server returned an error');
      expect(errorMsg).toBeInTheDocument();
    });
  });

  it('Should call fetch on items per page change', async () => {
    render(
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    );
    const perPageSelector: HTMLSelectElement =
      screen.getByText('10 items per page');
    expect(perPageSelector).toBeInTheDocument();

    fireEvent.change(perPageSelector, {
      target: { value: PageLimitValue.fifty },
    });

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledTimes(1);
    });
  });

  it('Should call fetch on sort change', async () => {
    render(
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    );
    const sortSelector: HTMLSelectElement =
      screen.getByText('Show newest first');
    expect(sortSelector).toBeInTheDocument();

    fireEvent.change(sortSelector, {
      target: { value: Sort.Relevance },
    });

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledTimes(1);
    });
  });
});
