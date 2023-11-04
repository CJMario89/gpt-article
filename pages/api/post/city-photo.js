import { updateCityPhoto } from "backend-service/update";

const postCityPhoto = async (req, res) => {
  try {
    await updateCityPhoto(JSON.parse(req.body));
    await res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default postCityPhoto;
