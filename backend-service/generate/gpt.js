import OpenAI from "openai";
import { produceLogitBias } from "utils/gpt-condition-process";

const openai = new OpenAI({
  apiKey: process.env.GPT_APIKEY,
});

export const requestGpt = async ({ text, tokensIncrease, tokensDecrease }) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: text }],
    model: "gpt-3.5-turbo",
    // model: "gpt-4",
    // logit_bias: produceLogitBias({ tokensIncreas, tokensDecrease }),
    logit_bias: produceLogitBias({ tokensIncrease: ["#", "##"] }),
    temperature: 0.1,
  });
  const data = completion.choices[0].message.content;
  // console.log(data);
  return data;
};
