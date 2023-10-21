export const postRequest = (url, body) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
export const getRequest = (url, query) => {
  if (query) {
    return fetch(`${url}?${new URLSearchParams(query)}`);
  }
  return fetch(url);
};
