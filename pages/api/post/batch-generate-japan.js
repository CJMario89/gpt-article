import { batchGenerateJapan } from "backend-service/update";

const BatchGenerateJapan = async (req, res) => {
  try {
    const cities = await batchGenerateJapan();
    res.status(200).json({ cities });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchGenerateJapan;
