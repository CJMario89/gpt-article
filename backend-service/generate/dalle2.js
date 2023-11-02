import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GPT_APIKEY,
});

export const requestDalle2 = async (params = {}) => {
  const { text } = params;
  const response = await openai.images.generate({
    prompt: text,
    n: 1,
    size: "1024x1024",
  });
  return response.data[0].url;
};
