import { Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { getCountries, getPhoto, getPlacesByParams } from "backend-service/get";
import { PlaceCard } from "component/blog";
import Link from "next/link";
import { jsonlize } from "utils/jsonlize";

export const getStaticPaths = async () => {
  const countries = await getCountries();
  return {
    paths: countries.map(({ country }) => ({
      params: {
        country,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { country } = params;
  const cities = await Promise.all(
    (
      await getPlacesByParams({ type: "city", country, status: 1 })
    ).map(async ({ country, city, title, description }) => {
      const photo = await getPhoto({ type: "city", country, city });
      return {
        country,
        city,
        title,
        description,
        photo: jsonlize(photo),
      };
    })
  );
  console.log(cities);
  return { props: { country, cities } };
};

const Index = ({ country, cities = [] }) => {
  return (
    <Container maxW="container.lg" as={Flex} flexDirection="column" rowGap="4">
      <Heading as="h2">{country}</Heading>
      <SimpleGrid gap="8" columns={{ sm: "2", md: "3" }}>
        {cities.map(({ city, title, description, photo }) => {
          const { referenceLink, referenceName } = photo;
          return (
            <Flex key={city} flexDirection="column">
              <PlaceCard
                key={city}
                type="city"
                country={country}
                city={city}
                title={title}
                photo={photo}
                description={description}
              />
              <Link href={referenceLink} target="_blank">
                {referenceName}
              </Link>
            </Flex>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default Index;
