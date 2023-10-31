import { getRequest, postRequest } from "./common";

export const getCountries = () => getRequest(`/api/sql-query/get-countries`);
export const getCities = (query) =>
  getRequest(`/api/sql-query/get-cities`, query);
export const getCityArticle = (query) =>
  getRequest(`/api/sql-query/get-city-article`, query);
export const postCities = (body) =>
  postRequest(`/api/sql-query/post-cities`, body);
export const updateArticleStatus = (body) =>
  postRequest(`/api/sql-query/update-article-status`, body);
export const updateArticle = (body) =>
  postRequest(`/api/sql-query/update-article`, body);
export const postArticles = (body) =>
  postRequest(`/api/sql-query/post-articles`, body);
