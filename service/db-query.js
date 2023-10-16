export const getCountries = () => fetch(`/api/sql-query/get-countries`);
export const getCities = ({ country }) =>
  fetch(`/api/sql-query/get-cities?${new URLSearchParams({ country })}`);
export const postCities = ({ country, cities }) =>
  fetch(`/api/sql-query/post-cities`, {
    method: "POST",
    body: JSON.stringify({
      country,
      cities,
    }),
  });
export const postArticles = ({ country, cities, articles }) =>
  fetch(`/api/sql-query/post-articles`, {
    method: "POST",
    body: JSON.stringify({
      country,
      cities,
      articles,
    }),
  });
