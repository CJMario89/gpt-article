import { Box, Flex, Link } from "@chakra-ui/react";
import ExternalLinkSvg from "assets/external-link-svg";
import useComposeImageUrl from "hooks/use-compose-image-url";
import Image from "next/image";
import NextLink from "next/link";

const PhotoDisplayer = ({
  image,
  name,
  region,
  prefecture,
  city,
  spot,
  // setPhotoFloat,
  ...restProps
}) => {
  const { imageUrl, referenceLink, referenceName } = useComposeImageUrl({
    region,
    prefecture,
    city,
    spot,
    image,
  });

  // const photoRef = useRef(null);
  // useEffect(() => {
  //   const width = photoRef.current?.clientWidth;
  //   const height = photoRef.current?.clientHeight;
  //   if (width / height < 1) {
  //     setPhotoFloat(true);
  //   }
  // }, [setPhotoFloat]);
  return (
    <Flex
      flexDirection="column"
      w="full"
      position="relative"
      rowGap="1"
      alignItems="center"
      {...restProps}
    >
      {image && (
        <Box position="relative" w="full" pt="50%">
          <Image
            alt={referenceName}
            width="960"
            height="480"
            // ref={photoRef}
            style={{
              top: "0",
              width: "100%",
              height: "100%",
              position: "absolute",
              objectFit: "cover",
              _hover: {
                objectFit: "none",
              },
            }}
            objectFit="cover"
            src={imageUrl}
          />
        </Box>
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
          prefetch={false}
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
