import { batchGenerateArticlePrefecture } from "backend-service/update";

const BatchGenerateArticlePrefecture = async (req, res) => {
  try {
    await batchGenerateArticlePrefecture();
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchGenerateArticlePrefecture;
