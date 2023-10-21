import { getRequest } from "./common";

export const gptQuery = (query) => getRequest(`/api/request-gpt`, query);
export const dalle2Query = (query) => getRequest(`/api/request-dalle2`, query);
