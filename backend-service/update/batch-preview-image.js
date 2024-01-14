import { imageInstance } from "backend-service/common";
import Jimp from "jimp";

export const batchPreviewImage = async () => {
  // await batchPreviewCityImage();
  await batchPreviewSpotImage();
};

const batchPreviewCityImage = async () => {
  const locations = await imageInstance({ type: "city" })
    .whereNot({ fetched: null })
    .select("prefecture", "city", "fetched");
  locations.slice(0, 1000).map(({ fetched, prefecture, city }) => {
    Jimp.read(
      `./public/image/city/${prefecture}_${city}_${fetched}.webp`,
      async (err, image) => {
        if (err) {
          console.error(err);
          return;
        }

        image
          .quality(100)
          .resize(250, 250)
          .write(
            `./public/preview/city/${prefecture}_${city}_${fetched}.webp`,
            (writeErr) => {
              if (writeErr) {
                console.error(writeErr);
                // Handle write error
              } else {
                console.log("Image saved as WebP successfully!");
              }
            }
          );
      }
    );
  });
};

const batchPreviewSpotImage = async () => {
  const locations = await imageInstance({ type: "spot" })
    .whereNot({ fetched: null })
    .select("city", "spot", "fetched");
  for (let i = 0; i < locations.length; i++) {
    try {
      const { fetched, city, spot } = locations[i];
      await new Promise((resolve) => {
        Jimp.read(
          `./public/image/spot/${city}_${spot}_${fetched}.webp`,
          async (err, image) => {
            if (err) {
              console.error(err);
              resolve("");
              return;
            }
            image
              .quality(100)
              .resize(250, 250)
              .write(
                `./public/preview/spot/${city}_${spot}_${fetched}.webp`,
                (writeErr) => {
                  if (writeErr) {
                    console.error(writeErr);
                    resolve("");

                    // Handle write error
                  } else {
                    console.log("Image saved as WebP successfully!");
                    resolve("");
                  }
                }
              );
          }
        );
      });
    } catch (e) {
      console.log(e);
    }
  }
};
