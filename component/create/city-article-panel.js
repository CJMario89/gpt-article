import { Button, Flex, Heading, Link, SimpleGrid } from "@chakra-ui/react";
import CityArticlePreview from "./city-article-preview";
import Loading from "component/Loading";
import { useNewCitiesArticle } from "hooks/ai";
import { usePostArticleStatus } from "hooks/db";
import GooglePhotoGenerator from "./google-photo-generator";

const CityArticlePanel = ({ country, city, title, status }) => {
  const {
    mutate: newArticles,
    isLoading,
    data = {},
    reset,
  } = useNewCitiesArticle();
  const { mutate: postArticleStatus } = usePostArticleStatus();

  const deployed = status === 1;
  const unDeployed = status === 0;
  const existed = title !== "";
  const generated = data[0]?.title;
  return (
    <Flex flexDirection="column" rowGap="2">
      <SimpleGrid key={city} columns={6} alignItems="center" columnGap="4">
        <Link>
          <Heading as="h5">{city}</Heading>
        </Link>
        <Button
          onClick={() => {
            newArticles({ cities: [city] });
          }}
          isDisabled={isLoading || existed || generated}
          rightIcon={isLoading && <Loading />}
        >
          Generate
        </Button>
        <Button
          onClick={() => {
            postArticleStatus({ country, city, status: 1 });
          }}
          isDisabled={deployed || !existed}
        >
          Deploy
        </Button>
        <Button
          onClick={() => {
            postArticleStatus({ country, city, status: 0 });
          }}
          isDisabled={unDeployed}
        >
          Hide
        </Button>
        <Button
          as={Link}
          isDisabled={!existed}
          href={`/preview/${country}/${city}`}
        >
          Preview
        </Button>
      </SimpleGrid>
      <GooglePhotoGenerator country={country} city={city} />
      {generated && (
        <CityArticlePreview
          country={country}
          city={city}
          article={data[0]}
          clearPreview={() => {
            reset();
          }}
        />
      )}
    </Flex>
  );
};

export default CityArticlePanel;
