import { updateJapanLocaleInfo } from "backend-service/update";

const UpdateJapanLocaleInfo = async (req, res) => {
  try {
    await updateJapanLocaleInfo();
    res.status(200).json({ response: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default UpdateJapanLocaleInfo;
