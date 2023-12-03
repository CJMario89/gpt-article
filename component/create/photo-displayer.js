import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const PhotoDisplayer = ({ photo = {}, setPhotoFloat, ...restProps }) => {
  const { image, image_reference_link, image_reference_name } = photo;
  const imageUrl = `data:image/jpeg;base64,${Buffer.from(
    image?.data ?? ""
  ).toString("base64")}`;
  const photoRef = useRef(null);
  useEffect(() => {
    const width = photoRef.current?.clientWidth;
    const height = photoRef.current?.clientHeight;
    console.log(width);
    console.log(height);
    if (width / height < 1) {
      setPhotoFloat(true);
    }
  }, [setPhotoFloat]);
  return (
    <Flex flexDirection="column" w="full" position="relative" {...restProps}>
      {imageUrl && (
        <Image
          alt={image_reference_name}
          width="1280"
          height="1280"
          ref={photoRef}
          src={imageUrl}
        />
      )}
      <Flex
        position="absolute"
        fontSize="10px"
        color="gray.700"
        bottom="0"
        left="6"
        columnGap="2"
        whiteSpace="nowrap"
      >
        Photo reference:
        <Link href={image_reference_link ?? ""} target="_blank">
          {image_reference_name}
        </Link>
      </Flex>
    </Flex>
  );
};

export default PhotoDisplayer;
