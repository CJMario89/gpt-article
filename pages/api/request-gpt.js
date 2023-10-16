import { openai } from "./import-open-ai";

const requestGPT = async (req, res) => {
  const { text } = req.query;
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: text }],
      model: "gpt-3.5-turbo",
    });
    const data = completion.choices[0].message.content;
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

export default requestGPT;
