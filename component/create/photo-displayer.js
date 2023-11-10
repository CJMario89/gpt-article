import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const PhotoDisplayer = ({ photo = {} }) => {
  const { image, referenceLink, referenceName } = photo;
  const imageUrl = `data:image/jpeg;base64,${Buffer.from(
    image?.data ?? ""
  ).toString("base64")}`;
  return (
    <Flex flexDirection="column">
      {imageUrl && (
        <Image alt={referenceName} width="1280" height="1280" src={imageUrl} />
      )}
      <Link passHref href={referenceLink ?? ""}>
        Photo reference: {referenceName}
      </Link>
    </Flex>
  );
};

export default PhotoDisplayer;
