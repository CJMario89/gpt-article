export const getSpotsPromptText = ({ city, spots = [] }) => {
  return `Please list three spots that most people travel in ${city} with following rules:
1. return in an array (JS array with square brackets and double quotes, e.x. ["a", "b", "c"])
2. without any other text
${spots.length ? `3. spots not in [${spots}]` : ""}`;
};

export const getCitiesPromptText = ({ country, cities = [] }) => {
  return `Please list three resort cities of ${country} with following rules:
1. return in an array (JS array with square brackets and double quotes, e.x. ["a", "b", "c"])
2. without any other text
${cities.length ? `3. cities not in [${cities}]` : ""}`;
};

export const getArticlePromptText = ({ place }) => {
  return `Please produce a popular traveling article about '${place}' with following rules:
1. return in markdown form which can be parsed by markdown.js
2. without image
3. without gpt hint commentary`;
};
