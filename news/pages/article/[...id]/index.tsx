import { CloseBtn } from "@/components/close-btn";
import { ApiService } from "@/service/apiService";
import { Article, ArticleResponse } from "@/utils/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export const getServerSideProps = async (context: {
  params: { id: string[] };
}) => {
  if (context.params?.id instanceof Array) {
    const data = await new ApiService().getCurrentArticle(
      context.params.id.join("/")
    );
    return { props: { data } };
  } else throw new Error("Fetch failed");
};

export default function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Link href={"/"}>
        <CloseBtn />
      </Link>
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
    </>
  );
}
