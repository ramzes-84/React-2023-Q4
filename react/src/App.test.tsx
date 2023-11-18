import { describe, it, expect, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { ErrorPage } from './components/error-page';
import { Navigation } from './components/navigation';
import { SingleView } from './components/single-view';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

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
  results: [
    {
      id: 'us-news/2023/nov/08/israeli-diplomat-bard-college-apartheid-debate',
      type: 'article',
      sectionId: 'us-news',
      sectionName: 'US news',
      webPublicationDate: '2023-11-08T19:20:46Z',
      webTitle:
        'Israeli diplomat pressured US college to drop course on ‘apartheid’ debate',
      webUrl:
        'https://www.theguardian.com/us-news/2023/nov/08/israeli-diplomat-bard-college-apartheid-debate',
      apiUrl:
        'https://content.guardianapis.com/us-news/2023/nov/08/israeli-diplomat-bard-college-apartheid-debate',
      isHosted: false,
      pillarId: 'pillar/news',
      pillarName: 'News',
    },
  ],
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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    const errorBtn = screen.getByText('Throw error');
    fireEvent.click(errorBtn);
    const errorLabel = screen.getByText('Manually', { exact: false });
    expect(errorLabel).toBeInTheDocument();
  });

  it('Should call fetch function', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    waitFor(() => {
      expect(mockedFetch).toHaveBeenCalled();
    });
  });

  it('Should show message on server error', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    waitFor(() => {
      const errorMsg = screen.getByText('The server returned an error');
      expect(errorMsg).toBeInTheDocument();
    });
  });
});
