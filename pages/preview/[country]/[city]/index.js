import {
  Accordion,
  Button,
  Container,
  Flex,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import { getAllPlaces, getArticle } from "backend-service/get";
import { PhotoDisplayer, PlacesAccordionItem } from "component/create";
import GooglePhotoGenerator from "component/create/google-photo-generator";
import { usePostArticle } from "hooks/db";
import { jsonlize } from "utils/jsonlize";

export const getStaticPaths = async () => {
  const cities = await getAllPlaces({ type: "city" });
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
  const article = await getArticle({ type: "city", country, city });
  return {
    props: { country, city, article: jsonlize(article) },
  };
};

const Spots = ({ country, city }) => {
  return (
    <Flex w="full" flexDirection="column" rowGap="4">
      <Heading as="h5">Spots</Heading>
      <Accordion allowMultiple>
        <PlacesAccordionItem type="spot" country={country} city={city} />
      </Accordion>
    </Flex>
  );
};

const Index = ({ country, city, article = {} }) => {
  const {
    title,
    description,
    content,
    image,
    image_reference_link,
    image_reference_name,
  } = article;
  const { mutate: postArticle, isLoading: isPostCityArticleLoading } =
    usePostArticle(
      { type: "city" },
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
            <PhotoDisplayer
              photo={{ image, image_reference_link, image_reference_name }}
            />
            <GooglePhotoGenerator
              type="city"
              country={country}
              city={city}
              generateButtonProps={{ alignSelf: "self-start" }}
            />
          </Flex>
        </Flex>
      </form>
      <Spots country={country} city={city} />
    </Container>
  );
};

export default Index;
