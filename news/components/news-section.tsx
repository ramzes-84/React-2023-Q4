import { ArticleCard } from "./article-card";
import { Spinner } from "./spinner";
import { Pagination } from "./pagination";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RootState } from "@/store/store";
import { AppUrlParams } from "@/utils/types";

export function NewsSection() {
  const detailsFlag = !!useSearchParams().get(AppUrlParams.Details);
  const isLoading = useSelector((state: RootState) => state.newsLoader.value);
  const data = useSelector((state: RootState) => state.news.news);

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
            {detailsFlag && <div>Sidebar</div>}
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
