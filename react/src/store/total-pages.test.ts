import { expect, it } from 'vitest';
import { totalPagesSlice } from './total-pages-slice';

it('should return the initial state', () => {
  expect(totalPagesSlice.reducer(undefined, { type: undefined })).toEqual({
    value: 1,
  });
});

it('should handle a value being added', () => {
  const previousState = { value: 1 };

  expect(
    totalPagesSlice.reducer(
      previousState,
      totalPagesSlice.actions.updateTotalPages(5)
    )
  ).toEqual({ value: 5 });
});
