import {
  Box,
  Flex,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useGetSearch } from "hooks/db";
import Link from "next/link";
import { useState } from "react";

const SearchIcon = ({ ...restProps }) => {
  return (
    <svg
      style={restProps}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-search"
      viewBox="0 0 16 16"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
    </svg>
  );
};
const Search = ({ ...restProps }) => {
  const placesText = ["city", "spot"];
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");
  const { data } = useGetSearch(
    { type, text: searchText },
    { enabled: searchText !== "" }
  );
  const places = data ?? [];
  const captilize = (placeText = "") => {
    return placeText.charAt(0).toUpperCase() + placeText.slice(1);
  };
  return (
    <Flex
      position="relative"
      w={searchOpen ? "full" : "50vw"}
      maxW={searchOpen ? "full" : "400px"}
      transition="all 0.3s ease-out"
      {...restProps}
    >
      <Input
        type="text"
        pl="8"
        pr="6"
        placeholder="Search City or Spot"
        background="rgba(245, 245, 245, 0.2)"
        border="2px solid #eeeeee"
        onInput={(e) => {
          setSearchText(e.target.value);
        }}
        onFocus={() => {
          setSearchOpen(true);
        }}
      />
      <SearchIcon
        position="absolute"
        left="12px"
        top="50%"
        transform="translateY(-50%)"
        color="#aaaaaa"
      />
      {searchOpen && (
        <>
          <Tabs
            zIndex={1}
            onChange={(index) => {
              console.log(placesText[index]);
              setType(placesText[index]);
            }}
            background="#ffffff"
            borderRadius="2xl"
            w="full"
            position="absolute"
            top="50px"
            left="0px"
            {...restProps}
          >
            <TabList>
              {placesText.map((placeText) => (
                <Tab key={placeText}>{captilize(placeText)}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {placesText.map((placeText) => (
                <TabPanel
                  key={placeText}
                  px="0"
                  py="0"
                  h="70vh"
                  overflow="auto"
                >
                  <Flex flexDirection="column">
                    {places.map((place) => (
                      <Flex
                        key={place[placeText]}
                        px="4"
                        py="2"
                        columnGap="8"
                        cursor="pointer"
                        as={Link}
                        href={
                          placeText === "city"
                            ? `/blog/Japan/${captilize(place[placeText])}`
                            : `/blog/Japan/${captilize(
                                place["city"]
                              )}/${captilize(place[placeText])}`
                        }
                        onClick={() => {
                          setSearchOpen(false);
                        }}
                        _hover={{ background: "#eeeeee" }}
                        transition="all 0.1s ease-in-out"
                      >
                        <Text>
                          {captilize(placeText)}: {place[placeText]}
                        </Text>
                        {placeText === "spot" && (
                          <Text>City: {place["city"]}</Text>
                        )}
                      </Flex>
                    ))}
                  </Flex>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>

          <Box
            zIndex={-1}
            position="fixed"
            top="0px"
            left="0px"
            w="100%"
            h="100%"
            style={{
              background: "rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)",
            }}
            onClick={() => {
              setSearchOpen(false);
            }}
          />
        </>
      )}
    </Flex>
  );
};

export default Search;
