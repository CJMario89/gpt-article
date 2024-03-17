import NextImage from "next/image";
import { useState } from "react";
import { Flex, Skeleton } from "@chakra-ui/react";
import LogoSvg from "assets/logo.svg";
const Image = ({ errorImageContainerProps, ...imageProps }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  return (
    <>
      {isLoading && (
        <Skeleton
          borderRadius="lg"
          w="100%"
          h="100%"
          position="absolute"
          top="0"
          left="0"
        />
      )}
      {isError && (
        <Flex
          w="full"
          h="full"
          alignItems="center"
          justifyContent="center"
          {...errorImageContainerProps}
        >
          <LogoSvg color="primary.800" w="50" h="50" />
        </Flex>
      )}
      {!isError && (
        <NextImage
          alt="image"
          onError={() => {
            setIsError(true);
            setIsLoading(false);
          }}
          onLoad={() => {
            setIsLoading(false);
            setIsError(false);
          }}
          onLoadingComplete={() => {
            setIsLoading(false);
            setIsError(false);
          }}
          {...imageProps}
        />
      )}
    </>
  );
};

export default Image;
