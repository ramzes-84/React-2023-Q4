import Link from "next/link";
import Image from "next/image";
import { skipToken } from "@reduxjs/toolkit/query";
import { Spinner } from "./spinner";
import { CloseBtn } from "./close-btn";
import { useRouter } from "next/dist/client/router";
import { wrapper } from "../store/store";
import {
  getArticle,
  getRunningQueriesThunk,
  useGetArticleQuery,
} from "../service/newsApi";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.resolvedUrl;
    if (typeof id === "string") {
      const cuttedId = id.replace("article/", "").replace("split/", "");
      store.dispatch(getArticle.initiate(cuttedId));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export const SingleView = () => {
  const router = useRouter();
  const id = router.pathname;
  const result = useGetArticleQuery(typeof id === "string" ? id : skipToken, {
    skip: router.isFallback,
  });
  const { isLoading, data } = result;
  return (
    <>
      {isLoading && <Spinner />}
      <Link href={"/"}>
        <CloseBtn />
      </Link>
      {data && (
        <article className="flex flex-col items-center p-3 max-w-4xl mx-auto">
          <h1 className="underline-offset-1	m-2 text-center	text-sky-900 font-extrabold	text-xl">
            {data.webTitle}
          </h1>
          <p>
            Date:
            {`${new Date(data.webPublicationDate).getFullYear()}-${
              new Date(data.webPublicationDate).getMonth() + 1
            }-${new Date(data.webPublicationDate).getDate()}`}
          </p>
          <Image
            src={data.fields.thumbnail || "/no-image.png"}
            width={420}
            height={250}
            alt={data.webTitle}
          />
          <div
            className="overflow-hidden"
            dangerouslySetInnerHTML={{ __html: data.fields.body }}
          />
        </article>
      )}
    </>
  );
};
