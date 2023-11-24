import { requestStoreGooglePhoto } from "backend-service/generate";

const requestGooglePhoto = async (req, res) => {
  try {
    await requestStoreGooglePhoto(req.query);
    res.status(200).json({ success: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export default requestGooglePhoto;
