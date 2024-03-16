import { getPlacesWithTranslation } from "backend-service/get";

const GetPlacesWithTranslation = async (req, res) => {
  try {
    const places = await getPlacesWithTranslation(req.query);
    res.status(200).json(places);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetPlacesWithTranslation;
