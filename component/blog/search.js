import {
  Button,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useGetSearch } from "hooks/db";
import { useState } from "react";
import { regions } from "utils/constant";
import { ChevronDown } from "./regional-search";
import SearchIcon from "assets/search.svg";
import PlaceCard from "./place-card";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import LoadingSvg from "assets/loading.svg";
import useDebounce from "utils/use-debounce";

const Search = ({ onSearch, ...restProps }) => {
  const types = ["prefecture", "city", "spot"];
  const t = useTranslations();
  const { locale } = useRouter();
  const debounce = useDebounce();
  const [searchText, setSearchText] = useState("");

  const placesText = {
    prefecture: t("Prefecture"),
    city: t("City"),
    spot: t("Spot"),
  };
  const [region, setRegion] = useState("All");

  const [searchOpen, setSearchOpen] = useState(false);
  const [type, setType] = useState("city");
  const { data, isFetching } = useGetSearch(
    { type, text: searchText, region, locale },
    { enabled: Boolean(searchText) }
  );
  const places = data?.pages[0]?.places ?? [];
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  return (
    <Flex
      flexDirection="column"
      alignItems="flex-start"
      w="full"
      overflow="auto"
      h={{ base: "full", lg: "80vh" }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
        }}
        style={{
          position: "sticky",
          top: "0",
          zIndex: "1",
          width: "100%",
          background: "white",
          paddingBottom: "4px",
        }}
      >
        <Flex
          columnGap="2"
          alignItems="center"
          flexWrap={{ base: "wrap", md: "nowrap" }}
          gap="2"
        >
          <Text flexShrink="0">{t("Region")}: </Text>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  flexShrink="0"
                  as={Button}
                  variant="outline"
                  rightIcon={<ChevronDown />}
                >
                  {region === "All" ? t("All") : t(region)}
                </MenuButton>
                <MenuList display={isOpen ? "block" : "none"}>
                  {regions.map((place) => (
                    <MenuItem
                      key={place}
                      onClick={() => {
                        setRegion(place);
                      }}
                    >
                      {t(place)}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>
          <Flex position="relative" w="full" maxW="full" gap="2" {...restProps}>
            <Input
              w="auto"
              type="text"
              placeholder={t("Search Place")}
              onInput={(e) => {
                debounce(() => setSearchText(e.target.value), 700);
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
              color="neutral.800"
            />
            <Button type="submit" variant="solid" bgColor="primary.300">
              {t("Search")}
            </Button>
          </Flex>
        </Flex>
      </form>
      {isFetching && (
        <Flex w="full" h="full" justifyContent="center" alignItems="center">
          <LoadingSvg w="6" h="6" />
        </Flex>
      )}
      {searchOpen && searchText && !isFetching && (
        <>
          <Tabs
            onChange={(index) => {
              setType(types[index]);
            }}
            index={types.indexOf(type) || 0}
            background="#ffffff"
            borderRadius="2xl"
            w="full"
            position="relative"
            {...restProps}
          >
            <TabList
              position="sticky"
              top={{ base: "86px", md: "44px" }}
              bgColor="white"
              pt="4"
              w="full"
              zIndex="1"
            >
              {types.map((type) => (
                <Tab key={type}>{placesText[type]}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {types.map((type) => (
                <TabPanel key={type} px="0" py="0">
                  <Flex flexDirection="column" h="full">
                    {places.length > 0 ? (
                      places.map((place) => (
                        <PlaceCard
                          onClick={() => {
                            onSearch();
                          }}
                          isHorizontal={!isDesktop}
                          key={place?.title}
                          place={{ type, ...place }}
                        />
                      ))
                    ) : (
                      <Flex
                        w="full"
                        h="full"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Heading as="h2" mt="4">
                          {t("No result")}
                        </Heading>
                      </Flex>
                    )}
                  </Flex>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </>
      )}
    </Flex>
  );
};

export default Search;
