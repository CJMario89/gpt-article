export const getSpotsPromptText = ({ city, spots = [] }) => {
  return {
    text: `Give me three spots that most people travel in ${city} that observe the following rules
1. return in an array (JS array with square brackets and double quotes, e.x. ["a", "b", "c"])
2. without any other text`,
    tokensDecrease: spots,
  };
};

export const getCitiesPromptText = ({ country, cities = [] }) => {
  return {
    text: `Give me three resort city in ${country} that observe the following rules
1. return in an array (JS array with square brackets and double quotes, e.x. ["a", "b", "c"])
2. without any other text`,
    tokensDecrease: cities,
  };
};

export const getArticlePromptText = ({ place }) => {
  return `Please produce a popular traveling article about '${place}' with following rules:
1. return in markdown form which can be parsed by markdown.js
2. without image
3. without gpt hint commentary`;
};
