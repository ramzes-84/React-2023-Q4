import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorThrower } from "./error-thrower";

describe("ErrorThrower component", () => {
  it("Should render the button for throwing errors", () => {
    render(<ErrorThrower cb={() => {}} />);

    const btn = screen.getByText("Throw error");
    expect(btn).toBeInTheDocument();
  });
});
