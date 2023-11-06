import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useNewPlaces } from "hooks/ai";
import {
  useBatchGenerate,
  useGetPlacesByParams,
  usePostPlaces,
} from "hooks/db";
import ArticlePanel from "./article-panel";

const PlacesAccordionItem = ({ type, country, city }) => {
  const isSpot = type === "spot";
  const { data: places = [], refetch: refetchPlaces } = useGetPlacesByParams(
    { type, country, city },
    { enabled: !!country }
  );
  const { mutate: postPlaces } = usePostPlaces(
    { type },
    {
      onSuccess: () => {
        refetchPlaces();
      },
    }
  );
  const { mutate: newPlaces, isLoading } = useNewPlaces(
    { type },
    {
      onSuccess: (places) => {
        postPlaces({
          ...(isSpot
            ? { country, cities: [city], spots: places }
            : { country, cities: places }),
        });
      },
    }
  );

  const { mutate: batchGenerate } = useBatchGenerate({
    onSuccess: (data) => {
      alert(data);
    },
  });

  return (
    <AccordionItem>
      <AccordionButton>
        <Heading as="h4" flex="1" textAlign="left">
          <Flex justifyContent="space-between">
            {isSpot ? city : country}
            {!isSpot && (
              <Button
                onClick={() => {
                  batchGenerate({ country });
                }}
              >
                Batch Generate
              </Button>
            )}
          </Flex>
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Flex flexDirection="column" rowGap="8">
          <div />
          {places.map(({ city, spot, title, status }) => {
            return (
              <ArticlePanel
                type={type}
                country={country}
                city={city}
                spot={spot}
                title={title}
                status={status}
                key={isSpot ? spot : city}
              />
            );
          })}
          <Button
            onClick={() => {
              newPlaces({ country, city });
            }}
            alignSelf="center"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Add Places
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default PlacesAccordionItem;
