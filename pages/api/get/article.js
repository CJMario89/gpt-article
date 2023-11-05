import { getArticle } from "backend-service/get";

const GetArticle = async (req, res) => {
  try {
    const article = await getArticle(req.query);
    res.status(200).json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetArticle;
