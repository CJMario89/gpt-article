import { Container, Flex, Heading } from "@chakra-ui/react";
import Markdown from "component/Markdown";
import { getAllPlaces, getArticle, getPhoto } from "backend-service/get";
import { jsonlize } from "utils/jsonlize";
import { PhotoDisplayer } from "component/create";

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
const index = ({ article, photo }) => {
  const { title, description, content } = article;
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
        <Heading as="h2">{title}</Heading>
        <Heading as="h5">{description}</Heading>
        <Markdown>{content}</Markdown>
      </Flex>
    </Container>
  );
};

export default index;
