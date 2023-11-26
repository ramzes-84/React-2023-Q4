import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleCard } from "./article-card";
import { articleResponse } from "../utils/test-data";

vi.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "id",
    };
  },
}));

describe("ArticleCard component", () => {
  it("Ensure that the card component renders the relevant card data", () => {
    render(<ArticleCard article={articleResponse} />);

    const btn = screen.getByText("🌐");
    const webTitle = screen.getByText("webTitle");
    const trailText = screen.getByText("Follow live");

    expect(btn).toBeInTheDocument();
    expect(webTitle).toBeInTheDocument();
    expect(trailText).toBeInTheDocument();
  });

  it("Validate that NO IMAGE is shown", () => {
    articleResponse.fields.thumbnail = "";
    render(<ArticleCard article={articleResponse} />);
    const img: HTMLImageElement = screen.getByRole("img");

    expect(img).toBeInTheDocument();
    expect(img.src).toEqual(
      "http://localhost:3000/_next/image?url=%2Fno-image.png&w=640&q=75"
    );
  });
});
