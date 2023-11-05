import { getPlacesByParams } from "backend-service/get";

const GetPlacesByParams = async (req, res) => {
  try {
    const places = await getPlacesByParams(req.query);
    res.status(200).json(places);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetPlacesByParams;
