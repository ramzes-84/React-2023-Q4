import { ArticleCard } from "./article-card";
import { Spinner } from "./spinner";
import { Pagination } from "./pagination";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SingleView } from "./single-view";
import { AppStore, RootState, wrapper } from "../store/store";
import { getNews, getRunningQueriesThunk } from "../service/newsApi";
import { AppUrlParams, PageLimitValue, Sort } from "../types";
import { useAppSelector } from "../store/hooks";

export const getServerSideProps = wrapper.getServerSideProps(
  (store: AppStore) => async () => {
    store.dispatch(
      getNews.initiate({
        [AppUrlParams.Details]: "0",
        [AppUrlParams.Limit]: PageLimitValue.ten,
        [AppUrlParams.Page]: "1",
        [AppUrlParams.Query]: "",
        [AppUrlParams.Sort]: Sort.Newest,
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export function NewsSection() {
  const detailsFlag = !!useSearchParams().get(AppUrlParams.Details);
  const isLoading = useAppSelector(
    (state: RootState) => state.newsLoader.value
  );
  const data = useAppSelector((state: RootState) => state.news.news);

  if (isLoading) {
    return <Spinner />;
  }
  if (data && data.length > 0) {
    const newsCards = data.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ));
    return (
      <>
        <main className="flex flex-row relative">
          <section
            className={
              "flex flex-col gap-3 m-2 px-2 mx-auto " +
              (detailsFlag ? "max-w-[50%]" : "max-w-4xl")
            }
          >
            {newsCards}
          </section>
          <Link
            href={"/"}
            className={
              detailsFlag
                ? "absolute w-[50%] h-[100%] left-0 top-0 bg-slate-950/20 cursor-ew-resize"
                : "hidden"
            }
          />
          <section className={detailsFlag ? "w-[50%]" : "hidden"}>
            {detailsFlag && <SingleView />}
          </section>
        </main>
        <Pagination />
      </>
    );
  } else if (data && data.length === 0) {
    return (
      <main className="bg-yellow-200 p-6 mx-4 rounded-xl text-center">
        Nothing was found
      </main>
    );
  }
}
