import { batchGenerateArticleCity } from "backend-service/update";

const BatchGenerateArticleCity = async (req, res) => {
  try {
    await batchGenerateArticleCity();
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchGenerateArticleCity;
