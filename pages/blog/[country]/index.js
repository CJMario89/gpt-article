import { Container, Flex, Heading } from "@chakra-ui/react";
import { getCountries, getPhoto, getPlacesByParams } from "backend-service/get";
import { PlaceCard } from "component/blog";
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
  console.log(cities);
  return { props: { country, cities } };
};

const Index = ({ country, cities = [] }) => {
  return (
    <Container maxW="container.md" as={Flex} flexDirection="column" rowGap="4">
      <Heading as="h2">{country}</Heading>
      <Flex flexDirection="column">
        {cities.map(({ city, title, description, photo }) => {
          return (
            <PlaceCard
              key={city}
              type="city"
              country={country}
              city={city}
              title={title}
              photo={photo}
              description={description}
            />
          );
        })}
      </Flex>
    </Container>
  );
};

export default Index;
