export const gptQuery = (text) =>
  fetch(`/api/request-gpt?${new URLSearchParams({ text })}`);
