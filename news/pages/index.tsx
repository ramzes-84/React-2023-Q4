import { ErrorThrower } from "@/components/error-thrower";
import { NewsSection } from "@/components/news-section";
import { Search } from "@/components/search";
import { newsApi } from "@/service/newsApi";
import { newsLoaderSlice } from "@/store/loaders-slice";
import { newsSlice } from "@/store/news-slice";
import { RootState } from "@/store/store";
import { totalPagesSlice } from "@/store/total-pages-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const params = useSelector((state: RootState) => state.params.value);
  const { data, isLoading } = newsApi.useGetNewsQuery(params);
  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  useEffect(() => {
    if (errorMsg) throw new Error(errorMsg);
  });

  useEffect(() => {
    if (data) {
      dispatch(totalPagesSlice.actions.updateTotalPages(data.pages));
      dispatch(newsSlice.actions.updateNews(data.results));
    }
    dispatch(newsLoaderSlice.actions.isLoadingNews(isLoading));
  }, [data, dispatch, isLoading]);

  return (
    <section className="flex flex-col items-stretch">
      <Search />
      <NewsSection />
      <ErrorThrower cb={() => setErrorMsg("Manually envoked error")} />
    </section>
  );
}
