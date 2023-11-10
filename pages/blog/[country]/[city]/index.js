import { Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import Markdown from "component/Markdown";
import {
  getAllPlaces,
  getArticle,
  getPhoto,
  getPlacesByParams,
} from "backend-service/get";
import { PlaceCard } from "component/blog";
import { jsonlize } from "utils/jsonlize";
import { PhotoDisplayer } from "component/create";
import Link from "next/link";

export const getStaticPaths = async () => {
  const cities = await getAllPlaces({ type: "city" });
  return {
    paths: cities.map(({ country, city }) => ({
      params: {
        country,
        city,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { country, city } = params;
  const article = await getArticle({ type: "city", country, city, status: 1 });
  const photo = await getPhoto({ type: "city", country, city });
  const spots = await Promise.all(
    (
      await getPlacesByParams({ type: "spot", country, city, status: 1 })
    ).map(async ({ country, city, spot, title, description }) => {
      const photo = await getPhoto({ type: "spot", country, city, spot });
      return {
        country,
        city,
        spot,
        title,
        description,
        photo: jsonlize(photo),
      };
    })
  );
  return {
    props: { article, city, photo: jsonlize(photo), spots },
  };
};

//SEO, share, other function
//article of spot is a short description
//image cache control
//what attract people
//backend structure
//frontend structure
//product structure
const index = ({ article, city, photo, spots = [] }) => {
  return (
    <Container
      as={Flex}
      maxW="container.lg"
      p="8"
      flexDirection="column"
      alignItems="center"
    >
      <Flex w="fit-content" flexDirection="column">
        <PhotoDisplayer photo={photo} />
        <Markdown>{article?.content}</Markdown>
      </Flex>
      <Flex w="full" flexDirection="column" rowGap="4">
        <Heading as="h2">Spots in {city}</Heading>
        <SimpleGrid gap="8" columns={{ sm: "2", md: "3" }}>
          {spots.map(({ country, city, spot, title, description, photo }) => {
            const { referenceLink, referenceName } = photo;
            return (
              <Flex key={spot} flexDirection="column">
                <PlaceCard
                  type="spot"
                  country={country}
                  city={city}
                  spot={spot}
                  title={title}
                  photo={photo}
                  description={description}
                />
                <Link href={referenceLink} target="_blank">
                  Photo reference: {referenceName}
                </Link>
              </Flex>
            );
          })}
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default index;
