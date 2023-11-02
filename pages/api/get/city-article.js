import { getCityArticle } from "backend-service/get";

const GetCityArticle = async (req, res) => {
  try {
    const article = await getCityArticle(req.query);
    res.status(200).json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetCityArticle;
