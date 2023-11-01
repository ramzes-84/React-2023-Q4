import { Sort } from '../types';

const API_KEY = 'b0706de8-b3da-4a9b-ac07-af4a3fec399a';
const NEWS_ENDPOINT = 'https://content.guardianapis.com/search';
const ARTICLE_ENDPOINT = 'https://content.guardianapis.com/';

export class ApiService {
  public async getNews(keyword: string = '') {
    const url = `${NEWS_ENDPOINT}?q=${keyword}&order-by=${Sort.Newest}&page-size=10&page=1&api-key=${API_KEY}&show-fields=all`;
    const response = await fetch(url);
    if (response.status === 200) {
      const resFromJSON = await response.json();
      return resFromJSON.response.results;
    }
    throw new Error('There is something wrong with the server!');
  }

  public async getCurrentArticle(id: string) {
    const url = `${ARTICLE_ENDPOINT}${id}?api-key=${API_KEY}&show-fields=all`;
    const response = await fetch(url);
    if (response.status === 200) {
      const resFromJSON = await response.json();
      return resFromJSON.response.content;
    }
    throw new Error('There is something wrong with the server!');
  }
}
