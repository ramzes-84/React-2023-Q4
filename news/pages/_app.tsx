import { Navigation } from "@/components/navigation";
import { store, wrapper } from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { default as AbortController } from "abort-controller";

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
  AbortController,
});

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
