import { Button, Container, Flex, Heading, Textarea } from "@chakra-ui/react";
import { getAllPlaces, getArticle, getPhoto } from "backend-service/get";
import { PhotoDisplayer } from "component/create";
import GooglePhotoGenerator from "component/create/google-photo-generator";
import { usePostArticle } from "hooks/db";
import { jsonlize } from "utils/jsonlize";

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
  console.log(spot);
  const article = await getArticle({ type: "spot", country, city, spot });
  const photo = await getPhoto({ type: "spot", country, city, spot });
  return {
    props: {
      article,
      country,
      city,
      spot,
      photo: jsonlize(photo),
    },
  };
};

const Index = ({ article = {}, country, city, spot, photo }) => {
  const { title, description, content } = article;

  const { mutate: postArticle, isLoading: isPostCityArticleLoading } =
    usePostArticle(
      { type: "spot" },
      {
        onSuccess: () => {
          alert("success");
        },
      }
    );

  return (
    <Container
      as={Flex}
      maxW="container.lg"
      p="8"
      rowGap="8"
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
            <Button
              isLoading={isPostCityArticleLoading}
              isDisabled={isPostCityArticleLoading}
              type="submit"
            >
              Confirm
            </Button>
            <Button>Cancel</Button>
          </Flex>
          <Flex flexDirection="column" rowGap="4">
            <Heading as="h4">Photo</Heading>
            <PhotoDisplayer photo={photo} />
            <GooglePhotoGenerator
              type="spot"
              country={country}
              city={city}
              spot={spot}
              generateButtonProps={{ alignSelf: "self-start" }}
            />
          </Flex>
        </Flex>
      </form>
    </Container>
  );
};

export default Index;
