import { updatePlaces } from "backend-service/update";

const postPlaces = async (req, res) => {
  try {
    await updatePlaces(JSON.parse(req.body));
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default postPlaces;
