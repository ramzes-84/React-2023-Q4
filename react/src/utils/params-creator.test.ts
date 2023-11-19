import { expect, it, describe, vi } from 'vitest';
import { paramsCreator } from './params-creator';
import { PageLimitValue, RequestParams, Sort } from '../types';

describe.concurrent('Config creator function tests', () => {
  it('Should return default values when LS & url search params not provided', () => {
    const badParam2 = {
      get: vi.fn(),
    };
    const badParam1 = {};
    const resultParams = paramsCreator(
      badParam1 as RequestParams,
      badParam2 as unknown as URLSearchParams
    );
    expect(resultParams.q).toEqual('');
    expect(resultParams.limit).toEqual(PageLimitValue.ten);
    expect(resultParams.page).toEqual('1');
    expect(resultParams.sort).toEqual(Sort.Newest);
    expect(resultParams.details).toEqual('0');
  });

  it('Should return savedParams if provided', () => {
    const savedParams: RequestParams = {
      limit: PageLimitValue.fifty,
      sort: Sort.Oldest,
      page: '50',
      q: 'query',
      details: '1',
    };
    const badUrlParams = {
      get: vi.fn(),
    };

    const resultParams = paramsCreator(
      savedParams as RequestParams,
      badUrlParams as unknown as URLSearchParams
    );
    expect(resultParams.q).toEqual('query');
    expect(resultParams.limit).toEqual(PageLimitValue.fifty);
    expect(resultParams.page).toEqual('50');
    expect(resultParams.sort).toEqual(Sort.Oldest);
    expect(resultParams.details).toEqual('1');
  });
});
