import { renderHook, waitFor } from '@testing-library/react';
import { newsApi } from './newsApi';
import { expect, it, describe, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ReactNode } from 'react';

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}
const mockedFetch = vi.fn();
vi.spyOn(global, 'fetch').mockImplementation(mockedFetch);

describe('', () => {
  it('renders hook', async () => {
    renderHook(() => newsApi.useGetArticleQuery('id'), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(mockedFetch).toBeCalled();
    });
  });
});
