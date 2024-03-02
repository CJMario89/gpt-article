import { Box, Flex, Heading, Text, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
//import Link from "components/NextLink";
// import ExternalLinkSvg from "assets/external-link-svg";

const PlaceCard = ({ onClick, place, isHorizontal, ...restProps }) => {
  const {
    type,
    region,
    prefecture,
    city,
    spot,
    title,
    description,
    // referenceLink,
    // referenceName,
  } = place;
  // const isSpot = type === "spot";
  const router = useRouter();
  const imageUrl = {
    prefecture: `https://jp-travel.s3.amazonaws.com/1/preview/prefecture/${region}_${prefecture}_1.webp`,
    city: `https://jp-travel.s3.amazonaws.com/1/preview/city/${prefecture}_${city}_1.webp`,
    spot: `https://jp-travel.s3.amazonaws.com/1/preview/spot/${city}_${spot}_1.webp`,
  };
  const placeName = {
    prefecture: prefecture,
    city: city,
    spot: spot?.replace(/-/g, " ").replace(/_/g, " / "),
  };
  const placeLink = {
    city: `/article/${region}/${prefecture}/${city}`,
    spot: `/article/${region}/${prefecture}/${city}/${spot}`,
    prefecture: `/article/${region}/${prefecture}`,
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
      p="6"
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
      rowGap="8"
      onClick={() => {
        router.push(placeLink?.[type] ?? `/article/${region}/${prefecture}`);
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
        {imageUrl?.[type] && (
          <Image
            alt={placeName?.[type]}
            width="2048"
            height="2048"
            src={imageUrl?.[type]}
            style={{
              objectFit: "cover",
              width: "inherit",
              height: "inherit",
            }}
          />
        )}
        {/* <Flex
          fontSize="xs"
          w="full"
          color="neutral.600"
          whiteSpace="nowrap"
          justifyContent="flex-end"
          mt="1"
        >
          <Link
            href={referenceLink ?? ""}
            display="flex"
            alignItems="center"
            columnGap="1"
            target="_blank"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {referenceName}. {placeName}.{" "}
            <ExternalLinkSvg w="3" h="3" color="neutral.600" />
          </Link>
        </Flex> */}
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
              // color="neutral.700"
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
            Read more...
          </Text>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default PlaceCard;
