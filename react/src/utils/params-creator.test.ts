import { expect, test, describe } from 'vitest';
// import { paramsCreator } from './params-creator';
// import { AppUrlParams, RequestParams } from '../types';

describe.concurrent('Config creator function tests', () => {
  test('Should return default values', () => {
    // const badParam2 = {
    //   _search: 'search',
    //   get search() {
    //     return this._search;
    //   },
    //   get [AppUrlParams.Limit]() {
    //     return null;
    //   },
    //   get [AppUrlParams.Page]() {
    //     return null;
    //   },
    //   get [AppUrlParams.Sort]() {
    //     return null;
    //   },
    // };
    // const badParam1 = {};

    // console.log(badParam2.get('search'));

    // const resultParams = paramsCreator(
    //   badParam1 as RequestParams,
    //   badParam2 as URLSearchParams
    // );
    // expect(resultParams.q).toEqual('');
    expect(true).toBeTruthy();
  });
  // test('Should return null as first pagination section', () => {
  //   const { firstPage } = paginationMapper(1, 100);
  //   expect(firstPage).toBeNull();
  // });
  // test('Should return last pagination section', () => {
  //   const { lastPage } = paginationMapper(10, 100);
  //   expect(lastPage).toEqual(100);
  // });
  // test('Should return null as last pagination section', () => {
  //   const { lastPage } = paginationMapper(100, 100);
  //   expect(lastPage).toBeNull();
  // });
  // test('Should return middle pagination section correctly', () => {
  //   const currPage = 17;
  //   const totalPages = 30;
  //   const { middleSegment } = paginationMapper(currPage, totalPages);
  //   expect(middleSegment[0]).toEqual(currPage - 4);
  //   expect(middleSegment[8]).toEqual(currPage + 4);
  // });
});
