import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorPage } from "./error-page";

vi.mock("./navigation", () => {
  return { Navigation: vi.fn() };
});
vi.mock("react-router-dom", async () => {
  const component = await vi.importActual("react-router-dom");

  return {
    ...(component as object),
    useRouteError: vi.fn().mockReturnValue({ message: "Some error" }),
  };
});

describe("ErrorPage component", () => {
  it("Should content error page elements with info", () => {
    render(<ErrorPage />);

    const warning = screen.getByText("There is an error in application.");
    const img = screen.getByAltText("error");
    const recomendation = screen.getByText("Please go to Main to fix it.");

    expect(warning).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(recomendation).toBeInTheDocument();
  });
});
