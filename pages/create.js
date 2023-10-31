import React, { useState } from "react";
import {
  Accordion,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import { useGetCities, useGetCountries, usePostCities } from "hooks/db";
import { useNewCities } from "hooks/ai";
import { CountryAccordionItem } from "component/create";
import { getCountries } from "./api/sql-query/get-countries";

export const getServerSideProps = async () => {
  const countries = await getCountries();
  const queryClient = new QueryClient();
  queryClient.setQueryData(["get-countries"], countries);
  return { props: { countries: JSON.parse(JSON.stringify(countries)) } };
};

const LoginForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          e.target.account.value === process.env.NEXT_PUBLIC_ACCOUNT &&
          e.target.password.value === process.env.NEXT_PUBLIC_PASSWORD
        ) {
          console.log(".");
        } else {
          alert("login failed.");
        }
      }}
    >
      <Flex w="50" flexDirection="column" rowGap="5">
        <Text>ACCOUNT</Text>
        <Input name="account" type="text" />
        <Text>PASSWORD</Text>
        <Input name="password" type="text" />
        <Button type="submit">Login</Button>
      </Flex>
    </form>
  );
};

const Create = () => {
  const [country, setCountry] = useState();
  const { data: countries, refetch: refetchCountries } = useGetCountries();
  console.log(countries);
  const { refetch: refetchCities } = useGetCities({ country });
  const { mutate: postCities } = usePostCities({
    onSuccess: () => {
      refetchCities();
      console.log(countries);
      refetchCountries();
    },
  });

  const { mutate: newCities, isLoading } = useNewCities({
    onSuccess: (cities) => {
      postCities({ country, cities });
    },
  });
  return (
    <Container maxW="container.xl" w="full" p="36px">
      {false ? (
        <LoginForm />
      ) : (
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
              <Heading as="h3">country</Heading>
              <Accordion allowMultiple>
                {Array.isArray(countries) &&
                  countries.map(({ country }) => (
                    <CountryAccordionItem country={country} key={country} />
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
      )}
    </Container>
  );
};

export default Create;
