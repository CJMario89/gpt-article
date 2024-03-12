import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Markdown from "component/Markdown";
import { processArticleInBlog } from "utils/article";
import Link from "component/NextLink";
import { useMemo, useRef } from "react";
import PhotoDisplayer from "./photo-displayer";
import WheelchairSvg from "assets/wheelchair.svg";
import GroupSvg from "assets/group.svg";
import PetsSvg from "assets/pets.svg";
import KidSvg from "assets/kid.svg";
import DOMPurify from "isomorphic-dompurify";
import RouterTab from "./router-tab";
import PlaceCard from "./place-card";
import Seo from "./seo";
import Catelogue from "./catelogue";
import useFavoritePlaces from "hooks/use-favorite-places";
import HeartSVG from "assets/heart.svg";
import HeartFillSVG from "assets/heart-fill.svg";
import { useTranslations } from "next-intl";
import LoadingSvg from "assets/loading.svg";

const OtherPlaces = ({ region, type, places, title }) => {
  return (
    <Flex flexDirection="column" mt="8" alignItems="center">
      <Heading as="h1" color="primary.800" alignSelf="self-start">
        {title}
      </Heading>
      <Box overflowX="auto" w="full" pb="1">
        <Flex flexDirection={{ base: "column", md: "row" }} w="max-content">
          {places?.map((place) => {
            return (
              <PlaceCard
                key={place?.spot ?? place?.city ?? place?.prefecture}
                isHorizontal
                place={{ type, region, ...place }}
              />
            );
          })}
        </Flex>
      </Box>
      {/* <Link
        mt="2"
        fontSize="md"
        alignSelf="self-start"
        color="primary.700"
        fontWeight="semibold"
        href={link}
        _hover={{
          color: "primary.600",
        }}
      >
        View more...
      </Link> */}
    </Flex>
  );
};

