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
  useSearchParams: vi.fn().mockReturnValue({
    get: vi.fn().mockReturnValue("0"),
  }),
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
