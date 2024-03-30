import { Box, Flex, Heading, Text, Tooltip } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import Image from "./image";
import LocationSVG from "assets/location.svg";
//import Link from "components/NextLink";
// import ExternalLinkSvg from "assets/external-link-svg";
export const priceMap = {
  PRICE_LEVEL_INEXPENSIVE: "$",
  PRICE_LEVEL_MODERATE: "$$",
  PRICE_LEVEL_EXPENSIVE: "$$$",
  PRICE_LEVEL_VERY_EXPENSIVE: "$$$$",
};

const PlaceCard = ({ onClick, place, isHorizontal, ...restProps }) => {
  const {
    type,
    prefecture,
    city,
    spot,
    title,
    description,
    imageUrl,
    articleUrl,
    distance,
    priceLevel,
  } = place;
  const t = useTranslations();
  const router = useRouter();
  const placeName = {
    prefecture: prefecture,
    city: city,
    spot: spot?.replace(/-/g, " ").replace(/_/g, " / "),
  };
  return (
    <Flex
      w="100%"
      flex="1"
      position="relative"
      background="linear-gradient(to right, #F5F4F5 0%, #F5F4F5 50%, #ffffff 100%)"
      backgroundSize="200% 100%"
      backgroundPosition="200% 0%"
      backgroundRepeat="no-repeat"
      _hover={{
        background:
          "linear-gradient(to right, #F5F4F5 0%, #F5F4F5 50%, #ffffff 100%)",
        backgroundSize: "200% 100%",
        backgroundPosition: "0% 0%",
        backgroundRepeat: "no-repeat",
      }}
      cursor="pointer"
      transition="all 0.5s ease-in-out"
      overflow="hidden"
      p={{ base: "2", lg: "6" }}
      pb="8"
      _before={
        isHorizontal
          ? {}
          : {
              content: '""',
              position: "absolute",
              bottom: "1px",
              left: "24px",
              width: "calc(100% - 48px)",
              height: "0.5px",
              backgroundColor: "neutral.400",
            }
      }
      flexDirection={isHorizontal ? "column" : "row"}
      alignItems={isHorizontal ? "center" : "flex-start"}
      rowGap="1"
      onClick={() => {
        router.push(articleUrl, articleUrl, { locale: router.locale });
        if (typeof onClick === "function") {
          onClick();
        }
      }}
      {...restProps}
    >
      <Box
        position="relative"
        w={isHorizontal ? "250px" : "200px"}
        h={isHorizontal ? "250px" : "200px"}
        flexShrink="0"
      >
        {imageUrl && (
          <Image
            alt={placeName?.[type]}
            width="250"
            height="250"
            src={imageUrl}
            style={{
              width: "inherit",
              height: "inherit",
            }}
          />
        )}
      </Box>
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        w={isHorizontal ? "250px" : "full"}
        ml={isHorizontal ? "0" : "12"}
        position="relative"
        rowGap="1"
        py="4"
      >
        <Tooltip label={placeName?.[type]}>
          <Heading
            as="h3"
            color="primary.700"
            height={isHorizontal ? "32px" : "36px"}
            overflow="hidden"
            alignSelf="stretch"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {placeName?.[type]}
          </Heading>
        </Tooltip>
        {isHorizontal && (
          <Tooltip label={title}>
            <Heading
              as="h4"
              height="28px"
              color="primary.600"
              overflow="hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {title}
            </Heading>
          </Tooltip>
        )}
        <Text
          height="72px"
          overflow="hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
          color="neutral.700"
        >
          {description}
        </Text>
        <Tooltip label={description}>
          <Text
            fontSize="12px"
            color="neutral.600"
            textAlign="center"
            justifySelf="flex-end"
            _hover={{
              color: "neutral.500",
            }}
          >
            {t("Read more")}...
          </Text>
        </Tooltip>
        {Boolean(distance) && (
          <Flex alignItems="center">
            <LocationSVG color="primary.600" />
            <Text>
              ~{distance.toFixed(2)}
              {t("km")}
            </Text>
          </Flex>
        )}
        {Boolean(priceLevel) && (
          <Text color="primary.700">{priceMap[priceLevel]}</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default PlaceCard;
