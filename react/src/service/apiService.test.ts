import { expect, it, describe, vi } from 'vitest';
import { ApiService } from './apiService';
import { PageLimitValue, RequestParams, Sort } from '../types';

type FakeResponse = () => Promise<Promise<Response>>;

describe('ApiService class testing', async () => {
  it('getCurrentArticle method returns fetched data', async () => {
    const mockedFetch = () =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ response: { content: 'Test content' } }),
      });
    vi.spyOn(global, 'fetch').mockImplementation(
      mockedFetch as unknown as FakeResponse
    );

    const returnedValue = await new ApiService().getCurrentArticle('id');

    expect(returnedValue).toEqual('Test content');
  });

  it('getNews method returns fetched data', async () => {
    const params: RequestParams = {
      limit: PageLimitValue.ten,
      page: '1',
      q: '',
      sort: Sort.Newest,
    };
    const mockedFetch = () =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ response: 'Test content' }),
      });
    vi.spyOn(global, 'fetch').mockImplementation(
      mockedFetch as unknown as FakeResponse
    );

    const returnedValue = await new ApiService().getNews(params);

    expect(returnedValue).toEqual('Test content');
  });

  it('Throw error on failed fetch news', async () => {
    let errorMsg: string = '';
    const params: RequestParams = {
      limit: PageLimitValue.ten,
      page: '1',
      q: '',
      sort: Sort.Newest,
    };
    const mockedFetch = () =>
      Promise.resolve({
        status: 400,
      });
    vi.spyOn(global, 'fetch').mockImplementation(
      mockedFetch as unknown as FakeResponse
    );

    try {
      await new ApiService().getNews(params);
    } catch (error: Error | unknown) {
      errorMsg = (error as Error).message;
    }

    expect(errorMsg).toEqual('There is something wrong with the server!');
  });

  it('Throw error on failed fetch article', async () => {
    let errorMsg: string = '';
    const mockedFetch = () =>
      Promise.resolve({
        status: 400,
      });
    vi.spyOn(global, 'fetch').mockImplementation(
      mockedFetch as unknown as FakeResponse
    );

    try {
      await new ApiService().getCurrentArticle('id');
    } catch (error: Error | unknown) {
      errorMsg = (error as Error).message;
    }

    expect(errorMsg).toEqual('There is something wrong with the server!');
  });
});
