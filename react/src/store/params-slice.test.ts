import { expect, it, describe } from 'vitest';
import { paramsSlice } from './params-slice';
import { AppUrlParams, PageLimitValue, RequestParams, Sort } from '../types';
import { testParams } from '../utils/test-data';

describe('Params store slice testing', () => {
  it('Should return the initial state', () => {
    expect(paramsSlice.reducer(undefined, { type: undefined })).toEqual({
      value: testParams,
    });
  });

  it('Should store a new value', () => {
    const previousState = { value: testParams };

    const updatedParams = paramsSlice.reducer(
      previousState as { value: RequestParams },
      paramsSlice.actions.updateParams({
        [AppUrlParams.Details]: '0',
        [AppUrlParams.Limit]: PageLimitValue.ten,
        [AppUrlParams.Page]: '1',
        [AppUrlParams.Query]: 'test word',
        [AppUrlParams.Sort]: Sort.Newest,
      })
    );

    expect(updatedParams.value.q).toEqual('test word');
  });
});
