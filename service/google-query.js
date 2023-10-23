import { getRequest } from "./common";

export const requestGoogleMapPhotoQuery = (query) =>
  getRequest("/api/request-google-map-photo", query);
