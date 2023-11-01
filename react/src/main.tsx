import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/error-boundary.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './components/error-page.tsx';
import { SingleView } from './components/single-view.tsx';
import { Navigation } from './components/navigation.tsx';
import { SplitView } from './components/split-view.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'split/*',
        element: <SplitView />,
      },
      {
        path: 'article/*',
        element: <SingleView />,
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
