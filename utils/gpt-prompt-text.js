export const getSpotsPromptText = ({ city, spots = [] }) => {
  return `Please list three spots that most people travel in ${city} with following rules:
1. return in an array (JS array with square brackets and double quotes, e.x. ["a", "b", "c"])
2. without any other text
${
  spots.length
    ? `3. the spots must not exist in following array [${spots
        .map((spot) => `"${spot}"`)
        .join(",")}]`
    : ""
}`;
};

export const getCitiesPromptText = ({ country, cities = [] }) => {
  return `list: ${
    cities.length ? `[${cities.map((city) => `"${city}"`).join(",")}]` : ""
  }
Give me three cities in ${country} that are not in the list and observe the following rules
1. return in an array (JS array with square brackets and double quotes, e.x. ["a", "b", "c"])
2. without any other text`;
};

export const getArticlePromptText = ({ place }) => {
  return `Please produce a popular traveling article about '${place}' with following rules:
1. return in markdown form which can be parsed by markdown.js
2. without image
3. without gpt hint commentary`;
};
