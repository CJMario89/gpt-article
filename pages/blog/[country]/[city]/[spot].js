import { Container, Flex } from "@chakra-ui/react";
import Markdown from "component/Markdown";
import { getAllPlaces, getArticle } from "backend-service/get";
import Image from "next/image";

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
  const image = await import(`../../../../public/${spot}.png`);
  return {
    props: { article, image: JSON.parse(JSON.stringify(image)), spot },
  };
};

//SEO, share, other function
//article of spot is a short description
//image cache control
//what attract people
//backend structure
//frontend structure
//product structure
const index = ({ article, image, spot }) => {
  return (
    <Container
      as={Flex}
      maxW="container.lg"
      p="8"
      flexDirection="column"
      alignItems="center"
    >
      <Flex w="fit-content" flexDirection="column">
        <Image alt={spot} src={image} />
        <Markdown>{article?.content}</Markdown>
      </Flex>
    </Container>
  );
};

export default index;
