import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ErrorBoundary } from "../components/error-boundary";
import { Navigation } from "../components/navigation";
import { wrapper } from "../store/store";

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
