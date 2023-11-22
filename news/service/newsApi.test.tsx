import { renderHook, waitFor } from '@testing-library/react';
import { newsApi } from './newsApi';
import { expect, it, describe, vi } from 'vitest';
import { Wrapper } from '../utils/test-utils';
import { testParams } from '../utils/test-data';

const mockedFetch = vi.fn().mockResolvedValue({
  clone: vi.fn(),
});
vi.spyOn(global, 'fetch').mockImplementation(mockedFetch);

describe('NewsApi RTK Query slice testing', () => {
  it('Should call fetch on article action', async () => {
    renderHook(() => newsApi.useGetArticleQuery('id'), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(mockedFetch).toBeCalled();
    });
  });

  it('Should call fetch on news action', async () => {
    renderHook(() => newsApi.useGetNewsQuery(testParams), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(mockedFetch).toBeCalled();
    });
  });
});
