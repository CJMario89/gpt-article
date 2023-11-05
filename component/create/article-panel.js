import {
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import Loading from "component/Loading";
import { useNewArticles } from "hooks/ai";
import {
  useGetPlacesByParams,
  usePostArticle,
  usePostArticleStatus,
} from "hooks/db";
import GooglePhotoGenerator from "./google-photo-generator";
import ArticlePreview from "./article-preview";

const ArticlePanel = ({ type, country, city, spot, title, status }) => {
  const { refetch: refetchPlaces } = useGetPlacesByParams(
    { type, country, city },
    { enabled: !!country }
  );
  const {
    mutate: newArticles,
    isLoading,
    data = {},
    reset,
  } = useNewArticles({ type });

  const { mutate: postArticleStatus } = usePostArticleStatus(
    { type },
    {
      onSuccess: () => {
        refetchPlaces();
      },
    }
  );

  const { mutate: postArticle } = usePostArticle(
    { type },
    {
      onSuccess: () => {
        alert("success");
        reset();
      },
    }
  );
  const isSpot = type === "spot";
  const deployed = status === 1;
  const unDeployed = status === 0;
  const existed = title !== "";
  const generated = data[0]?.title;
  const place = isSpot ? spot : city;
  return (
    <Flex flexDirection="column" rowGap="4">
      <Divider />
      <Heading as="h5" whiteSpace="nowrap">
        {place}
      </Heading>
      <SimpleGrid key={place} columns={6} alignItems="center" columnGap="4">
        <Button
          onClick={() => {
            newArticles({
              ...(isSpot ? { spots: [spot] } : { cities: [city] }),
            });
          }}
          isDisabled={isLoading || existed || generated}
          rightIcon={isLoading && <Loading />}
        >
          Generate
        </Button>
        <Button
          onClick={() => {
            postArticleStatus({
              country,
              city,
              status: 1,
              ...(isSpot ? { spot } : {}),
            });
          }}
          isDisabled={deployed || !existed}
        >
          Deploy
        </Button>
        <Button
          onClick={() => {
            postArticleStatus({
              country,
              city,
              status: 0,
              ...(isSpot ? { spot } : {}),
            });
          }}
          isDisabled={unDeployed}
        >
          Hide
        </Button>
        <Button
          as={Link}
          isDisabled={!existed}
          href={`/preview/${country}/${city}${isSpot ? `/${spot}` : ""}`}
        >
          Preview
        </Button>
      </SimpleGrid>
      <GooglePhotoGenerator
        type={type}
        country={country}
        city={city}
        spot={spot}
      />
      {generated && (
        <ArticlePreview
          country={country}
          city={city}
          article={data[0]}
          postArticle={() => {
            postArticle({
              country,
              city,
              article: data[0],
              ...(isSpot ? { spot } : {}),
            });
          }}
          reset={() => {
            reset();
          }}
        />
      )}
    </Flex>
  );
};

export default ArticlePanel;
