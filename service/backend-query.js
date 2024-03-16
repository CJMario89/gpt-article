import { getRequest, postRequest } from "./common";

export const getAllPlaces = (query) => getRequest(`/api/get/all-places`, query);

export const getArticle = (query) => getRequest(`/api/get/article`, query);
export const postPlaces = (body) => postRequest(`/api/post/places`, body);
export const getSearch = (query) => getRequest(`/api/get/search`, query);
export const getCities = (query) => getRequest(`/api/get/cities`, query);
export const getSpots = (query) => getRequest(`/api/get/spots`, query);
export const getNearPlaces = (query) =>
  getRequest(`/api/get/near-places`, query);
export const getPrefectures = (query) =>
  getRequest(`/api/get/prefectures`, query);
export const postArticle = (body) => postRequest(`/api/post/article`, body);
export const batchGenerate = (body) =>
  postRequest(`/api/post/batch-generate`, body);
export const batchGenerateJapan = (body) =>
  postRequest(`/api/post/batch-generate-japan`, body);
export const getPlacesWithTranslation = (query) =>
  getRequest(`/api/get/places-with-translation`, query);
