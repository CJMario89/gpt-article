import { batchBlogImage } from "backend-service/update";

const BatchBlogImage = async (req, res) => {
  try {
    const cities = await batchBlogImage();
    res.status(200).json({ cities });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default BatchBlogImage;
