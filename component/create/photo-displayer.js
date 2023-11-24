import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const PhotoDisplayer = ({ photo = {} }) => {
  const { image, image_reference_link, image_reference_name } = photo;
  const imageUrl = `data:image/jpeg;base64,${Buffer.from(
    image?.data ?? ""
  ).toString("base64")}`;
  return (
    <Flex flexDirection="column">
      {imageUrl && (
        <Image
          alt={image_reference_name}
          width="1280"
          height="1280"
          src={imageUrl}
        />
      )}
      <Link passHref href={image_reference_link ?? ""}>
        Photo reference: {image_reference_name}
      </Link>
    </Flex>
  );
};

export default PhotoDisplayer;
