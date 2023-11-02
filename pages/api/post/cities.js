import { updateCities } from "backend-service/update";

const postCities = async (req, res) => {
  try {
    await updateCities(JSON.parse(req.body));
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default postCities;
