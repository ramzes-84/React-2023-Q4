import { renderHook, waitFor } from '@testing-library/react';
import { newsApi } from './newsApi';
import { expect, it, describe, vi } from 'vitest';
import { Wrapper } from '../utils/test-utils';

const mockedFetch = vi.fn().mockResolvedValue({
  clone: vi.fn(),
});
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
