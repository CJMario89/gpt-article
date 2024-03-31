import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Tag,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import Markdown from "component/Markdown";
import { processArticleInBlog } from "utils/article";
import Link from "component/NextLink";
import { useMemo } from "react";
import PhotoDisplayer from "./photo-displayer";
import WheelchairSvg from "assets/wheelchair.svg";
import GroupSvg from "assets/group.svg";
import PetsSvg from "assets/pets.svg";
import KidSvg from "assets/kid.svg";
import DOMPurify from "isomorphic-dompurify";
import RouterTab from "./router-tab";
import PlaceCard, { priceMap } from "./place-card";
import Seo from "./seo";
import Catelogue from "./catelogue";
import useFavoritePlaces from "hooks/use-favorite-places";
import HeartSVG from "assets/heart.svg";
import HeartFillSVG from "assets/heart-fill.svg";
import { useTranslations } from "next-intl";
import LoadingSvg from "assets/loading.svg";
import { useRouter } from "next/router";
import LocationSVG from "assets/location.svg";
import ExternalLinkSvg from "assets/external-link-svg";

const OtherPlaces = ({ region, type, places, title }) => {
  return (
    <Flex flexDirection="column" mt="8" alignItems="center">
      <Heading
        as="h1"
        color="primary.800"
        alignSelf={{ base: "center", lg: "self-start" }}
      >
        {title}
      </Heading>
      <Box
        w="full"
        mt="4"
        borderRadius="2xl"
        p="4"
        boxShadow="0 0 10px #c2c2c2"
      >
        <Box overflowX="auto" w="full" pb="1">
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            w="max-content"
            m="auto"
          >
            {places?.map((place) => {
              return (
                <PlaceCard
                  key={place?.spot || place?.city || place?.prefecture}
                  isHorizontal
                  place={{ type, region, ...place }}
                />
              );
            })}
          </Flex>
        </Box>
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
  const { locale } = useRouter();
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
    weekdayDescriptions,
    goodForChildren,
    goodForGroups,
    allowsDogs,
    wheelchairAccessibleEntrance,
    images,
    categories,
    articleIndex,
    articleType,
    priceLevel,
    website,
    googleWebsite,
  } = info;
  const isSpot = !!spot;
  const isCity = !!city;
  const place = useMemo(() => {
    if (isSpot) {
      return { name: spot, type: "spot", translation: articleIndex?.spot };
    } else if (isCity) {
      return { name: city, type: "city", translation: articleIndex?.city };
    } else {
      return {
        name: prefecture === "All" ? region : prefecture,
        type: prefecture === "All" ? "region" : "prefecture",
        translation: articleIndex?.prefecture,
      };
    }
  }, [
    articleIndex?.city,
    articleIndex?.prefecture,
    articleIndex?.spot,
    city,
    isCity,
    isSpot,
    prefecture,
    region,
    spot,
  ]);
  const t = useTranslations();
  const { isFavorited, addFavoritePlace, removeFavoritePlace } =
    useFavoritePlaces({ type: place.type, name: place.name, ...info });
  const contents = processArticleInBlog(content) ?? [];
  const imageUrl = images?.[0]?.imageUrl;
  const kidDisclosure = useDisclosure();
  const groupDisclosure = useDisclosure();
  const petsDisclosure = useDisclosure();
  const wheelchairDisclosure = useDisclosure();

  const replaceOpenHours = (weekdayDescriptions) => {
    const mapObj = {
      Monday: t("Monday"),
      Tuesday: t("Tuesday"),
      Wednesday: t("Wednesday"),
      Thursday: t("Thursday"),
      Friday: t("Friday"),
      Saturday: t("Saturday"),
      Sunday: t("Sunday"),
      Closed: t("Closed"),
      "Open 24 hours": t("Open 24 hours"),
    };
    return weekdayDescriptions.replace(
      /Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Closed|Open 24 hours/gi,
      function (matched) {
        return mapObj[matched];
      }
    );
  };
  const friendlyList = goodForChildren
    ? [
        {
          Svg: KidSvg,
          value: goodForChildren,
          description: t("Child friendly"),
          disclosure: kidDisclosure,
        },
        {
          Svg: GroupSvg,
          value: goodForGroups,
          description: t("Group friendly"),
          disclosure: groupDisclosure,
        },
        {
          Svg: PetsSvg,
          value: allowsDogs,
          description: t("Allow pets"),
          disclosure: petsDisclosure,
        },
        {
          Svg: WheelchairSvg,
          value: wheelchairAccessibleEntrance,
          description: t("Wheelchair accessible"),
          disclosure: wheelchairDisclosure,
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
        px={{ base: "4", md: "8" }}
        flexDirection="column"
        alignItems="center"
      >
        {info?.title ? (
          <Flex
            w="inherit"
            flexDirection="column"
            rowGap={{ base: "1", lg: "2" }}
            mt={{ base: "2", lg: "6" }}
          >
            <RouterTab
              region={region}
              prefecture={prefecture}
              city={city}
              spot={spot}
              index={articleIndex}
            />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              rowGap="2"
            >
              <Flex
                alignItems="center"
                columnGap="8"
                rowGap="2"
                flexWrap="wrap"
              >
                <Heading as="h1" color="primary.800">
                  {place?.name?.replace(/-/g, " ")}
                </Heading>
                {locale === "zh-TW" && articleType === "spot" && (
                  <Heading as="h3" color="primary.800">
                    ( {place?.translation} )
                  </Heading>
                )}
              </Flex>
              {place?.type !== "region" && (
                <IconButton
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
                  icon={
                    isFavorited ? (
                      <HeartFillSVG
                        trasition="opacity 0.3s"
                        w="5"
                        h="5"
                        color="primary.700"
                      />
                    ) : (
                      <HeartSVG
                        trasition="opacity 0.3s"
                        w="5"
                        h="5"
                        color="primary.700"
                      />
                    )
                  }
                />
              )}
            </Flex>
            <Flex
              columnGap="2"
              mb="1"
              alignItems="center"
              flexWrap="wrap"
              rowGap="2"
            >
              {Array.isArray(categories) &&
                categories.map(({ category }) => {
                  return (
                    <Tag key={category}>{t(category.replace(/_/g, " "))}</Tag>
                  );
                })}
              {priceLevel && (
                <Text fontSize="xs" color="primary.700">
                  ( {priceMap[priceLevel]} )
                </Text>
              )}
            </Flex>
            <Flex
              flexDirection={{ base: "column-reverse", lg: "row" }}
              columnGap="12"
            >
              <Flex flexDirection="column" rowGap="2">
                <PhotoDisplayer
                  image={images?.[0]}
                  name={place?.name}
                  region={region}
                  prefecture={prefecture}
                  city={city}
                  spot={spot}
                />
                <Box backgroundColor="primary.50" px="6" py="6" mt="4">
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
                  if (i === 6 && images?.[1]) {
                    return (
                      <Flex key={i} flexDirection="column" mt="8">
                        <PhotoDisplayer
                          image={images?.[1]}
                          name={place?.name}
                          region={region}
                          prefecture={prefecture}
                          city={city}
                          spot={spot}
                        />
                        <Markdown key={i} className="_md" id={`M${i}`}>
                          {content}
                        </Markdown>
                      </Flex>
                    );
                  } else if (i === 14 && images?.[2]) {
                    return (
                      <Flex key={i} flexDirection="column" mt="8">
                        <PhotoDisplayer
                          image={images?.[2]}
                          name={place?.name}
                          region={region}
                          prefecture={prefecture}
                          city={city}
                          spot={spot}
                        />
                        <Markdown key={i} className="_md" id={`M${i}`}>
                          {content}
                        </Markdown>
                      </Flex>
                    );
                  } else if (i === 20 && images?.[3]) {
                    return (
                      <Flex key={i} flexDirection="column" mt="8">
                        <PhotoDisplayer
                          image={images?.[3]}
                          name={place?.name}
                          region={region}
                          prefecture={prefecture}
                          city={city}
                          spot={spot}
                        />
                        <Markdown key={i} className="_md" id={`M${i}`}>
                          {content}
                        </Markdown>
                      </Flex>
                    );
                  } else {
                    return (
                      <Markdown key={i} className="_md" id={`M${i}`}>
                        {content}
                      </Markdown>
                    );
                  }
                })}

                {isSpot && (
                  <Flex flexDirection="column" py="8" gap="4">
                    <Flex
                      flexDirection={{ base: "column", lg: "row" }}
                      id="detail"
                    >
                      {Boolean(weekdayDescriptions) && (
                        <Flex mt="4" flexDirection="column" rowGap="2" flex="1">
                          <Heading as="h2" color="primary.300">
                            {t("Opening Hours")}
                          </Heading>
                          <Markdown fontSize="md" _before={{ display: "none" }}>
                            {replaceOpenHours(weekdayDescriptions)?.replace(
                              /&/g,
                              "  \n"
                            )}
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
                                size="md"
                                variant="solid"
                                borderRadius="full"
                                bgColor="primary.300"
                                as={Flex}
                                gap="2"
                              >
                                <LocationSVG />
                                {t("View on Google Maps")}
                              </Button>
                            </Link>
                            <Flex gap="2">
                              <LocationSVG mt="1" />
                              <Text
                                fontSize="sm"
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(adrFormatAddress),
                                }}
                                maxW="250px"
                              />
                            </Flex>
                          </Flex>
                        )}
                        {Boolean(goodForChildren) && (
                          <Flex flexDirection="column" flex="1">
                            <Heading as="h2" color="primary.300">
                              {t("Other Info")}
                            </Heading>
                            <Flex columnGap="4" mt="4">
                              {friendlyList.map(
                                ({ Svg, value, description, disclosure }) => {
                                  return (
                                    <Tooltip
                                      label={description}
                                      key={description}
                                      isOpen={disclosure.isOpen}
                                    >
                                      <IconButton
                                        w="6"
                                        h="6"
                                        onMouseEnter={disclosure.onOpen}
                                        onMouseLeave={disclosure.onClose}
                                        onClick={disclosure.onToggle}
                                        icon={
                                          <Svg
                                            w="6"
                                            h="6"
                                            {...getIconOpacity(value)}
                                          />
                                        }
                                      />
                                    </Tooltip>
                                  );
                                }
                              )}
                            </Flex>
                          </Flex>
                        )}
                      </Flex>
                    </Flex>
                    <Flex>
                      {Boolean(website) ||
                        (Boolean(googleWebsite) && (
                          <Flex flexDirection="column" rowGap="4">
                            <Heading as="h2" color="primary.300">
                              {t("Official Website")}
                            </Heading>
                            <Link href={website || googleWebsite}>
                              <Button
                                size="md"
                                variant="solid"
                                borderRadius="full"
                                bgColor="primary.300"
                                as={Flex}
                                gap="2"
                                alignItems="center"
                              >
                                {spot} <ExternalLinkSvg />
                              </Button>
                            </Link>
                          </Flex>
                        ))}
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
