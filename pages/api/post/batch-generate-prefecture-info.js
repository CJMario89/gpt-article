import { batchGeneratePrefectureInfo } from "backend-service/update";

const BatchGeneratePrefectureInfo = async (req, res) => {
  try {
    await batchGeneratePrefectureInfo();
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchGeneratePrefectureInfo;
