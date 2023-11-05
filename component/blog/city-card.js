import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import style from "./city-card.module.css";
import Link from "next/link";

const CityCard = ({ country, city, title, image, ...restProps }) => {
  console.log(image);
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
      href={`/blog/${country}/${city}`}
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
          alt={city}
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
          {city}
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

export default CityCard;
