export const getSpotsPromptText = ({ city, spots = [] }) => {
  return {
    text: `Give me three spots that most people travel in ${city} that observe the following rules
1. return in an array (JS array with square brackets and double quotes, e.x. ["a", "b", "c"])
2. without any other text`,
    tokensDecrease: spots,
  };
};

export const getCitySeoPromptText = ({ city, spots = [] }) => {
  return `Generate a SEO title and description on '${city}' about travling, with the spots provided, refer some famous spots.
Return in json format: {title: '...', description:'...'}
spots:
${spots.join("\n")}`;
};

export const getArticlePromptText = ({
  place,
  type,
  reviews,
  editorialSummary,
}) => {
  return `Generate a traveling blog on '${place}',
There are some reviews about people's feeling to the ${
    type ?? "place"
  }, please rephrase naturally throughout the content and please avoid using any words from the reviews. 
The blog should be around 800 words.
Please organize it with a clear introduction, well-structured body, and a conclusion summarizing the key points and user sentiments.
Avoid explicitly mentioning the generation process or exposing the artificial nature of the content. 
Follows the rules.
rules:
1. must return content in markdown format which can be parsed by markdown.js, ex. 'h1 as #, h2 as ##'
2. without image
3. without gpt hint commentary
reviews:
${editorialSummary ? editorialSummary + "\n" : ""}${reviews}`;
};

export const getRestuarantArticlePromptText = ({ place, type, reviews }) => {
  return `Generate a traveling blog on '${place}',
There are some reviews about people's feeling to the ${
    type ?? "place"
  }, please rephrase naturally throughout the content for a balanced perspective and please avoid using any words from the reviews. Provide a unique and paraphrased.
Ensure the blog maintains a conversational and informative tone and providing valuable insights.
Diversify the blog from different demographics and backgrounds.
The blog should be around 800 words.
Please organize it with a clear introduction, well-structured body, and a conclusion summarizing the key points and user sentiments.
Avoid explicitly mentioning the generation process or exposing the artificial nature of the content. 
Follows the rules.
rules:
1. return in markdown form which can be parsed by markdown.js
2. without image
3. without gpt hint commentary
reviews:
${reviews}`;
};

export const getRegionalPromptText = ({ place }) => {
  return `Can you put ${place} in the regional category: [Hokkaido,Tohoku,Kanto,Chubu,Kansai,Chugoku,Shikoku,Kyushu,Okinawa]
  and in following json format and without any other text:
  {"region": "",  city: "${place}"}`;
};
