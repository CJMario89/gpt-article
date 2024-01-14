import { batchGenerateRestuarant } from "backend-service/update";

const BatchGenerateRestuarant = async (req, res) => {
  try {
    const cities = await batchGenerateRestuarant();
    res.status(200).json({ cities });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchGenerateRestuarant;
