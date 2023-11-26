import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NewsSection } from "./news-section";
import { Provider } from "react-redux";
import { store } from "../store/store";

vi.mock("./spinner", () => {
  return {
    Spinner: vi.fn().mockReturnValue(<div>Spinner</div>),
  };
});

vi.mock("next/navigation", () => ({
  useSearchParams: vi
    .fn()
    .mockReturnValue({ entries: vi.fn().mockReturnValue([["details", "0"]]) }),
}));

vi.mock("../service/newsApi", async () => {
  const actual = await vi.importActual("../service/newsApi");
  return {
    ...(actual as object),
    useGetNewsQuery: vi.fn().mockReturnValue({ data: false, isLoading: true }),
  };
});

vi.mock("next/router", () => ({
  useRouter() {
    return {
      query: { id: ["id", "id"] },
    };
  },
}));

describe("NewsSection component", () => {
  it("Should show spinner on loading", () => {
    render(
      <Provider store={store()}>
        <NewsSection />
      </Provider>
    );

    const spinner = screen.getByText("Spinner");

    expect(spinner).toBeInTheDocument();
  });
});
