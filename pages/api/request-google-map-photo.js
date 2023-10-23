import { getRequest } from "service/common";
import * as fs from "fs";
const key = process.env.PLACE_APIKEY;
const requestGoogleMapPhoto = async (req, res) => {
  try {
    const { text } = req.query;
    const response1 = await getRequest(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        query: text,
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
    fs.writeFile(`${text}.png`, placePhotoBuffer, "binary", (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Image saved as ${text}.png`);
      }
    });
    console.log(htmlAttributions);
    res.status(200).json({ success: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export default requestGoogleMapPhoto;
