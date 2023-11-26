import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CloseBtn } from "./close-btn";

describe("CloseBtn component", () => {
  it('Should render the button with label "Close"', () => {
    render(<CloseBtn />);

    const input = screen.getByRole("button");
    const button = screen.getByText("Close");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
