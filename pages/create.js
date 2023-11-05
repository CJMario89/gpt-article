import { useState } from "react";
import { Accordion, Button, Container, Flex, Input } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import { useGetCountries, useGetPlacesByParams, usePostPlaces } from "hooks/db";
import { useNewPlaces } from "hooks/ai";
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
  const { mutate: postCities } = usePostPlaces(
    { type: "city" },
    {
      onSuccess: () => {
        refetchCities();
        console.log(countries);
        refetchCountries();
      },
    }
  );

  const { mutate: newCities, isLoading } = useNewPlaces(
    { type: "city" },
    {
      onSuccess: (cities) => {
        postCities({ country, cities });
      },
    }
  );
  return (
    <Container maxW="container.xl" w="full" p="36px">
      <Flex flexDirection="column" rowGap="20px">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const country = e.target.country.value;
            newCities({ country });
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
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              create
            </Button>
          </Flex>
        </form>
      </Flex>
    </Container>
  );
};

export default Create;
