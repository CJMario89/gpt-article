import { Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { getCountries, getPlacesByParams } from "backend-service/get";
import { PlaceCard } from "component/blog";

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
      await getPlacesByParams({ country, status: 1 })
    ).map(async (article) => {
      const image = await import(`../../../public/${article.city}.png`);
      return {
        ...article,
        image: JSON.parse(JSON.stringify(image)),
      };
    })
  );
  return { props: { country, cities } };
};

const Index = ({ country, cities }) => {
  return (
    <Container maxW="container.lg" as={Flex} flexDirection="column" rowGap="4">
      <Heading as="h2">{country}</Heading>
      <SimpleGrid gap="8" columns={{ sm: "2", md: "3" }}>
        {cities.map(({ city, title, description, image }) => {
          return (
            <PlaceCard
              key={city}
              type="city"
              country={country}
              city={city}
              title={title}
              image={image}
              description={description}
            />
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default Index;
