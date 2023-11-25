import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../pages/article/[...id]";

vi.mock("../components/single-view", () => {
  return {
    SingleView: vi.fn().mockReturnValue(<div>Single view</div>),
  };
});

describe("Single article page", () => {
  it("Should render content", () => {
    render(<Page />);

    const article = screen.getByText("Single view");

    expect(article).toBeInTheDocument();
  });
});
