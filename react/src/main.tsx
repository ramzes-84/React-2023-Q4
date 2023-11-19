import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/error-boundary.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './components/error-page.tsx';
import { SingleView } from './components/single-view.tsx';
import { Navigation } from './components/navigation.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
