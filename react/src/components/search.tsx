import { AppUrlParams, RequestParams } from '../types';

interface SearchProps {
  params: RequestParams;
  paramsCallback: (params: RequestParams) => void;
}

export function Search({ params, paramsCallback }: SearchProps) {
  return (
    <section className="rounded-2xl bg-slate-500 text-white m-2 p-2">
      <form
        id="searchForm"
        className="flex justify-center gap-2 flex-wrap"
        onSubmit={(e) => {
          e.preventDefault();
          const formValues = new FormData(e.target as HTMLFormElement);
          if (
            formValues.has(AppUrlParams.Limit) &&
            formValues.has(AppUrlParams.Query) &&
            formValues.has(AppUrlParams.Sort) &&
            formValues.has(AppUrlParams.Page)
          ) {
            const newParams: RequestParams = {
              limit: formValues.get(AppUrlParams.Limit) as string,
              q: formValues.get(AppUrlParams.Query) as string,
              sort: formValues.get(AppUrlParams.Sort) as string,
              page: formValues.get(AppUrlParams.Page) as string,
            };
            paramsCallback(newParams);
          } else throw new Error('The form isn`t complete');
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
          defaultValue={params.limit}
        >
          <option value="10">10 items per page</option>
          <option value="20">20 items per page</option>
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
