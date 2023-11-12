import { Container, Flex } from "@chakra-ui/react";
import {
  getAllPlaces,
  getArticle,
  getPhoto,
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
  console.log(article);
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
const index = ({ article = {}, photo, spots = [] }) => {
  return (
    <Container
      as={Flex}
      maxW="container.md"
      p="8"
      flexDirection="column"
      alignItems="center"
    >
      <Blog photo={photo} article={article} spots={spots} />
    </Container>
  );
};

export default index;
