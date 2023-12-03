import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Markdown from "component/Markdown";
import { PhotoDisplayer } from "component/create";
import { processArticleInBlog } from "utils/article";
import PlaceCard from "./place-card";
import Loading from "component/Loading";
import { useRef, useState } from "react";

const Blog = ({ article, spots = [] }) => {
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
  const photoRef = useRef(null);
  const [photoFloat, setPhotoFloat] = useState(false);

  return (
    <>
      {article?.title ? (
        <Flex w="fit-content" flexDirection="column">
          <Heading as="h1" my="12">
            {title}
          </Heading>
          <Box backgroundColor="gray.50" p="8">
            <PhotoDisplayer
              photo={{ image, image_reference_link, image_reference_name }}
              ref={photoRef}
              w={photoFloat ? "60%" : "full"}
              float={photoFloat ? "left" : "none"}
              p="6"
              setPhotoFloat={(bool) => {
                setPhotoFloat(bool);
              }}
            />
            <Text fontSize="18px" fontWeight="semibold" lineHeight="32px" p="6">
              {description}
            </Text>
          </Box>
          {contents.map((content, i) => {
            const canInsertPlaceCard =
              content.split(" ")[0] === "##" && i > 3 && placeCardCount < 3; //before h2 and not first
            if (canInsertPlaceCard) {
              placeCardCount++;
            }
            return (
              <Flex flexDirection="column" columnGap="4" key={i}>
                {canInsertPlaceCard && !spot && (
                  <PlaceCard
                    mt="12"
                    place={{ type: "spot", ...spots[placeCardCount - 1] }}
                  />
                )}
                <Markdown key={i}>{content}</Markdown>
              </Flex>
            );
          })}
        </Flex>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Blog;
