import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SingleView } from "./single-view";

vi.mock("./spinner", () => {
  return {
    Spinner: vi.fn().mockReturnValue(<div>Spinner</div>),
  };
});

vi.mock("next/dist/client/router", () => ({
  useRouter() {
    return {
      query: { id: ["id", "id"] },
    };
  },
}));

vi.mock("../service/newsApi", async () => {
  const actual = await vi.importActual("../service/newsApi");
  return {
    ...(actual as object),
    useGetArticleQuery: vi
      .fn()
      .mockReturnValueOnce({ data: false, isError: false, isLoading: true })
      .mockReturnValue({
        data: {
          id: "id",
          webPublicationDate: "2023-11-10T03:39:59Z",
          webTitle: "webTitle",
          fields: {
            headline: "headline",
            trailText: "Follow live",
            thumbnail: "https://test.com/",
            body: "body",
          },
        },
        isError: false,
        isLoading: false,
      }),
  };
});

describe("SingleView component", () => {
  it("Check that a loading indicator is displayed while fetching data", () => {
    render(<SingleView />);

    const spinner = screen.getByText("Spinner");

    expect(spinner).toBeInTheDocument();
  });

  it("Check that article is displayed on success fetch", () => {
    render(<SingleView />);

    const title = screen.getByText("webTitle");
    const body = screen.getByText("body");

    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });
});
