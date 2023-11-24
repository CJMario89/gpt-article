import { batchGenerateRegion } from "backend-service/update";

const BatchGenerateRegion = async (req, res) => {
  try {
    await batchGenerateRegion();
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchGenerateRegion;
