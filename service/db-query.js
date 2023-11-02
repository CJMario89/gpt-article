import { getRequest, postRequest } from "./common";

export const getCountries = () => getRequest(`/api/get/countries`);
export const getCities = (query) => getRequest(`/api/get/cities`, query);
export const getCityArticle = (query) =>
  getRequest(`/api/get/city-article`, query);
export const postCities = (body) => postRequest(`/api/post/cities`, body);
export const postCityArticleStatus = (body) =>
  postRequest(`/api/post/city-article-status`, body);
export const postCityArticle = (body) =>
  postRequest(`/api/post/city-article`, body);
