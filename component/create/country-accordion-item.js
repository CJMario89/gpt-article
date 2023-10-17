import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import { useGetCities } from "../../hooks/db";

const CountryAccordionItem = ({ country }) => {
  const { data: cities = [] } = useGetCities(
    { country },
    { enabled: !!country }
  );
  console.log(cities);
  return (
    <AccordionItem>
      <AccordionButton>
        <Heading as="h2" flex="1" textAlign="left">
          {country}
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Flex flexDirection="column">
          {cities.map(({ city, status }) => {
            return (
              <Flex key={city}>
                <Link>
                  <Text fontSize="20px">{city}</Text>
                </Link>
                {status === -1 && <Button>Generate</Button>}
                {status === 0 && <Button>Deploy</Button>}
                {status === 1 && <Button>Hide</Button>}
              </Flex>
            );
          })}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default CountryAccordionItem;
