import { getRequest, postRequest } from "./common";

export const getCountries = () => getRequest(`/api/get/countries`);
export const getAllPlaces = (query) => getRequest(`/api/get/all-places`, query);
export const getPlacesByParams = (query) =>
  getRequest(`/api/get/places-by-params`, query);
export const getArticle = (query) => getRequest(`/api/get/article`, query);
export const postPlaces = (body) => postRequest(`/api/post/places`, body);
export const postArticleStatus = (body) =>
  postRequest(`/api/post/article-status`, body);
export const postArticle = (body) => postRequest(`/api/post/article`, body);
export const postPhoto = (body) => postRequest(`/api/post/photo`, body);
export const batchGenerate = (body) =>
  postRequest(`/api/post/batch-generate`, body);