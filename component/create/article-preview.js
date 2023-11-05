import { Button, Flex, Heading } from "@chakra-ui/react";
import Markdown from "../Markdown";

const ArticlePreview = ({ article, postArticle, cancel }) => {
  const { title, description, content } = article;

  return (
    <Flex flexDirection="column" rowGap="4">
      <Heading as="h4">Title: {title}</Heading>
      <Heading as="h5">description: {description}</Heading>
      <Markdown>{content}</Markdown>
      <Button
        alignSelf="center"
        onClick={() => {
          postArticle();
        }}
      >
        Confirm
      </Button>
      <Button
        alignSelf="center"
        onClick={() => {
          cancel();
        }}
      >
        Cancel
      </Button>
    </Flex>
  );
};

export default ArticlePreview;
