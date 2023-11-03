import { RequestParams, AppUrlParams, Sort } from '../types';

export const paramsCreator = (
  savedParams: RequestParams,
  urlParams: URLSearchParams
): RequestParams => {
  const appParams = {
    [AppUrlParams.Query]:
      urlParams.get(AppUrlParams.Query) || savedParams?.q || '',
    [AppUrlParams.Limit]:
      urlParams.get(AppUrlParams.Limit) || savedParams?.limit || '10',
    [AppUrlParams.Page]:
      urlParams.get(AppUrlParams.Page) || savedParams?.page || '1',
    [AppUrlParams.Sort]:
      urlParams.get(AppUrlParams.Sort) || savedParams?.sort || Sort.Newest,
  };
  return appParams;
};
