import { SyntheticEvent } from 'react';
import { paginationMapper } from '../utils/pagination-mapper';
import { PagesBtn } from './page-button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { paramsSlice } from '../store/params-slice';
import { newsLoaderSlice } from '../store/loaders-slice';

export function Pagination() {
  const dispatch = useDispatch();
  const totalPagesFromRedux = useSelector(
    (state: RootState) => state.totalPages.value
  );
  const params = useSelector((state: RootState) => state.params.value);

  function handlePageChange(e: SyntheticEvent) {
    if (e.target instanceof HTMLInputElement) {
      const newPage = e.target.value;
      const newConfig = { ...params, page: newPage };
      dispatch(newsLoaderSlice.actions.isLoadingNews(true));
      dispatch(paramsSlice.actions.updateParams(newConfig));
    } else throw new Error('Clicked button is not an input');
  }

  const { firstPage, middleSegment, lastPage } = paginationMapper(
    +params.page,
    totalPagesFromRedux > 500 ? 500 : totalPagesFromRedux
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