const Blog = ({
  info,
  nearCities,
  nearSpots,
  nearRestuarants,
  spotsIn,
  nearPrefectures,
  citiesIn,
  prefecturesIn,
}) => {
  const {
    region,
    prefecture,
    city,
    spot,
    title,
    description,
    content,
    adrFormatAddress,
    googleMapUrl,
    openTime,
    goodForChildren,
    goodForGroups,
    allowsDogs,
    wheelchairAccessibleEntrance,
    images,
    categories,
  } = info;
  const isSpot = !!spot;
  const isCity = !!city;
  const place = useMemo(() => {
    if (isSpot) {
      return { name: spot, type: "spot" };
    } else if (isCity) {
      return { name: city, type: "city" };
    } else {
      return {
        name: prefecture === "All" ? region : prefecture,
        type: prefecture === "All" ? "region" : "prefecture",
      };
    }
  }, [city, isCity, isSpot, prefecture, region, spot]);
  const t = useTranslations();
  const { isFavorited, addFavoritePlace, removeFavoritePlace } =
    useFavoritePlaces({ type: place.type, name: place.name, ...info });
  const contents = processArticleInBlog(content) ?? [];
  const photoRef = useRef(null);
  const imageUrl = images?.[0]?.imageUrl;

  console.log(imageUrl);

  const friendlyList = goodForChildren
    ? [
        {
          Svg: KidSvg,
          value: goodForChildren,
          description: t("Child friendly"),
        },
        {
          Svg: GroupSvg,
          value: goodForGroups,
          description: t("Group friendly"),
        },
        {
          Svg: PetsSvg,
          value: allowsDogs,
          description: t("Allow pets"),
        },
        {
          Svg: WheelchairSvg,
          value: wheelchairAccessibleEntrance,
          description: t("Wheelchair accessible"),
        },
      ]
    : [];
  const nearPlaces = [
    ...(prefecturesIn
      ? [
          {
            title: t(`Prefectures in {region}`, { region }),
            type: "prefecture",
            places: prefecturesIn,
          },
        ]
      : []),
    ...(citiesIn
      ? [
          {
            title: t(`Cities in {prefecture}`, { prefecture }),
            type: "city",
            places: citiesIn,
          },
        ]
      : []),
    ...(spotsIn
      ? [
          {
            title: t(`Spots in {city}`, { city }),
            type: "spot",
            places: spotsIn,
          },
        ]
      : []),
    ...(nearSpots
      ? [
          {
            title: t(`Spots nearby {spot}`, { spot }),
            type: "spot",
            places: nearSpots,
            link: ``,
          },
        ]
      : []),

    ...(nearCities
      ? [
          {
            title: t(`Cities nearby {city}`, { city }),
            type: "city",
            places: nearCities,
          },
        ]
      : []),
    ...(nearPrefectures
      ? [
          {
            title: t(`Prefectures nearby {prefecture}`, { prefecture }),
            type: "prefecture",
            places: nearPrefectures,
          },
        ]
      : []),
    ...(nearRestuarants
      ? [
          {
            title: t(`Restuarants nearby {spot}`, { spot }),
            type: "spot",
            places: nearRestuarants,
          },
        ]
      : []),
  ];

  return (
    <>
      <Seo title={title} description={description} imageUrl={imageUrl} />
      <Container
        as={Flex}
        maxW="container.lg"
        px={{ base: "2", md: "8" }}
        flexDirection="column"
        alignItems="center"
      >
        {info?.title ? (
          <Flex w="inherit" flexDirection="column" rowGap="2" mt="6">
            <RouterTab
              region={region}
              prefecture={prefecture}
              city={city}
              spot={spot}
            />
            <Flex justifyContent="space-between" alignItems="center">
              <Heading as="h1" color="primary.800">
                {place?.name?.replace(/-/g, " ")}
              </Heading>
              {place?.type !== "region" && (
                <Button
                  display="flex"
                  px="0"
                  onClick={
                    isFavorited
                      ? () => {
                          removeFavoritePlace({
                            name: place?.name,
                            type: place?.type,
                          });
                        }
                      : () => {
                          addFavoritePlace({
                            name: place?.name,
                            type: place?.type,
                            ...info,
                          });
                        }
                  }
                >
                  <Box w="5" h="5" position="relative">
                    <HeartFillSVG
                      position="absolute"
                      left="0"
                      opacity={isFavorited ? "1" : "0"}
                      trasition="opacity 0.3s"
                      w="5"
                      h="5"
                      color="primary.700"
                    />
                    <HeartSVG
                      position="absolute"
                      left="0"
                      opacity={isFavorited ? "0" : "1"}
                      trasition="opacity 0.3s"
                      w="5"
                      h="5"
                      color="primary.700"
                    />
                  </Box>
                </Button>
              )}
            </Flex>
            <Flex columnGap="2" mb="1">
              {Array.isArray(categories) &&
                categories.map(({ category }) => {
                  return (
                    <Tag key={category}>{t(category.replace(/_/g, " "))}</Tag>
                  );
                })}
            </Flex>
            <Flex
              flexDirection={{ base: "column-reverse", lg: "row" }}
              columnGap="12"
            >
              <Flex flexDirection="column" rowGap="2">
                <PhotoDisplayer
                  image={images?.[0]}
                  name={spot}
                  region={region}
                  prefecture={prefecture}
                  city={city}
                  spot={spot}
                  ref={photoRef}
                />
                <Box backgroundColor="primary.50" px="6" py="8">
                  <Text
                    fontSize="lg"
                    color="neutral.600"
                    fontWeight="medium"
                    lineHeight="32px"
                    id="description"
                  >
                    {description}
                  </Text>
                </Box>
                {contents.map((content, i) => {
                  return i === 11 && images?.[1] ? (
                    <Flex key={i} flexDirection="column" mt="8">
                      <PhotoDisplayer
                        image={images?.[1]}
                        name={spot}
                        region={region}
                        prefecture={prefecture}
                        city={city}
                        spot={spot}
                        ref={photoRef}
                      />
                      <Markdown key={i} className="_md" id={`M${i}`}>
                        {content}
                      </Markdown>
                    </Flex>
                  ) : (
                    <Markdown key={i} className="_md" id={`M${i}`}>
                      {content}
                    </Markdown>
                  );
                })}

                {isSpot && (
                  <Flex
                    flexDirection={{ base: "column", lg: "row" }}
                    py="8"
                    id="detail"
                  >
                    {Boolean(openTime) && (
                      <Flex mt="4" flexDirection="column" rowGap="2" flex="1">
                        <Heading as="h2" color="primary.300">
                          {t("Opening Hours")}
                        </Heading>
                        <Markdown fontSize="md" _before={{ display: "none" }}>
                          {openTime?.replace(/&/g, "  \n")}
                        </Markdown>
                      </Flex>
                    )}
                    <Flex mt="4" flexDirection="column" rowGap="4" flex="1">
                      {googleMapUrl && (
                        <Flex flexDirection="column" rowGap="4" flex="1">
                          <Heading as="h2" color="primary.300">
                            {t("Google Maps")}
                          </Heading>
                          <Link color="neutral.800" href={googleMapUrl}>
                            <Button
                              size="lg"
                              variant="solid"
                              borderRadius="full"
                              bgColor="primary.300"
                            >
                              {t("View on Google Maps")}
                            </Button>
                          </Link>
                          <Text
                            fontSize="sm"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(adrFormatAddress),
                            }}
                          />
                        </Flex>
                      )}
                      {Boolean(goodForChildren) && (
                        <Flex flexDirection="column" flex="1">
                          <Heading as="h2" color="primary.300">
                            {t("Other Info")}
                          </Heading>
                          <Flex columnGap="4" mt="4">
                            {friendlyList.map(({ Svg, value, description }) => {
                              return (
                                <Tooltip label={description} key={description}>
                                  <span>
                                    <Svg
                                      w="6"
                                      h="6"
                                      {...getIconOpacity(value)}
                                    />
                                  </span>
                                </Tooltip>
                              );
                            })}
                          </Flex>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                )}
              </Flex>
              <Catelogue
                contents={contents}
                place={place?.name}
                isSpot={isSpot}
              />
            </Flex>
            <Box id="other-spots" />
            {nearPlaces.map(({ type, places, title }, i) => {
              return places?.length > 0 ? (
                <OtherPlaces
                  key={title}
                  title={title}
                  region={region}
                  type={type}
                  places={places}
                />
              ) : (
                <Box key={i} />
              );
            })}
          </Flex>
        ) : (
          <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
            <LoadingSvg w="12" h="12" />
          </Flex>
        )}
      </Container>
    </>
  );
};

function getIconOpacity(condition) {
  return condition ? { opacity: 1 } : { opacity: 0.3 };
}
export default Blog;
