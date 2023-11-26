import { expect, it, describe } from "vitest";
import { articleLoaderSlice, newsLoaderSlice } from "./loaders-slice";

describe("News loader slice testing", () => {
  it("Should return the initial state", () => {
    expect(newsLoaderSlice.reducer(undefined, { type: undefined })).toEqual({
      value: true,
    });
  });

  it("Should handle a value being updated", () => {
    const previousState = { value: false };

    expect(
      newsLoaderSlice.reducer(
        previousState,
        newsLoaderSlice.actions.isLoadingNews(true)
      )
    ).toEqual({ value: true });
  });
});

describe("Article loader slice testing", () => {
  it("Should return the initial state", () => {
    expect(articleLoaderSlice.reducer(undefined, { type: undefined })).toEqual({
      value: true,
    });
  });

  it("Should handle a value being updated", () => {
    const previousState = { value: false };

    expect(
      articleLoaderSlice.reducer(
        previousState,
        articleLoaderSlice.actions.isLoadingArticle(true)
      )
    ).toEqual({ value: true });
  });
});
