import { SyntheticEvent, useContext } from 'react';
import { paginationMapper } from '../utils/pagination-mapper';
import { PagesBtn } from './page-button';
import { AppContext } from '../App';
import { AppContextType } from '../types';

export function Pagination() {
  const { params, setParams, totalPages } = useContext(
    AppContext
  ) as unknown as AppContextType;

  function handlePageChange(e: SyntheticEvent) {
    if (e.target instanceof HTMLInputElement) {
      const newPage = e.target.value;
      const newConfig = { ...params, page: newPage };
      setParams(newConfig);
    } else throw new Error('Clicked button is not an input');
  }

  const { firstPage, middleSegment, lastPage } = paginationMapper(
    +params.page,
    totalPages.current > 500 ? 500 : totalPages.current
  );

  const middleBtns = middleSegment.map((number) => (
    <PagesBtn key={number} num={number} handlePageChange={handlePageChange} />
  ));

  return (
    <div className="flex justify-center items-center gap-2">
      {firstPage && (
        <span>
          <PagesBtn num={firstPage} handlePageChange={handlePageChange} />
          ...
        </span>
      )}
      {middleBtns}
      {lastPage && (
        <span>
          ...
          <PagesBtn num={lastPage} handlePageChange={handlePageChange} />
        </span>
      )}
    </div>
  );
}
