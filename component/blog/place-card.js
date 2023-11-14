import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import style from "./place-card.module.css";
import { useRouter } from "next/router";

const PlaceCard = ({
  type,
  country,
  city,
  spot,
  title,
  description,
  photo,
  ...restProps
}) => {
  const router = useRouter();
  console.log(city);
  const { image, referenceLink, referenceName } = photo ?? {};
  const imageUrl =
    image?.data &&
    `data:image/jpeg;base64,${Buffer.from(image?.data).toString("base64")}`;
  const isSpot = type === "spot";
  const place = isSpot ? spot : city;
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
        bottom: "0px",
        left: "24px",
        width: "calc(100% - 48px)",
        height: "0.5px",
        backgroundColor: "#aaaaaa",
      }}
      onClick={() => {
        router.push(`/blog/${country}/${city}${isSpot ? `/${spot}` : ""}`);
      }}
      {...restProps}
    >
      <Box position="relative" w="200px" h="200px" mt="6px" flexShrink="0">
        {imageUrl ? (
          <Image
            alt={place}
            width="2048"
            height="2048"
            src={imageUrl}
            style={{
              objectFit: "cover",
              width: "200px",
              height: "200px",
            }}
          />
        ) : (
          <Image
            alt={place}
            width="2048"
            height="2048"
            src={imageUrl}
            style={{
              objectFit: "cover",
              width: "200px",
              height: "200px",
            }}
          />
        )}
        <Flex
          position="absolute"
          fontSize="12px"
          color="gray.700"
          bottom="-8"
          left="0.5"
          columnGap="2"
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
        w="full"
        ml="12"
        rowGap="2"
        position="relative"
      >
        <Heading as="h4" textAlign="center">
          {place}
        </Heading>
        <Heading as="h5">{title}</Heading>
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
      </Flex>
      <Text
        position="absolute"
        fontSize="12px"
        color="gray.600"
        right="6"
        bottom="4"
        _hover={{
          color: "gray.400",
        }}
      >
        Read more...
      </Text>
    </Flex>
  );
};

export default PlaceCard;
