import { batchGeneratePrefectureSeo } from "backend-service/update";

const BatchGeneratePrefectureSeo = async (req, res) => {
  try {
    await batchGeneratePrefectureSeo();
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchGeneratePrefectureSeo;