import { ChangeEvent } from "react";
import { AppUrlParams, PageLimitValue, RequestParams, Sort } from "../types";
import { useRouter } from "next/router";

export function Search() {
  const router = useRouter();
  const queryParams = router.query as RequestParams;

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newParams = {
      ...queryParams,
      [e.target.name]: e.target.value,
      page: "1",
    };
    router.push(
      `?${AppUrlParams.Details}=0&${AppUrlParams.Limit}=${newParams.limit}&${AppUrlParams.Page}=${newParams.page}&${AppUrlParams.Query}=${newParams.q}&${AppUrlParams.Sort}=${newParams.sort}`
    );
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
        page: "1",
        details: "0",
      };
      router.push(
        `?${AppUrlParams.Details}=0&${AppUrlParams.Limit}=${newParams.limit}&${AppUrlParams.Page}=${newParams.page}&${AppUrlParams.Query}=${newParams.q}&${AppUrlParams.Sort}=${newParams.sort}`
      );
    } else throw new Error("The form isn`t complete");
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
          defaultValue={queryParams.q}
        />
        <select
          className="text-black px-1 rounded"
          name="limit"
          defaultValue={queryParams.limit}
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
          defaultValue={queryParams.sort}
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
