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

// vi.mock("../service/newsApi", async () => {
//   const actual = await vi.importActual("../service/newsApi");
//   return {
//     ...(actual as object),
//     useGetArticleQuery: vi
//       .fn()
//       .mockReturnValueOnce({ data: false, isError: false, isLoading: true })
//       .mockReturnValue({
//         data: {
//           id: "id",
//           webPublicationDate: "2023-11-10T03:39:59Z",
//           webTitle: "webTitle",
//           fields: {
//             headline: "headline",
//             trailText: "Follow live",
//             thumbnail: "https://test.com/",
//             body: "body",
//           },
//         },
//         isError: false,
//         isLoading: false,
//       }),
//   };
// });

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

  // it("Check that article is displayed on success fetch", () => {
  //   render(<SingleView />);

  //   const title = screen.getByText("webTitle");
  //   const body = screen.getByText("body");

  //   expect(title).toBeInTheDocument();
  //   expect(body).toBeInTheDocument();
  // });
});
