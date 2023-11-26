import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../pages/article/[...id]";
import { Provider } from "react-redux";
import { store } from "../store/store";

vi.mock("next/dist/client/router", () => ({
  useRouter() {
    return {
      query: { id: ["id", "id"] },
    };
  },
}));

describe("Single article page", () => {
  it("Should render content", () => {
    render(
      <Provider store={store()}>
        <Page />
      </Provider>
    );

    const spinner = screen.getByAltText("Loading...");

    expect(spinner).toBeInTheDocument();
  });
});
