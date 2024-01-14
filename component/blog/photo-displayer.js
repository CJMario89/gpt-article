import { Flex, Link } from "@chakra-ui/react";
import ExternalLinkSvg from "assets/external-link-svg";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useRef } from "react";

const PhotoDisplayer = ({ photo = {}, name, setPhotoFloat, ...restProps }) => {
  const { image, referenceLink, referenceName } = photo;
  const photoRef = useRef(null);
  useEffect(() => {
    const width = photoRef.current?.clientWidth;
    const height = photoRef.current?.clientHeight;
    if (width / height < 1) {
      setPhotoFloat(true);
    }
  }, [setPhotoFloat]);
  return (
    <Flex
      flexDirection="column"
      w="full"
      position="relative"
      rowGap="1"
      {...restProps}
    >
      {image && (
        <Image
          alt={referenceName}
          width="960"
          height="480"
          ref={photoRef}
          src={image}
        />
      )}
      <Flex
        fontSize="xs"
        w="full"
        color="neutral.600"
        whiteSpace="nowrap"
        justifyContent="flex-end"
      >
        <Link
          as={NextLink}
          href={referenceLink ?? ""}
          display="flex"
          alignItems="center"
          columnGap="1"
          target="_blank"
        >
          {referenceName}. {name}.{" "}
          <ExternalLinkSvg w="3" h="3" color="neutral.600" />
        </Link>
      </Flex>
    </Flex>
  );
};

export default PhotoDisplayer;
