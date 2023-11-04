import { getRequest } from "service/common";
import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

const key = process.env.PLACE_APIKEY;

export const requestStoreGooglePhoto = async ({ place }) => {
  const response1 = await getRequest(
    "https://maps.googleapis.com/maps/api/place/textsearch/json",
    {
      query: place,
      location: "40,120",
      key,
    }
  );
  const placeData = await response1.json();
  console.log(placeData.results);
  const photo = placeData.results[0].photos[0];
  const referenceLink = photo.html_attributions;
  const photoReference = photo.photo_reference;
  const response2 = await getRequest(
    "https://maps.googleapis.com/maps/api/place/photo",
    { maxwidth: 1024, photoreference: photoReference, key }
  );
  const placePhotoArrayBuffer = await response2.arrayBuffer();
  const placePhotoBuffer = Buffer.from(placePhotoArrayBuffer);
  const url = `/public/${place}.png`;
  fs.writeFile(`.${url}`, placePhotoBuffer, "binary", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Image saved as ${place}.png`);
    }
  });

  return {
    url,
    referenceLink,
  };
};
