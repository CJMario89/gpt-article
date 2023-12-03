import { articleInstance, instance } from "backend-service/common";
import Jimp from "jimp";

export const batchPreviewImage = async () => {
  batchSpotImage();
  batchCityImage();
};

const batchCityImage = async () => {
  const buffers = await articleInstance({ type: "city" }).select(
    "city",
    "image"
  );

  const newBuffers = await Promise.all(
    buffers.map(async (buffer, i) => {
      console.log(i);
      const newBuffer = await resizeImage(buffer.image);
      // console.log(newBuffer);
      return { buffer: newBuffer, city: buffer.city };
    })
  );
  console.log(newBuffers);
  await instance.transaction(async (trx) => {
    await Promise.all(
      newBuffers.map((newBuffer) =>
        articleInstance({ type: "city" })
          .where({ city: newBuffer.city })
          .update({ preview_image: newBuffer.buffer })
          .transacting(trx)
      )
    );
  });
};

const batchSpotImage = async () => {
  const buffers = await articleInstance({ type: "spot" }).select(
    "spot",
    "image"
  );

  const newBuffers = await Promise.all(
    buffers.map(async (buffer, i) => {
      console.log(i);
      const newBuffer = await resizeImage(buffer.image);
      // console.log(newBuffer);
      return { buffer: newBuffer, spot: buffer.spot };
    })
  );
  console.log(newBuffers);
  await instance.transaction(async (trx) => {
    await Promise.all(
      newBuffers.map((newBuffer) =>
        articleInstance({ type: "spot" })
          .where({ spot: newBuffer.spot })
          .update({ preview_image: newBuffer.buffer })
          .transacting(trx)
      )
    );
  });
};

async function resizeImage(buffer) {
  if (!buffer) {
    return null;
  }
  const image = await Jimp.read(buffer);
  return await image
    .resize(Math.floor(image.getWidth() / 4), Math.floor(image.getHeight() / 4))
    .getBufferAsync(Jimp.MIME_JPEG);
}
