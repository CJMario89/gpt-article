import { batchGenerateRegionSeo } from "backend-service/update";

const BatchGenerateRegionSeo = async (req, res) => {
  try {
    await batchGenerateRegionSeo();
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchGenerateRegionSeo;
