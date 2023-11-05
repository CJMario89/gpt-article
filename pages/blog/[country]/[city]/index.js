import { Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import Markdown from "component/Markdown";
import {
  getAllPlaces,
  getArticle,
  getPlacesByParams,
} from "backend-service/get";
import Image from "next/image";
import { CityCard } from "component/blog";

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
  const image = await import(`../../../../public/${city}.png`);
  const spots = await Promise.all(
    (
      await getPlacesByParams({ country, city, status: 1 })
    ).map(async (article) => {
      const image = await import(`../../../../public/${article.spots}.png`);
      return {
        ...article,
        image: JSON.parse(JSON.stringify(image)),
      };
    })
  );
  return {
    props: { article, image: JSON.parse(JSON.stringify(image)), spots },
  };
};

//SEO, share, other function
//article of spot is a short description
//image cache control
//what attract people
//backend structure
//frontend structure
//product structure
const index = ({ article, image, city, spots }) => {
  return (
    <Container
      as={Flex}
      maxW="container.lg"
      p="8"
      flexDirection="column"
      alignItems="center"
    >
      <Flex w="fit-content" flexDirection="column">
        <Image alt={city} src={image} />
        <Markdown>{article?.content}</Markdown>
      </Flex>
      <Flex flexDirection="column" rowGap="4">
        <Heading as="h2">Spots in {city}</Heading>
        <SimpleGrid gap="8" columns={{ sm: "2", md: "3" }}>
          {spots.map(({ city, title, description, image }) => {
            return (
              <CityCard
                key={city}
                country={city}
                city={city}
                title={title}
                image={image}
                description={description}
              />
            );
          })}
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default index;
