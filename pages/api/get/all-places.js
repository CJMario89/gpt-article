import { getAllPlaces } from "backend-service/get";

const GetAllPlaces = async (req, res) => {
  try {
    const places = await getAllPlaces(req.query);
    res.status(200).json(places);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetAllPlaces;
