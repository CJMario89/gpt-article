import { getCities } from "backend-service/get";

const GetCities = async (req, res) => {
  try {
    const cities = await getCities(req.query);
    res.status(200).json(cities);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetCities;
