import OpenAI from "openai";
import { produceLogitBias } from "utils/gpt-condition-process";

const openai = new OpenAI({
  apiKey: process.env.GPT_APIKEY,
});

export const requestGpt = async ({ text, tokensIncrease, tokensDecrease }) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: text }],
    model: "gpt-3.5-turbo",
    logit_bias: produceLogitBias({ tokensIncrease, tokensDecrease }),
  });
  const data = completion.choices[0].message.content;
  console.log(data);
  return data;
};
