import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pagination } from "./pagination";

vi.mock("react-redux", () => {
  return {
    useSelector: vi.fn().mockReturnValue(100),
    useDispatch: vi.fn(),
  };
});
vi.mock("../utils/pagination-mapper", () => {
  return {
    paginationMapper: vi
      .fn()
      .mockReturnValueOnce({
        firstPage: 1,
        middleSegment: [6],
        lastPage: 100,
      })
      .mockReturnValueOnce({
        firstPage: null,
        middleSegment: [1, 2, 3],
        lastPage: 100,
      })
      .mockReturnValueOnce({
        firstPage: 1,
        middleSegment: [99, 100],
        lastPage: null,
      }),
  };
});

describe("Pagination component", () => {
  it("Should render three segments of buttons if provided", () => {
    render(<Pagination />);

    const startSegment = screen.getByText("1");
    const endSegment = screen.getByText("100");
    const middleSegment = screen.getByText("6");

    expect(startSegment).toBeInTheDocument();
    expect(endSegment).toBeInTheDocument();
    expect(middleSegment).toBeInTheDocument();
  });

  it("Should render middle & last segments of buttons on the first page", () => {
    render(<Pagination />);

    const buttons = screen.getAllByRole("button");

    expect(buttons.length).toEqual(4);
  });

  it("Should render first & middle segments of buttons on the last page", () => {
    render(<Pagination />);

    const buttons = screen.getAllByRole("button");

    expect(buttons.length).toEqual(3);
  });
});
