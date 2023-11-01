import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/error-boundary.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './components/error-page.tsx';
import { SingleView } from './components/single-view.tsx';
import { Navigation } from './components/navigation.tsx';
import { fetchNews, fetchSingleArticle } from './utilities/utils.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
        loader: fetchNews,
      },
      {
        path: 'article/*',
        element: <SingleView />,
        loader: ({ params }) => {
          return fetchSingleArticle(params['*'] as string);
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
