import { updateArticle } from "backend-service/update";

const postArticle = async (req, res) => {
  try {
    await updateArticle(JSON.parse(req.body));
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default postArticle;
