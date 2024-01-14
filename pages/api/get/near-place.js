import { getNearPlaces } from "backend-service/get";

const GetNearPlaces = async (req, res) => {
  try {
    const places = await getNearPlaces(req.query);
    res.status(200).json(places);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetNearPlaces;
