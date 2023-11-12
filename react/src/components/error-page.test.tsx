import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from './error-page';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

vi.mock('./navigation', () => {
  return { Navigation: vi.fn() };
});
vi.mock('react-router-dom', async () => {
  const component = await vi.importActual('react-router-dom');

  return {
    ...(component as object),
    useRouteError: vi.fn().mockReturnValue({ message: 'Some error' }),
  };
});

describe('ErrorPage component', () => {
  it('Should content error page elements with info', () => {
    render(<ErrorPage />);

    const warning = screen.getByText('There is an error in application:');
    const errorMsg = screen.getByText('Some error');
    const img = screen.getByAltText('error');
    const recomendation = screen.getByText('Please go to Main to fix it.');

    expect(warning).toBeInTheDocument();
    expect(errorMsg).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(recomendation).toBeInTheDocument();
  });

  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    const routes = [
      {
        path: '/404',
        element: <ErrorPage />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/404'],
    });

    render(<RouterProvider router={router} />);
    const errorMsg = screen.getByText('There is an error in application:');

    expect(errorMsg).toBeInTheDocument();
  });
});
