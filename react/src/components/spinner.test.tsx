import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./spinner";

describe("Spinner component", () => {
  it("Should render the spinner image", () => {
    render(<Spinner />);

    const img = screen.getByAltText("Loading...");
    expect(img).toBeInTheDocument();
  });
});
