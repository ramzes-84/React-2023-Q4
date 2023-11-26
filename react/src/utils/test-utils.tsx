import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { AnyAction, Store } from "@reduxjs/toolkit";

export function Wrapper(props: { children: ReactNode }) {
  return (
    <Provider store={store as unknown as Store<unknown, AnyAction>}>
      {props.children}
    </Provider>
  );
}

const handlers = [
  http.get("https://content.guardianapis.com/search", () => {
    return new HttpResponse("Not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }),
];

export const server = setupServer(...handlers);
