import { Button, Container, Flex, Heading, Textarea } from "@chakra-ui/react";
import { getCities, getCityArticle } from "backend-service/get";
import Markdown from "component/Markdown";
import { useNewSpots, useNewSpotsArticle } from "hooks/ai";
import { usePostArticle } from "hooks/db";
import { useNewCityPhoto } from "hooks/google";
import { useState } from "react";

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
  console.log(country);
  console.log(city);
  const article = await getCityArticle({ country, city });
  return {
    props: { article: JSON.parse(JSON.stringify(article)), country, city },
  };
};
const Index = ({ article, city, country }) => {
  const [spot, setSpot] = useState();
  const { title, description, content } = article;
  const { mutate: newCityPhoto, data } = useNewCityPhoto();
  console.log(data);

  const { mutate: postArticle, isLoading, isSuccess } = usePostArticle();

  const { mutate: newSpots, data: spots } = useNewSpots();
  const { mutate: newSpotArticle, data: spotArticle } = useNewSpotsArticle();
  // const {mutate:newPhoto, data:photo} = useNewCityPhoto()

  console.log(isSuccess);
  return (
    <Container
      as={Flex}
      maxW="container.lg"
      p="8"
      flexDirection="column"
      alignItems="center"
    >
      <form
        style={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          postArticle({
            country,
            city,
            article: {
              title: e.target.title.value,
              description: e.target.description.value,
              content: e.target.content.value,
            },
          });
        }}
      >
        <Flex w="full" flexDirection="column" rowGap="8">
          <Heading as="h5">Title</Heading>
          <Textarea name="title" w="full" resize="none" defaultValue={title} />
          <Heading as="h5">Description</Heading>
          <Textarea
            name="description"
            w="full"
            h="25vh"
            resize="none"
            defaultValue={description}
          />

          <Heading as="h5">Content</Heading>
          <Textarea
            name="content"
            w="full"
            h="85vh"
            resize="none"
            defaultValue={content}
          />
          <Flex columnGap="4">
            <Button isLoading={isLoading} isDisabled={isLoading} type="submit">
              Confirm
            </Button>
            <Button>Cancel</Button>
          </Flex>
          <Button
            onClick={() => {
              newCityPhoto({ city });
            }}
            alignSelf="self-start"
          >
            New photo
          </Button>
          <Flex flexDirection="column" rowGap="4">
            <Heading as="h5">Spots</Heading>
            <Button
              onClick={() => {
                newSpots({ city });
              }}
              alignSelf="self-start"
            >
              add spots
            </Button>
            <Flex columnGap="4">
              {Array.isArray(spots) &&
                spots.map((spot) => {
                  return (
                    <Button
                      key={spot}
                      onClick={() => {
                        setSpot(spot);
                      }}
                    >
                      {spot}
                    </Button>
                  );
                })}
            </Flex>
            <Flex flexDirection="column" rowGap="4">
              <Heading as="h4">{spot}</Heading>
              <Markdown>{spotArticle}</Markdown>
              {/* <Image alt="" src={}/> */}
              <Button
                onClick={() => {
                  newSpotArticle({ spots: [spot] });
                }}
                alignSelf="self-start"
              >
                Generate introduction
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </Container>
  );
};

export default Index;
