import { getRequest } from "./common";

export const requestStorePhoto = (query) =>
  getRequest("/api/generate/google-photo", query);
