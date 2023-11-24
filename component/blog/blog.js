import { Flex, Heading, Text } from "@chakra-ui/react";
import Markdown from "component/Markdown";
import { PhotoDisplayer } from "component/create";
import { processArticleInBlog } from "utils/article";
import PlaceCard from "./place-card";

const Blog = ({ article, spots = [] }) => {
  console.log(article);
  const {
    spot,
    title,
    description,
    content,
    image,
    image_reference_link,
    image_reference_name,
  } = article;
  const contents = processArticleInBlog(content);
  let placeCardCount = 0;
  return (
    <Flex w="fit-content" flexDirection="column">
      <PhotoDisplayer
        photo={{ image, image_reference_link, image_reference_name }}
      />
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
            {canInsertPlaceCard && !spot && (
              <PlaceCard
                mt="12"
                place={{ type: "spot", ...spots[placeCardCount - 1] }}
              />
            )}
            <Markdown key={i}>{content}</Markdown>
          </>
        );
      })}
    </Flex>
  );
};

export default Blog;
