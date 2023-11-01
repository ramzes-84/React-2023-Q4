import { ApiService } from '../service/apiService';
import { Article, ArticleInCatalog } from '../types';

export async function fetchNews() {
  const apiService = new ApiService();
  const newsArr: ArticleInCatalog[] = await apiService.getNews();
  return newsArr;
}

export async function fetchSingleArticle(id: string) {
  const apiService = new ApiService();
  const article: Article = await apiService.getCurrentArticle(id);
  return article;
}
