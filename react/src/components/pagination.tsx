import { RequestParams } from '../types';

interface PaginationProps {
  params: RequestParams;
  paramsCallback: (params: RequestParams) => void;
}

export function Pagination({ params, paramsCallback }: PaginationProps) {
  const btnClassDisabled = `p-2 m-2 rounded-2xl text-white bg-slate-500 ${
    +params.page === 1 ? 'disabled:opacity-75 cursor-not-allowed' : ''
  }`;
  function handleNextPage() {
    const newPage = (+params.page + 1).toString();
    const newConfig = { ...params, page: newPage };
    paramsCallback(newConfig);
  }

  function handlePrevPage() {
    if (+params.page < 2) return;
    const newPage = (+params.page - 1).toString();
    const newConfig = { ...params, page: newPage };
    paramsCallback(newConfig);
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        className={btnClassDisabled}
        onClick={handlePrevPage}
        disabled={+params.page === 1}
      >
        Previous page
      </button>
      <input
        type="button"
        form="searchForm"
        className="inline-block text-lg"
        name="page"
        value={params.page}
      />
      <button
        className="p-2 m-2 rounded-2xl bg-slate-500 text-white"
        onClick={handleNextPage}
      >
        Next page
      </button>
    </div>
  );
}
