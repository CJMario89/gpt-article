export const gptQuery = (text) =>
  fetch(`/api/request-gpt?${new URLSearchParams({ text })}`);
export const dalle2Query = (text) =>
  fetch(`/api/request-dalle2?${new URLSearchParams({ text })}`);
