import { batchGenerateArticle } from "backend-service/update";

const BatchGenerateArticle = async (req, res) => {
  try {
    await batchGenerateArticle();
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchGenerateArticle;
