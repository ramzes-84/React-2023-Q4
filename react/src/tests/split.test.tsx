import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../pages/split/[...id]";
import { Provider } from "react-redux";
import { store } from "../store/store";

vi.mock("../components/single-view", () => {
  return {
    SingleView: vi.fn().mockReturnValue(<div>Single view</div>),
  };
});

vi.mock("../components/news-section", () => {
  return {
    NewsSection: vi.fn().mockReturnValue(<div>News section</div>),
  };
});

vi.mock("next/router", () => ({
  useRouter() {
    return {
      query: { id: ["id", "id"] },
    };
  },
}));

describe("Split view component", () => {
  it("Should render content", () => {
    render(
      <Provider store={store()}>
        <Page />
      </Provider>
    );

    const article = screen.getByText("News section");

    expect(article).toBeInTheDocument();
  });
});
