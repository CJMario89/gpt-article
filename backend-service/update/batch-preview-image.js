import { prisma } from "backend-service/common";
import Jimp from "jimp";

export const batchPreviewImage = async () => {
  const buffers = await prisma.cityArticle.findMany({
    // where: {
    //   preview_image: null,
    // },
    select: {
      city: true,
      image: true,
    },
  });
  const newBuffers = await Promise.all(
    buffers.map(async (buffer, i) => {
      console.log(i);
      const newBuffer = await resizeImage(buffer.image);
      // console.log(newBuffer);
      return { buffer: newBuffer, city: buffer.city };
    })
  );
  console.log(newBuffers);
  const sqlQuery = newBuffers.map((newBuffer) =>
    prisma.cityArticle.update({
      where: { city: newBuffer.city },
      data: { preview_image: newBuffer.buffer },
    })
  );
  console.log(sqlQuery);
  await prisma.$transaction(sqlQuery);
};

async function resizeImage(buffer) {
  if (!buffer) {
    return null;
  }
  const image = await Jimp.read(buffer);
  return await image
    .resize(Math.floor(image.getWidth() / 3), Math.floor(image.getHeight() / 3))
    .getBufferAsync(Jimp.MIME_JPEG);
}
