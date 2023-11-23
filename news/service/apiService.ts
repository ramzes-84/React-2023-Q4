import {
  RequestParams,
  Article,
  NewsResponse,
  ArticleInCatalog,
} from "@/utils/types";

const API_KEY = "b0706de8-b3da-4a9b-ac07-af4a3fec399a";
const NEWS_ENDPOINT = "https://content.guardianapis.com/search";
const ARTICLE_ENDPOINT = "https://content.guardianapis.com/";

export class ApiService {
  public async getNews(
    params: RequestParams
  ): Promise<NewsResponse<ArticleInCatalog[]>> {
    const url = `${NEWS_ENDPOINT}?q=${params.q}&order-by=${params.sort}&page-size=${params.limit}&page=${params.page}&api-key=${API_KEY}&show-fields=all`;
    const response = await fetch(url);
    if (response.status === 200) {
      const resFromJSON = await response.json();
      return resFromJSON.response;
    }
    throw new Error("There is something wrong with the server!");
  }

  public async getCurrentArticle(id: string): Promise<Article> {
    const url = `${ARTICLE_ENDPOINT}${id}?api-key=${API_KEY}&show-fields=all`;
    console.log(url);
    const response = await fetch(url);
    if (response.status === 200) {
      const resFromJSON = await response.json();
      return resFromJSON.response.content;
    }
    throw new Error("There is something wrong with the server!");
  }
}
