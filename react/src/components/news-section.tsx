import { ArticleCard } from "./article-card";
import { Spinner } from "./spinner";
import { Pagination } from "./pagination";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SingleView } from "./single-view";
import { useGetNewsQuery } from "../service/newsApi";
import { RequestParams } from "../types";
import { useRouter } from "next/router";

export function NewsSection() {
  const params = Object.fromEntries(useSearchParams().entries());
  const detailsFlag = params.details === "1";
  const router = useRouter();
  const result = useGetNewsQuery(params as RequestParams, {
    skip: router.isFallback,
  });
  const { isLoading, data } = result;

  if (isLoading) {
    return <Spinner />;
  }
  if (data?.results && data.results.length > 0) {
    const newsCards = data.results.map((article) => (
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
  } else if (data?.results && data.results.length === 0) {
    return (
      <main className="bg-yellow-200 p-6 mx-4 rounded-xl text-center">
        Nothing was found
      </main>
    );
  }
}
