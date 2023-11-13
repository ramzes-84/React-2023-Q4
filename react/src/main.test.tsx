import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import App from './App';
import { ErrorPage } from './components/error-page';
import { Navigation } from './components/navigation';
import { SingleView } from './components/single-view';
import { render, screen } from '@testing-library/react';

describe('Make sure main elements were rendered  on the screen', async () => {
  it('', () => {
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

    render(<RouterProvider router={router} />);
    const mainMenu = screen.getByText('Main');

    expect(mainMenu).toBeInTheDocument();
  });
});
