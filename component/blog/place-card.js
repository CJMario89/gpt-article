import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import style from "./place-card.module.css";
import Link from "next/link";

const PlaceCard = ({
  type,
  country,
  city,
  spot,
  title,
  image,
  ...restProps
}) => {
  const isSpot = type === "spot";
  const place = isSpot ? spot : city;
  console.log(image);
  console.log(spot);
  return (
    <Box
      w="100%"
      pt="100%"
      h="0px"
      flex="1"
      position="relative"
      className={style.card}
      cursor="pointer"
      transition="all 0.2 ease-in-out"
      overflow="hidden"
      as={Link}
      href={`/blog/${country}/${city}${isSpot ? `/${spot}` : ""}`}
      {...restProps}
    >
      <Box
        w="100%"
        h="100%"
        position="absolute"
        top="0px"
        borderRadius="12px"
        overflow="hidden"
      >
        <Image
          alt={place}
          width="2048"
          height="2048"
          src={image}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      <Flex
        position="absolute"
        top="0px"
        background="whiteAlpha.800"
        justifyContent="center"
        p="2"
        w="full"
      >
        <Heading as="h4" textAlign="center">
          {place}
        </Heading>
        {/* <Text>{description}</Text> */}
      </Flex>
      <Flex
        w="full"
        position="absolute"
        bottom="0px"
        background="whiteAlpha.800"
        justifyContent="center"
        p="2"
        transform="translateY(100%)"
        transition="all 0.2s ease-in-out"
        className={style.title}
      >
        <Text textAlign="center">{title}</Text>
      </Flex>
    </Box>
  );
};

export default PlaceCard;
