import { batchTranslate } from "backend-service/update";

const BatchTranslate = async (req, res) => {
  try {
    await batchTranslate();
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchTranslate;
