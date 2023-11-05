import { SyntheticEvent } from 'react';
import { RequestParams } from '../types';
import { paginationMapper } from '../utils/pagination-mapper';
import { PagesBtn } from './page-button';

interface PaginationProps {
  params: RequestParams;
  paramsCallback: (params: RequestParams) => void;
  totalPages: number;
}

export function Pagination({
  params,
  paramsCallback,
  totalPages,
}: PaginationProps) {
  function handlePageChange(e: SyntheticEvent) {
    if (e.target instanceof HTMLInputElement) {
      const newPage = e.target.value;
      const newConfig = { ...params, page: newPage };
      paramsCallback(newConfig);
    } else throw new Error('Clicked button is not an input');
  }

  const { firstPage, middleSegment, lastPage } = paginationMapper(
    +params.page,
    totalPages
  );

  const firstPageBtn = firstPage ? (
    <span>
      <PagesBtn num={firstPage} handlePageChange={handlePageChange} />
      ...
    </span>
  ) : null;

  const lastPageBtn = lastPage ? (
    <span>
      ...
      <PagesBtn num={lastPage} handlePageChange={handlePageChange} />
    </span>
  ) : null;

  const middleBtns = middleSegment.map((number) => (
    <PagesBtn key={number} num={number} handlePageChange={handlePageChange} />
  ));

  return (
    <div className="flex justify-center items-center gap-2">
      {firstPageBtn}
      {middleBtns}
      {lastPageBtn}
    </div>
  );
}
