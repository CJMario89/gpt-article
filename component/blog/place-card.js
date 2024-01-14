import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import style from "./place-card.module.css";
import { useRouter } from "next/router";

const PlaceCard = ({ place, isHorizontal, ...restProps }) => {
  const {
    type,
    region,
    prefecture,
    city,
    spot,
    title,
    description,
    referenceLink,
    referenceName,
  } = place;
  const isSpot = type === "spot";
  const router = useRouter();
  const imageUrl = isSpot
    ? `/preview/spot/${city}_${spot}_1.webp`
    : `/preview/city/${prefecture}_${city}_1.webp`;
  const placeName = isSpot
    ? spot?.replace(/-/g, " ").replace(/_/g, " / ")
    : city;
  return (
    <Flex
      w="100%"
      flex="1"
      position="relative"
      className={style.card}
      cursor="pointer"
      transition="all 0.5s ease-in-out"
      overflow="hidden"
      p="8"
      pb="12"
      _before={{
        content: '""',
        position: "absolute",
        bottom: "1px",
        left: "24px",
        width: "calc(100% - 48px)",
        height: "0.5px",
        backgroundColor: "#aaaaaa",
      }}
      flexDirection={isHorizontal ? "column" : "row"}
      alignItems={isHorizontal ? "center" : "flex-start"}
      rowGap="12"
      onClick={() => {
        router.push(
          `/${region}/${prefecture}/${city}${isSpot ? `/${spot}` : ""}`
        );
      }}
      {...restProps}
    >
      <Box
        position="relative"
        w={isHorizontal ? "250px" : "200px"}
        h={isHorizontal ? "250px" : "200px"}
        mt="6px"
        flexShrink="0"
      >
        {imageUrl && (
          <Image
            alt={placeName}
            width="2048"
            height="2048"
            src={imageUrl}
            style={{
              objectFit: "cover",
              width: "inherit",
              height: "inherit",
            }}
          />
        )}
        <Flex
          position="absolute"
          fontSize="10px"
          color="gray.700"
          bottom="-4"
          left="0.5"
          columnGap="2"
          whiteSpace="nowrap"
        >
          Photo reference:
          <Link href={referenceLink ?? ""} target="_blank">
            {referenceName}
          </Link>
        </Flex>
      </Box>
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        w={isHorizontal ? "250px" : "full"}
        ml={isHorizontal ? "0" : "12"}
        rowGap="2"
        position="relative"
      >
        <Heading as="h4">{placeName}</Heading>
        <Heading
          as="h5"
          height="56px"
          overflow="hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Heading>
        <Text
          height="48px"
          overflow="hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Text>
        <Text
          fontSize="12px"
          color="gray.600"
          textAlign="center"
          justifySelf="flex-end"
          _hover={{
            color: "gray.400",
          }}
        >
          Read more...
        </Text>
      </Flex>
    </Flex>
  );
};

export default PlaceCard;
