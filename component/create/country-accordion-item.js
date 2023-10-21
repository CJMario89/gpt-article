import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import CityArticlePanel from "./city-article-panel";
import { useGetCities, usePostCities } from "../../hooks/db";
import { useNewCities } from "../../hooks/ai";

const CountryAccordionItem = ({ country }) => {
  const { data: cities = [] } = useGetCities(
    { country },
    { enabled: !!country }
  );
  const { mutate: postCities } = usePostCities({
    opnSuccess: () => {
      refetchCities();
      console.log(countries);
      refetchCountries();
    },
  });
  const { mutate: newCities } = useNewCities({
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
          >
            Increase Cities
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default CountryAccordionItem;
