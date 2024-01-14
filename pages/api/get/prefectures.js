import { getPrefectures } from "backend-service/get";

const GetPrefectures = async (req, res) => {
  try {
    const prefectures = await getPrefectures(req.query);
    console.log(prefectures);
    res.status(200).json(prefectures);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetPrefectures;
