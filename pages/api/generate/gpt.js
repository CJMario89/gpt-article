import { requestGpt } from "backend-service/generate";

const generateGpt = async (req, res) => {
  try {
    const data = await requestGpt(req.query);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export default generateGpt;
