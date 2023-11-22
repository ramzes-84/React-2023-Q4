import { expect, test, describe } from 'vitest';
import { paginationMapper } from './pagination-mapper';

describe('Page mapping function tests', () => {
  test('Should return first pagination section', () => {
    const { firstPage } = paginationMapper(10, 100);
    expect(firstPage).toEqual(1);
  });
  test('Should return null as first pagination section', () => {
    const { firstPage } = paginationMapper(1, 100);
    expect(firstPage).toBeNull();
  });
  test('Should return last pagination section', () => {
    const { lastPage } = paginationMapper(10, 100);
    expect(lastPage).toEqual(100);
  });
  test('Should return null as last pagination section', () => {
    const { lastPage } = paginationMapper(100, 100);
    expect(lastPage).toBeNull();
  });
  test('Should return middle pagination section correctly', () => {
    const currPage = 17;
    const totalPages = 30;
    const { middleSegment } = paginationMapper(currPage, totalPages);
    expect(middleSegment[0]).toEqual(currPage - 4);
    expect(middleSegment[8]).toEqual(currPage + 4);
  });
});
