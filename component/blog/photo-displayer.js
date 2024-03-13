import { Box, Flex } from "@chakra-ui/react";
import ExternalLinkSvg from "assets/external-link-svg";
import Image from "next/image";
import Link from "component/NextLink";

const PhotoDisplayer = ({
  image,
  name,
  // setPhotoFloat,
  ...restProps
}) => {
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
            alt={name}
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
            src={image?.imageUrl}
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
          href={image?.referenceLink ?? ""}
          prefetch={false}
          display="flex"
          alignItems="center"
          columnGap="1"
          target="_blank"
        >
          {image?.referenceName}. {name}.{" "}
          <ExternalLinkSvg w="3" h="3" color="neutral.600" />
        </Link>
      </Flex>
    </Flex>
  );
};

export default PhotoDisplayer;
