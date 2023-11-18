import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterEach,
  afterAll,
} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { NewsSection } from './news-section';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { Wrapper, server } from '../utils/test-utils';

vi.mock('./spinner', () => {
  return {
    Spinner: vi.fn().mockReturnValue(<div>Spinner</div>),
  };
});

const routes = [
  {
    path: '/',
    element: <NewsSection />,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/'],
});

describe('NewsSection component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Should show spinner on render', () => {
    render(
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    );

    const spinner = screen.getByText('Spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('Should show error message on server error', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    await waitFor(() => {
      expect(
        screen.getByText('The server returned an error')
      ).toBeInTheDocument();
    });
  });
});
