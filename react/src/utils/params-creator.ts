import { RequestParams, AppUrlParams, PageLimitValue, Sort } from "../types";

export const paramsCreator = (urlParams: URLSearchParams): RequestParams => {
  const appParams = {
    [AppUrlParams.Query]: urlParams.get(AppUrlParams.Query) || "",
    [AppUrlParams.Limit]:
      urlParams.get(AppUrlParams.Limit) || PageLimitValue.ten,
    [AppUrlParams.Page]: urlParams.get(AppUrlParams.Page) || "1",
    [AppUrlParams.Sort]: urlParams.get(AppUrlParams.Sort) || Sort.Newest,
    [AppUrlParams.Details]: urlParams.get(AppUrlParams.Details) || "0",
  };
  return appParams as RequestParams;
};
