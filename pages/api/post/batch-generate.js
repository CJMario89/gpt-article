import { batchGenerate } from "backend-service/update";

const BatchGenerate = async (req, res) => {
  try {
    await batchGenerate(JSON.parse(req.body));
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchGenerate;
