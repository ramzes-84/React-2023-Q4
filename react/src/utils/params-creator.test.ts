import { expect, it, describe, vi } from "vitest";
import { paramsCreator } from "./params-creator";
import { PageLimitValue, Sort } from "../types";

describe.concurrent("Config creator function tests", () => {
  it("Should return default values when LS & url search params not provided", () => {
    const badParam2 = {
      get: vi.fn(),
    };
    const resultParams = paramsCreator(badParam2 as unknown as URLSearchParams);
    expect(resultParams.q).toEqual("");
    expect(resultParams.limit).toEqual(PageLimitValue.ten);
    expect(resultParams.page).toEqual("1");
    expect(resultParams.sort).toEqual(Sort.Newest);
    expect(resultParams.details).toEqual("0");
  });

  it("Should return savedParams if provided", () => {
    const badUrlParams = {
      get: vi.fn().mockReturnValue("query"),
    };

    const resultParams = paramsCreator(
      badUrlParams as unknown as URLSearchParams
    );
    expect(resultParams.q).toEqual("query");
  });
});
