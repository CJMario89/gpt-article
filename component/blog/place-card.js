import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import style from "./place-card.module.css";
import { useRouter } from "next/router";

const PlaceCard = ({ place, ...restProps }) => {
  const {
    type,
    country,
    city,
    spot,
    title,
    description,
    preview_image,
    image_reference_link,
    image_reference_name,
  } = place;
  const router = useRouter();
  const imageUrl =
    preview_image?.data &&
    `data:image/jpeg;base64,${Buffer.from(preview_image?.data).toString(
      "base64"
    )}`;
  const isSpot = type === "spot";
  const placeName = isSpot ? spot : city;
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
        {imageUrl && (
          <Image
            alt={placeName}
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
          whiteSpace="nowrap"
        >
          Photo reference:
          <Link href={image_reference_link ?? ""} target="_blank">
            {image_reference_name}
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
          {placeName}
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
