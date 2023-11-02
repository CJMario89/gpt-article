import { getRequest } from "service/common";
import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

const key = process.env.PLACE_APIKEY;
const requestGooglePhoto = async (req, res) => {
  try {
    const { city } = req.query;
    const response1 = await getRequest(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        query: city,
        location: "40,120",
        key,
      }
    );
    const placeData = await response1.json();
    console.log(placeData.results);
    const photo = placeData.results[0].photos[0];
    const htmlAttributions = photo.html_attributions;
    const photoReference = photo.photo_reference;
    const response2 = await getRequest(
      "https://maps.googleapis.com/maps/api/place/photo",
      { maxwidth: 1024, photoreference: photoReference, key }
    );
    const placePhotoArrayBuffer = await response2.arrayBuffer();
    const placePhotoBuffer = Buffer.from(placePhotoArrayBuffer);
    const url = `/public/${city}.png`;
    fs.writeFile(`.${url}`, placePhotoBuffer, "binary", (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Image saved as ${city}.png`);
      }
    });
    const country = (await prisma.cityArticle.findUnique({ where: { city } }))
      .country;
    await prisma.cityImage.create({
      data: {
        country,
        city,
        url,
      },
    });
    console.log(htmlAttributions);
    res.status(200).json({ success: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export default requestGooglePhoto;
