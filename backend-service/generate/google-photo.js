import { getRequest } from "service/common";
// import * as fs from "fs";
import { parseReference } from "backend-service/update";
import { articleInstance, prisma } from "backend-service/common";

const key = process.env.PLACE_APIKEY;

export const requestStoreGooglePhoto = async ({
  type,
  country,
  city,
  spot,
}) => {
  const isSpot = type === "spot";
  const response1 = await getRequest(
    "https://maps.googleapis.com/maps/api/place/textsearch/json",
    {
      query: `${country} ${city}${isSpot ? ` ${spot}` : ""}`,
      location: "40,120",
      key,
    }
  );
  const place = isSpot ? spot : city;
  const placeData = await response1.json();
  console.log(placeData.results);
  const placeDataResult = placeData.results[0];
  const photos = placeDataResult?.photos;
  const categories = placeDataResult?.types;

  if (categories) {
    const categoryInstance = isSpot ? prisma.spotCategory : prisma.cityCategory;

    const sqlQuery = categories.map((category) =>
      categoryInstance.create({
        data: isSpot ? { category, city, spot } : { category, city },
      })
    );
    await prisma.$transaction(sqlQuery);
  }

  if (photos) {
    const photo = photos[0];
    const image_reference_link = photo?.html_attributions;
    const photoReference = photo?.photo_reference;
    if (photoReference) {
      const response2 = await getRequest(
        "https://maps.googleapis.com/maps/api/place/photo",
        { maxwidth: 1024, photoreference: photoReference, key }
      );
      const placePhotoArrayBuffer = await response2.arrayBuffer();
      const placePhotoBuffer = Buffer.from(placePhotoArrayBuffer);
      const data = {
        image: placePhotoBuffer,
        ...parseReference(image_reference_link),
      };
      await articleInstance({ type }).update({
        where: { country, city, ...(isSpot ? { spot } : {}) },
        data,
      });

      // fs.writeFileSync(`./public${url}`, placePhotoBuffer, "binary");
      console.log(`Image saved: ${place}`);
    }
  }
};
