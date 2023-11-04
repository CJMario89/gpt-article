import { Button, Flex, Heading } from "@chakra-ui/react";
import Markdown from "../Markdown";
import { usePostCityArticle } from "hooks/db";

const CityArticlePreview = ({ country, city, article, clearPreview }) => {
  const { title, description, content } = article;

  const { mutate: postArticle } = usePostCityArticle({
    onSuccess: () => {
      alert("success");
      clearPreview();
    },
  });
  return (
    <Flex flexDirection="column" rowGap="4">
      <Heading as="h4">Title: {title}</Heading>
      <Heading as="h5">description: {description}</Heading>
      <Markdown>{content}</Markdown>
      <Button
        alignSelf="center"
        onClick={() => {
          postArticle({ country, city, article });
        }}
      >
        Confirm
      </Button>
      <Button
        alignSelf="center"
        onClick={() => {
          clearPreview();
        }}
      >
        Cancel
      </Button>
    </Flex>
  );
};

export default CityArticlePreview;
