import { getRequest } from "./common";

export const gptQuery = (query) => getRequest(`/api/generate/gpt`, query);
export const dalle2Query = (query) => getRequest(`/api/generate/dalle2`, query);
