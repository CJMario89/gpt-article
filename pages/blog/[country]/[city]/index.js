import { Container, Flex } from "@chakra-ui/react";
import Markdown from "component/Markdown";
import { getCities, getCityArticle } from "backend-service/get";

export const getStaticPaths = async () => {
  const cities = await getCities();
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
  const article = await getCityArticle({ country, city, status: 1 });
  return { props: { article: JSON.parse(JSON.stringify(article)) } };
};

//SEO, share, other function
//article of spot is a short description
//image cache control
//what attract people
//backend structure
//frontend structure
//product structure
const index = ({ article }) => {
  return (
    <Container
      as={Flex}
      maxW="container.lg"
      p="8"
      flexDirection="column"
      alignItems="center"
    >
      <Flex w="fit-content" flexDirection="column">
        <Markdown>{article?.content}</Markdown>
      </Flex>
    </Container>
  );
};

export default index;
