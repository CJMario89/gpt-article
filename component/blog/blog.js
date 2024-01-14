import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Markdown from "component/Markdown";
import { processArticleInBlog } from "utils/article";
import Loading from "component/Loading";
import { useRef, useState } from "react";
import PhotoDisplayer from "./photo-displayer";
import WheelchairSvg from "assets/wheelchair.svg";
import GroupSvg from "assets/group.svg";
import PetsSvg from "assets/pets.svg";
import KidSvg from "assets/kid.svg";
import ExternalLinkSvg from "assets/external-link-svg";
import NextLink from "next/link";
import DOMPurify from "isomorphic-dompurify";
import RouterTab from "./router-tab";
import PlaceCard from "./place-card";

const OtherPlaces = ({ region, type, nearPlaces, title }) => {
  return (
    <Flex flexDirection="column" mt="8" alignItems="center">
      <Heading as="h2">{title}</Heading>
      <Box overflowX="auto">
        <Flex flexDirection={{ base: "column", md: "row" }} w="max-content">
          {nearPlaces?.map((place) => (
            <PlaceCard
              key={place.spot}
              isHorizontal
              place={{ type, region, ...place }}
            />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

const Blog = ({ info, nearCities, nearSpots, nearRestuarants }) => {
  const {
    region,
    prefecture,
    city,
    spot,
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
  } = info;
  const contents = processArticleInBlog(content) ?? [];
  const photoRef = useRef(null);
  const [photoFloat, setPhotoFloat] = useState(false);
  const image = `/image/spot/${city}_${spot}_${images?.[0]?.fetched}.webp`;
  const friendlyList = [
    {
      Svg: KidSvg,
      value: goodForChildren,
      description: "Children friendly",
    },
    {
      Svg: GroupSvg,
      value: goodForGroups,
      description: "Group friendly",
    },
    {
      Svg: PetsSvg,
      value: allowsDogs,
      description: "Allow pets",
    },
    {
      Svg: WheelchairSvg,
      value: wheelchairAccessibleEntrance,
      description: "Wheelchair entrance",
    },
  ];
  const nearPlaces = [
    {
      title: `Spots nearby ${spot}`,
      type: "spot",
      nearPlaces: nearSpots,
    },
    {
      title: `Cities nearby ${city}`,
      type: "city",
      nearPlaces: nearCities,
    },

    {
      title: `Restuarant nearby ${spot}`,
      type: "spot",
      nearPlaces: nearRestuarants,
    },
  ];
  return (
    <Container
      as={Flex}
      maxW="container.lg"
      px={{ base: "2", md: "8" }}
      flexDirection="column"
      alignItems="center"
    >
      {info?.title ? (
        <Flex w="inherit" flexDirection="column" rowGap="2" mt="4">
          <RouterTab
            region={region}
            prefecture={prefecture}
            city={city}
            spot={spot}
          />
          <Heading as="h1">{spot.replace(/-/g, " ")}</Heading>
          <Flex columnGap="2" mb="1">
            {categories.map(({ category }) => {
              return <Tag key={category}>{category.replace(/_/g, " ")}</Tag>;
            })}
          </Flex>
          <PhotoDisplayer
            photo={{
              image,
              referenceLink: images[0].referenceLink,
              referenceName: images[0].referenceName,
            }}
            name={spot}
            ref={photoRef}
            w={photoFloat ? "60%" : "full"}
            float={photoFloat ? "left" : "none"}
            // p="6"
            setPhotoFloat={(bool) => {
              setPhotoFloat(bool);
            }}
          />
          {/* <Flex columnGap="4">
            <Button
              onClick={() => {
                document
                  .querySelector("#info")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Info
            </Button>
            <Button
              onClick={() => {
                document
                  .querySelector("#other-spots")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Other Spots
            </Button>
          </Flex> */}
          <Box backgroundColor="gray.50" p="8">
            <Text fontSize="18px" fontWeight="semibold" lineHeight="32px">
              {description}
            </Text>
          </Box>
          {contents.map((content, i) => {
            return <Markdown key={i}>{content}</Markdown>;
          })}

          <Flex flexDirection={{ base: "column", md: "row" }} py="8">
            <Flex mt="4" flexDirection="column" rowGap="2" flex="1">
              <Heading as="h2">Opening Time</Heading>
              <Markdown>
                {weekdayDescriptions?.replace(/&/g, "  \n")}
                {/* .replace(/: /g, " : ")
                .replace(/:/g, " : ")} */}
              </Markdown>
            </Flex>
            <Flex mt="4" flexDirection="column" rowGap="2" flex="1">
              <Flex flexDirection="column" flex="1">
                <Heading as="h2">Google Map</Heading>
                <Link
                  as={NextLink}
                  color="neutral.800"
                  mt="4"
                  href={googleMapUrl}
                >
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(adrFormatAddress),
                    }}
                  />
                  <ExternalLinkSvg w="4" h="4" />
                </Link>
              </Flex>
              <Flex flexDirection="column" flex="1">
                <Heading as="h2">Other Info</Heading>
                <Flex columnGap="4" mt="4">
                  {friendlyList.map(({ Svg, value, description }) => {
                    return (
                      <Tooltip label={description} key={description}>
                        <span>
                          <Svg {...getIconOpacity(value)} />
                        </span>
                      </Tooltip>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Box id="other-spots" />
          {nearPlaces.map(({ type, nearPlaces, title }) => {
            return (
              <OtherPlaces
                key={type}
                title={title}
                region={region}
                type={type}
                nearPlaces={nearPlaces}
              />
            );
          })}
        </Flex>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

function getIconOpacity(condition) {
  return condition ? { opacity: 1 } : { opacity: 0.3 };
}
export default Blog;
