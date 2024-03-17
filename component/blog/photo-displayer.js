import { Flex } from "@chakra-ui/react";
import ExternalLinkSvg from "assets/external-link-svg";
import Link from "component/NextLink";
import Image from "./image";

const PhotoDisplayer = ({ image, name, ...restProps }) => {
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
        <Image
          alt={name}
          width="600"
          height="300"
          errorImageContainerProps={{ w: "600px", h: "300px" }}
          src={image?.imageUrl}
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
