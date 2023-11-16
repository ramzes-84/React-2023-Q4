import { ChangeEvent, useState } from 'react';
import { AppUrlParams, PageLimitValue, RequestParams, Sort } from '../types';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { paramsSlice } from '../store/params-slice';

export function Search() {
  const dispatch = useDispatch();
  const params = useSelector((state: RootState) => state.params.value);
  const [sorting, setSorting] = useState<Sort>(params.sort);
  const [itemsPerPage, setItemsPerPage] = useState<PageLimitValue>(
    params.limit
  );

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newParams = {
      ...params,
      [e.target.name]: e.target.value,
      page: '1',
    };
    switch (e.target.name) {
      case AppUrlParams.Limit:
        setItemsPerPage(e.target.value as PageLimitValue);
        break;
      case AppUrlParams.Sort:
        setSorting(e.target.value as Sort);
        break;
    }
    dispatch(paramsSlice.actions.updateParams(newParams));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.target as HTMLFormElement);
    if (
      formValues.has(AppUrlParams.Limit) &&
      formValues.has(AppUrlParams.Query) &&
      formValues.has(AppUrlParams.Sort)
    ) {
      const newParams: RequestParams = {
        limit: formValues.get(AppUrlParams.Limit) as PageLimitValue,
        q: formValues.get(AppUrlParams.Query) as string,
        sort: formValues.get(AppUrlParams.Sort) as Sort,
        page: '1',
      };
      dispatch(paramsSlice.actions.updateParams(newParams));
    } else throw new Error('The form isn`t complete');
  };

  return (
    <section className="rounded-2xl bg-slate-500 text-white m-2 p-2">
      <form
        className="flex justify-center gap-2 flex-wrap"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          placeholder="crocodile?"
          className="text-black px-1 rounded"
          type="text"
          name="q"
          defaultValue={params.q}
        />
        <select
          className="text-black px-1 rounded"
          name="limit"
          value={itemsPerPage}
          onChange={handleSelectChange}
        >
          <option value="10">10 items per page</option>
          <option value="20">20 items per page</option>
          <option value="30">30 items per page</option>
          <option value="40">40 items per page</option>
          <option value="50">50 items per page</option>
        </select>
        <select
          className="text-black px-1 rounded"
          name="sort"
          value={sorting}
          onChange={handleSelectChange}
        >
          <option value="newest">Show newest first</option>
          <option value="oldest">Show oldest first</option>
          <option value="relevance">Sort by relevance</option>
        </select>
        <input type="submit" value="Search" />
      </form>
    </section>
  );
}
