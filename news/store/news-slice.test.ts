import { expect, it, describe } from 'vitest';
import { newsSlice } from './news-slice';
import { articleResponse } from '../utils/test-data';

describe('News slice testing', () => {
  it('Should return the initial state', () => {
    expect(newsSlice.reducer(undefined, { type: undefined })).toEqual({
      news: [],
    });
  });

  it('Should handle a value updating', () => {
    const previousState = { news: [] };

    expect(
      newsSlice.reducer(
        previousState,
        newsSlice.actions.updateNews([articleResponse])
      ).news[0].id
    ).toEqual('id');
  });
});
