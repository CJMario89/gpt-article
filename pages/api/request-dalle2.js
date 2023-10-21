import { openai } from "./import-open-ai";

const requestDalle2 = async (req, res) => {
  const { text } = req.query;
  try {
    const response = await openai.images.generate({
      prompt: text,
      n: 1,
      size: "1024x1024",
    });
    const imageUrl = response.data[0].url;
    res.status(200).json(imageUrl);
  } catch (e) {
    console.log(e);
  }
};

export default requestDalle2;
