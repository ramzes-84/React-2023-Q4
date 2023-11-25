import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { newsApi } from "../../../service/newsApi";
import { useAppDispatch } from "../../../store/hooks";
import { totalPagesSlice } from "../../../store/total-pages-slice";
import { newsSlice } from "../../../store/news-slice";
import { newsLoaderSlice } from "../../../store/loaders-slice";
import { Search } from "../../../components/search";
import { ErrorThrower } from "../../../components/error-thrower";
import { NewsSection } from "../../../components/news-section";
import { StorageValues } from "../../../types";

export default function Home() {
  const params = useSelector((state: RootState) => state.params.value);
  const { data, isLoading } = newsApi.useGetNewsQuery(params);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    localStorage.setItem(StorageValues.Settings, JSON.stringify(params));
  }, [params]);

  return (
    <section className="flex flex-col items-stretch">
      <Search />
      <NewsSection />
      <ErrorThrower cb={() => setErrorMsg("Manually envoked error")} />
    </section>
  );
}
