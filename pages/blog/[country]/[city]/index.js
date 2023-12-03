import { Container, Flex } from "@chakra-ui/react";
import {
  getAllPlaces,
  getArticle,
  getPlacesByParams,
} from "backend-service/get";
import { Blog } from "component/blog";
import { jsonlize } from "utils/jsonlize";

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
  const article = await getArticle({ type: "city", country, city });
  const spots = await Promise.all(
    (
      await getPlacesByParams({
        type: "spot",
        country,
        city,
        page: 1,
        limit: 10,
      })
    ).places.map((spot) => {
      return jsonlize(spot);
    })
  );
  return {
    props: { article: jsonlize(article), city, spots },
  };
};

//SEO, share, other function

const index = ({ article = {}, spots = [] }) => {
  return (
    <Container
      as={Flex}
      maxW="container.md"
      p="8"
      flexDirection="column"
      alignItems="center"
    >
      <Blog article={article} spots={spots} />
    </Container>
  );
};

export default index;
