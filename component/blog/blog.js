import { Flex, Heading, Text } from "@chakra-ui/react";
import Markdown from "component/Markdown";
import { PhotoDisplayer } from "component/create";
import { processArticleInBlog } from "utils/article";
import PlaceCard from "./place-card";

const Blog = ({ photo, article, spots = [] }) => {
  const { title, description, content } = article;
  const contents = processArticleInBlog(content);
  let placeCardCount = 0;
  return (
    <Flex w="fit-content" flexDirection="column">
      <PhotoDisplayer photo={photo} />
      <Heading as="h1" my="12">
        {title}
      </Heading>
      <Flex justifyContent="center" backgroundColor="gray.50" p="12" mx="8">
        <Text fontSize="18px" fontWeight="semibold" lineHeight="32px">
          {description}
        </Text>
      </Flex>
      {contents.map((content, i) => {
        const canInsertPlaceCard =
          content.split(" ")[0] === "##" && i > 3 && placeCardCount < 3; //before h2 and not first
        if (canInsertPlaceCard) {
          placeCardCount++;
        }
        return (
          <>
            {canInsertPlaceCard && (
              <PlaceCard mt="12" {...spots[placeCardCount - 1]} />
            )}
            <Markdown key={i}>{content}</Markdown>
          </>
        );
      })}
    </Flex>
  );
};

export default Blog;
