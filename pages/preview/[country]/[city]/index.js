import { getArticle } from "../../../api/sql-query/get-article";
import { getCities } from "../../../api/sql-query/get-cities";
import { Button, Container, Flex, Textarea } from "@chakra-ui/react";

export const getStaticPaths = async () => {
  const cities = await getCities({});
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
  const article = await getArticle({ country, city });
  return { props: { article: JSON.parse(JSON.stringify(article)) } };
};
const index = ({ article }) => {
  return (
    <Container
      as={Flex}
      maxW="container.lg"
      p="8"
      flexDirection="column"
      alignItems="center"
    >
      <Flex w="full" flexDirection="column" rowGap="8">
        <Textarea w="full" h="85vh" resize="none">
          {article.content}
        </Textarea>
        <Flex columnGap="4">
          <Button>Confirm</Button>
          <Button>Cancel</Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default index;
