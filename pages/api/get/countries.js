import { getCountries } from "backend-service/get";

const GetCountries = async (req, res) => {
  try {
    const countries = await getCountries();
    return res.status(200).json(countries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetCountries;
