import { describe, it, expect, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { SingleView } from './single-view';

type FakeResponse = () => Promise<Promise<Response>>;

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
const mockedFetch = () =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ response: { content: 'Test content' } }),
  });
const spy = vi
  .spyOn(global, 'fetch')
  .mockImplementation(mockedFetch as unknown as FakeResponse);

describe('SingleView component', () => {
  it('Check that clicking triggers an additional API call to fetch detailed information', () => {
    act(() => {
      render(<SingleView />);
    });

    expect(spy).toHaveBeenCalled();
  });

  it('Check that a loading indicator is displayed while fetching data', () => {
    act(() => {
      render(<SingleView />);
    });

    const spinner = screen.getByText('Spinner');

    expect(spinner).toBeInTheDocument();
  });
});
