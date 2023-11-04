import { getRequest } from "./common";

export const requestStoreCityPhoto = (query) =>
  getRequest("/api/generate/google-photo", query);
