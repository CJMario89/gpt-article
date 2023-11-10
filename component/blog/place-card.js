import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import style from "./place-card.module.css";

const PlaceCard = ({
  type,
  country,
  city,
  spot,
  title,
  photo,
  ...restProps
}) => {
  const { image } = photo;
  const imageUrl = `data:image/jpeg;base64,${Buffer.from(image.data).toString(
    "base64"
  )}`;
  const isSpot = type === "spot";
  const place = isSpot ? spot : city;
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
          src={imageUrl}
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
        {/* <Link href={referenceLink} target="_blank">
          {referenceName}
        </Link> */}
        {/* link in link hydration */}
      </Flex>
    </Box>
  );
};

export default PlaceCard;
