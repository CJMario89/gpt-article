import { Container, Flex } from "@chakra-ui/react";
import { getAllPlaces, getArticle, getPhoto } from "backend-service/get";
import { jsonlize } from "utils/jsonlize";
import { Blog } from "component/blog";

export const getStaticPaths = async () => {
  const cities = await getAllPlaces({ type: "spot" });
  return {
    paths: cities.map(({ country, city, spot }) => ({
      params: {
        country,
        city,
        spot,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { country, city, spot } = params;
  const article = await getArticle({
    type: "spot",
    country,
    city,
    spot,
    status: 1,
  });
  const photo = await getPhoto({ type: "spot", country, city, spot });
  return {
    props: { article, spot, photo: jsonlize(photo) },
  };
};

//SEO, share, other function
//image cache control
//what attract people
//backend structure
//frontend structure
//product structure
const index = ({ article = {}, photo }) => {
  return (
    <Container
      as={Flex}
      maxW="container.md"
      p="8"
      flexDirection="column"
      alignItems="center"
    >
      <Blog photo={photo} article={article} />
    </Container>
  );
};

export default index;
