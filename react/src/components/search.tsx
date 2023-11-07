import { ChangeEvent, useContext, useState } from 'react';
import {
  AppContextType,
  AppUrlParams,
  PageLimitValue,
  RequestParams,
  Sort,
} from '../types';
import { AppContext } from '../App';

export function Search() {
  const { params, setParams } = useContext(
    AppContext
  ) as unknown as AppContextType;
  const [itemsPerPage, setItemsPerPage] = useState<PageLimitValue>(
    params.limit
  );
  const handleLimitChanging = (e: ChangeEvent<HTMLSelectElement>) => {
    const newParams = {
      ...params,
      limit: e.target.value as PageLimitValue,
      page: '1',
    };
    setParams(newParams);
    setItemsPerPage(e.target.value as PageLimitValue);
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
      setParams(newParams);
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
          onChange={handleLimitChanging}
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
          defaultValue={params.sort}
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
