import { RequestParams, AppUrlParams, Sort, PageLimitValue } from '../types';

export const paramsCreator = (
  savedParams: RequestParams,
  urlParams: URLSearchParams
): RequestParams => {
  const appParams = {
    [AppUrlParams.Query]:
      urlParams.get(AppUrlParams.Query) || savedParams?.q || '',
    [AppUrlParams.Limit]:
      urlParams.get(AppUrlParams.Limit) ||
      (savedParams?.limit as PageLimitValue) ||
      PageLimitValue.ten,
    [AppUrlParams.Page]:
      urlParams.get(AppUrlParams.Page) || savedParams?.page || '1',
    [AppUrlParams.Sort]:
      urlParams.get(AppUrlParams.Sort) || savedParams?.sort || Sort.Newest,
  };
  return appParams as RequestParams;
};
