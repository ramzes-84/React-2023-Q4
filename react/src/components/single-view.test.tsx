import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SingleView } from "./single-view";

vi.mock("react-router-dom", async () => {
  const component = await vi.importActual("react-router-dom");
  return {
    ...(component as object),
    Link: vi.fn(),
    useParams: vi.fn().mockReturnValue({ ["*"]: "url/params" }),
  };
});

vi.mock("react", async () => {
  const component = await vi.importActual("react");
  return {
    ...(component as object),
    useEffect: vi.fn(),
    useRef: vi.fn(),
  };
});

vi.mock("react-redux");

vi.mock("./spinner", () => {
  return {
    Spinner: vi.fn().mockReturnValue(<div>Spinner</div>),
  };
});

vi.mock("../service/newsApi", () => {
  return {
    newsApi: {
      useGetArticleQuery: vi
        .fn()
        .mockReturnValueOnce({ data: false, isError: false, isLoading: true })
        .mockReturnValueOnce({ data: false, isError: true, isLoading: false })
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
    },
  };
});

describe("SingleView component", () => {
  it("Check that a loading indicator is displayed while fetching data", () => {
    render(<SingleView />);

    const spinner = screen.getByText("Spinner");

    expect(spinner).toBeInTheDocument();
  });

  it("Check that error message is displayed on fetch error", () => {
    render(<SingleView />);

    const errorMsg = screen.getByText(
      "Something wrong with the server, try again later, please."
    );

    expect(errorMsg).toBeInTheDocument();
  });

  it("Check that article is displayed on success fetch", () => {
    render(<SingleView />);

    const title = screen.getByText("webTitle");
    const body = screen.getByText("body");

    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });
});
