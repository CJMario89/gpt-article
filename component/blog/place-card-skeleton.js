import { Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

const PlaceCardSkeleton = ({ isLoading }) => {
  return (
    <>
      {isLoading &&
        Array.from(Array(4)).map((_, i) => {
          return (
            <Flex
              key={i}
              flexDirection={{ base: "column", md: "row" }}
              alignItems={{ base: "center", md: "flex-start" }}
              w="full"
              p="8"
              pb="12"
            >
              <Skeleton
                w={{ base: "250px", md: "200px" }}
                h={{ base: "250px", md: "200px" }}
                color="gray"
                fadeDuration={1}
                mr={{ base: "0", md: "12" }}
                flexShrink="0"
              />
              <Flex
                flexDirection="column"
                w={{ base: "250px", md: "inherit" }}
                rowGap="8"
                mt="4"
              >
                <SkeletonText />
                <SkeletonText />
              </Flex>
            </Flex>
          );
        })}
    </>
  );
};

export default PlaceCardSkeleton;
