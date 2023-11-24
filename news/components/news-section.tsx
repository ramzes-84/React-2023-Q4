import { ArticleCard } from "./article-card";
import { Spinner } from "./spinner";
import { Pagination } from "./pagination";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RootState, wrapper } from "@/store/store";
import { AppUrlParams, PageLimitValue, Sort } from "@/utils/types";
import {
  getNews,
  getRunningQueriesThunk,
  useGetNewsQuery,
} from "@/service/newsApi";
import { useRouter } from "next/dist/client/router";
import { useAppSelector } from "@/store/hooks";
import { SingleView } from "./single-view";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
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
  const router = useRouter();
  const result = useGetNewsQuery(
    {
      [AppUrlParams.Details]: "0",
      [AppUrlParams.Limit]: PageLimitValue.ten,
      [AppUrlParams.Page]: "1",
      [AppUrlParams.Query]: "",
      [AppUrlParams.Sort]: Sort.Newest,
    },
    {
      skip: router.isFallback,
    }
  );

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
