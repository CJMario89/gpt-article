import { batchInsertLocalePlace } from "backend-service/update";

const BatchInsertLocalePlace = async (req, res) => {
  try {
    const cities = await batchInsertLocalePlace();
    res.status(200).json({ cities });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchInsertLocalePlace;
