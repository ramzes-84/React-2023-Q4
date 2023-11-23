import {
  getArticle,
  getRunningQueriesThunk,
  useGetArticleQuery,
} from "@/service/newsApi";
import { wrapper } from "@/store/store";
import { Spinner } from "./spinner";
import Link from "next/link";
import { CloseBtn } from "./close-btn";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = (context.params?.id as string[]).join("/");
    store.dispatch(getArticle.initiate(id));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export const SingleView = () => {
  const router = useRouter();
  const id = (router.query.id as string[]).join("/");
  const result = useGetArticleQuery(id, {
    skip: router.isFallback,
  });
  const { isLoading, error, data } = result;
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
