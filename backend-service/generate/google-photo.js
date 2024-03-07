import Jimp from "jimp";

export const getGooglePhoto = async ({
  name,
  location1,
  location2,
  num,
  folder,
}) => {
  const rawResponse = await fetch(
    `https://places.googleapis.com/v1/${name}/media?key=${process.env.PLACE_APIKEY}&maxWidthPx=1600&maxHeightPx=900`
  );

  const arrayBuffer = await rawResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  Jimp.read(buffer, async (err, image) => {
    if (err) {
      console.error(err);
      return;
    }

    image
      .quality(100)
      .write(
        `./public/photo/${num}/blog/${folder}/${location1}_${location2}_${num}.webp`,
        (writeErr) => {
          if (writeErr) {
            console.error(writeErr);
            // Handle write error
          } else {
            console.log("Image saved as WebP successfully!");
          }
        }
      );
  });
};
