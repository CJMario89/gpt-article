import { updatePhoto } from "backend-service/update";

const postPhoto = async (req, res) => {
  try {
    await updatePhoto(JSON.parse(req.body));
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default postPhoto;
