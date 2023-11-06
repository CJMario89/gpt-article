import { useState } from "react";
import { Accordion, Button, Container, Flex, Input } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import {
  useBatchGenerate,
  useGetCountries,
  useGetPlacesByParams,
} from "hooks/db";
import { PlacesAccordionItem } from "component/create";
import { getCountries } from "backend-service/get";

export const getServerSideProps = async () => {
  const countries = await getCountries();
  const queryClient = new QueryClient();
  queryClient.setQueryData(["get-countries"], countries);
  return { props: { countries } };
};

const Create = () => {
  const [country, setCountry] = useState();
  const { data: countries, refetch: refetchCountries } = useGetCountries();
  console.log(countries);
  const { refetch: refetchCities } = useGetPlacesByParams({
    type: "city",
    country,
  });
  const { isLoading, mutate: batchGenerate } = useBatchGenerate({
    onSuccess: () => {
      refetchCities();
      refetchCountries();
    },
  });
  return (
    <Container maxW="container.xl" w="full" p="36px">
      <Flex flexDirection="column" rowGap="20px">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const country = e.target.country.value;
            batchGenerate({ country });
            setCountry(country);
          }}
        >
          <Flex rowGap="20px" flexDirection="column">
            {/* <Heading as="h3">country</Heading> */}
            <Accordion allowMultiple>
              {Array.isArray(countries) &&
                countries.map(({ country }) => (
                  <PlacesAccordionItem
                    type="city"
                    country={country}
                    key={country}
                  />
                ))}
            </Accordion>
            <Input
              name="country"
              type="text"
              alignSelf="self-start"
              w="200px"
            />
            <Button
              type="submit"
              alignSelf="self-start"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Batch Generate
            </Button>
          </Flex>
        </form>
      </Flex>
    </Container>
  );
};

export default Create;
