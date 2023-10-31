import { getRequest } from "./common";

export const requestCityPhotoQuery = (query) =>
  getRequest("/api/new-city-photo", query);
