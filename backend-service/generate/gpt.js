import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GPT_APIKEY,
});

export const requestGpt = async ({ text }) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: text }],
    model: "gpt-3.5-turbo",
  });
  const data = completion.choices[0].message.content;
  console.log(data);
  return data;
};
