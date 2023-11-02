import { getRequest } from "./common";

export const requestCityPhotoQuery = (query) =>
  getRequest("/api/generate/google-photo", query);
