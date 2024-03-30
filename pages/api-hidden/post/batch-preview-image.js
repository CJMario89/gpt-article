import { batchPreviewImage } from "backend-service/update";

const BatchPreviewImage = async (req, res) => {
  try {
    const cities = await batchPreviewImage();
    res.status(200).json({ cities });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchPreviewImage;
