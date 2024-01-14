import { getSpots } from "backend-service/get";

const GetSpots = async (req, res) => {
  try {
    const cities = await getSpots(req.query);
    res.status(200).json(cities);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetSpots;
