import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../pages";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ErrorBoundary } from "../components/error-boundary";

vi.mock("../components/news-section", () => {
  return {
    NewsSection: vi.fn().mockReturnValue(<div>News section</div>),
  };
});

describe("App component", () => {
  it("", () => {
    render(
      <ErrorBoundary>
        <Provider store={store()}>
          <Home />
        </Provider>
      </ErrorBoundary>
    );

    const input = screen.getByRole("textbox");
    const searchBtn = screen.getByText("Search");
    const errBtn = screen.getByText("Throw error");

    expect(input).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    fireEvent.click(errBtn);

    const errMsg = screen.getByText("There is an error in application...");
    expect(errMsg).toBeInTheDocument();
  });
});
