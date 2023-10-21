import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import { useNewCitiesArticle } from "../../hooks/ai";
import CityArticlePreview from "./city-article-preview";
import Loading from "../Loading";
import usePostArticleStatus from "../../hooks/db/use-post-article-status";

const CityArticlePanel = ({ country, city, status }) => {
  const {
    mutate: newArticles,
    isLoading,
    data = {},
    reset,
  } = useNewCitiesArticle();
  const { mutate: postArticleStatus } = usePostArticleStatus({
    onSuccess: () => {
      alert("success");
    },
  });
  return (
    <Flex flexDirection="column" rowGap="2">
      <Flex key={city} alignItems="center" columnGap="4">
        <Link>
          <Heading as="h5">{city}</Heading>
        </Link>
        {status === "-1" && (
          <Button
            onClick={() => {
              newArticles({ cities: [city] });
            }}
            isDisabled={isLoading}
            rightIcon={isLoading && <Loading />}
          >
            Generate
          </Button>
        )}
        {status === "0" && (
          <Button
            onClick={() => {
              postArticleStatus({ country, city, status: "1" });
            }}
          >
            Deploy
          </Button>
        )}
        {status === "1" && (
          <Button
            onClick={() => {
              postArticleStatus({ country, city, status: "0" });
            }}
          >
            Hide
          </Button>
        )}
        {status !== "-1" && (
          <Button as={Link} href={`/preview/${country}/${city}`}>
            Preview
          </Button>
        )}
      </Flex>
      {data[0]?.title && (
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
