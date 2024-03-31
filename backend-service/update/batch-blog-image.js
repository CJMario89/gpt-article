import { imageInstance } from "backend-service/common";
import Jimp from "jimp";

const version = "4";

export const batchBlogImage = async () => {
  // await batchBlogCityImage();
  // await batchBlogSpotImage();
  // await batchBlogPrefectureImage();
};

const batchBlogCityImage = async () => {
  const locations = await imageInstance({ type: "city" })
    .where({ fetched: version })
    .select("prefecture", "city", "fetched");
  console.log(locations);
  locations.slice(0, 10000).map(({ fetched, prefecture, city }) => {
    Jimp.read(
      `./public/photo/${fetched}/image/city/${prefecture}_${city}_${fetched}.webp`,
      async (err, image) => {
        if (err) {
          console.error(err);
          return;
        }
        const ratio = image.getWidth() / image.getHeight();
        const isHorizontal = ratio > 2;
        const w = isHorizontal ? 300 * ratio : 600;
        const h = isHorizontal ? 300 : 600 / ratio;
        const offsetX = isHorizontal ? w / 2 - 300 : 0;
        const offsetY = isHorizontal ? 0 : h / 2 - 150;

        image
          .quality(100)
          .resize(w, h)
          .crop(offsetX, offsetY, 600, 300)
          .write(
            `./public/photo/${fetched}/blog/city/${prefecture}_${city}_${fetched}.webp`,
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

const batchBlogSpotImage = async () => {
  const locations = await imageInstance({ type: "spot" })
    .where({ fetched: version })
    .select("city", "spot", "fetched");
  for (let i = 0; i < locations.length; i++) {
    try {
      const { fetched, city, spot } = locations[i];
      await new Promise((resolve) => {
        Jimp.read(
          `./public/photo/${fetched}/image/spot/${city}_${spot}_${fetched}.webp`,
          async (err, image) => {
            if (err) {
              console.error(err);
              resolve("");
              return;
            }
            const ratio = image.getWidth() / image.getHeight();
            const isHorizontal = ratio > 2;
            const w = isHorizontal ? 300 * ratio : 600;
            const h = isHorizontal ? 300 : 600 / ratio;
            const offsetX = isHorizontal ? w / 2 - 300 : 0;
            const offsetY = isHorizontal ? 0 : h / 2 - 150;
            image
              .quality(100)
              .resize(w, h)
              .crop(offsetX, offsetY, 600, 300)
              .write(
                `./public/photo/${fetched}/blog/spot/${city}_${spot}_${fetched}.webp`,
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

const batchBlogPrefectureImage = async () => {
  const locations = await imageInstance({ type: "prefecture" })
    .where({ fetched: version })
    .select("region", "prefecture", "fetched");
  locations.slice(0, 10000).map(({ fetched, prefecture, region }) => {
    Jimp.read(
      `./public/photo/${fetched}/image/prefecture/${region}_${prefecture}_${fetched}.webp`,
      async (err, image) => {
        if (err) {
          console.error(err);
          return;
        }
        const ratio = image.getWidth() / image.getHeight();
        const isHorizontal = ratio > 2;
        const w = isHorizontal ? 300 * ratio : 600;
        const h = isHorizontal ? 300 : 600 / ratio;
        const offsetX = isHorizontal ? w / 2 - 300 : 0;
        const offsetY = isHorizontal ? 0 : h / 2 - 150;

        image
          .quality(100)
          .resize(w, h)
          .crop(offsetX, offsetY, 600, 300)
          .write(
            `./public/photo/${fetched}/blog/prefecture/${region}_${prefecture}_${fetched}.webp`,
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
