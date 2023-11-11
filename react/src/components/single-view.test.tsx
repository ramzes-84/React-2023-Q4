import { describe, it, expect, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { SingleView } from './single-view';

vi.mock('react-router-dom', () => {
  return {
    Link: vi.fn(),
    useParams: vi.fn().mockReturnValue({ ['*']: 'url/params' }),
  };
});

vi.mock('./spinner', () => {
  return {
    Spinner: vi.fn().mockReturnValue(<div>Spinner</div>),
  };
});

vi.mock('../service/apiService', () => {
  return vi.fn().mockImplementation(() => {
    return {
      getCurrentArticle: vi.fn().mockReturnValue({
        webPublicationDate: '2023-09-01T17:44:33Z',
        webTitle: 'webTitle',
        fields: {
          body: 'body',
          thumbnail:
            'https://media.guim.co.uk/6a937f2c8a43f464c2731d1976cbba48a3767a11/0_0_8256_4954/500.jpg',
        },
      }),
    };
  });
});

vi.mock('../service/apiService');

describe('SingleView component should render article', () => {
  it('', () => {
    act(() => {
      render(<SingleView />);
    });

    const spinner = screen.getByText('Spinner');

    expect(spinner).toBeInTheDocument();
  });
});
