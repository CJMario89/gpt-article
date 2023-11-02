import { updateArticleStatus } from "backend-service/update";

const postCityArticleStatus = async (req, res) => {
  try {
    await updateArticleStatus(JSON.parse(req.body));
    await res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default postCityArticleStatus;
