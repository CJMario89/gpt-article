import { requestDalle2 } from "backend-service/generate";

const generateDalle2 = async (req, res) => {
  try {
    const imageUrl = await requestDalle2(req.query);
    res.status(200).json(imageUrl);
  } catch (e) {
    console.log(e);
  }
};

export default generateDalle2;
