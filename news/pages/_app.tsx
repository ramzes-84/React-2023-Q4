import { Navigation } from "@/components/navigation";
import { store, wrapper } from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { default as AbortController } from "abort-controller";
import { ErrorBoundary } from "@/components/error-boundary";

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
  AbortController,
});

export function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Navigation />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
