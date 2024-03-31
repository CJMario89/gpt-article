import { batchGenerateImage } from "backend-service/update";

const BatchGenerateImage = async (req, res) => {
  try {
    await batchGenerateImage();
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchGenerateImage;
