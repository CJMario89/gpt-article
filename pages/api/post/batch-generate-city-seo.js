import { batchGenerateCitySeo } from "backend-service/update";

const BatchGenerateCitySeo = async (req, res) => {
  try {
    const cities = await batchGenerateCitySeo();
    res.status(200).json({ cities });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchGenerateCitySeo;
