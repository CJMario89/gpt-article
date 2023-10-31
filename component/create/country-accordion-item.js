import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useNewCities } from "hooks/ai";
import { useGetCities, useGetCountries, usePostCities } from "hooks/db";
import CityArticlePanel from "./city-article-panel";

const CountryAccordionItem = ({ country }) => {
  const { data: cities = [], refetch: refetchCities } = useGetCities(
    { country },
    { enabled: !!country }
  );
  console.log(cities);
  const { refetch: refetchCountries } = useGetCountries();
  const { mutate: postCities } = usePostCities({
    onSuccess: () => {
      refetchCities();
      refetchCountries();
    },
  });
  const { mutate: newCities, isLoading } = useNewCities({
    onSuccess: (cities) => {
      postCities({ country, cities });
    },
  });

  return (
    <AccordionItem>
      <AccordionButton>
        <Heading as="h4" flex="1" textAlign="left">
          {country}
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Flex flexDirection="column" rowGap="4">
          {cities.map(({ city, status }) => {
            return (
              <CityArticlePanel
                country={country}
                city={city}
                status={status}
                key={city}
              />
            );
          })}
          <Button
            onClick={() => {
              newCities({ country });
            }}
            alignSelf="center"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Increase Cities
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default CountryAccordionItem;
