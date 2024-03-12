import {
  Button,
  Flex,
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

const Search = ({ onSearch, ...restProps }) => {
  const types = ["prefecture", "city", "spot"];
  const t = useTranslations();

  const placesText = {
    prefecture: t("Prefecture"),
    city: t("City"),
    spot: t("Spot"),
  };
  const [region, setRegion] = useState("All");

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState();
  const [type, setType] = useState("city");
  const { data } = useGetSearch(
    { type, text: searchText, region },
    { enabled: Boolean(searchText) }
  );
  const places = data?.pages[0]?.places ?? [];
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  return (
    <Flex flexDirection="column" alignItems="flex-start" rowGap="4">
      <Flex columnGap="2" alignItems="center">
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
                {region === "All" ? t("All") : region}
              </MenuButton>
              <MenuList display={isOpen ? "block" : "none"}>
                {regions.map((place) => (
                  <MenuItem
                    key={place}
                    onClick={() => {
                      setRegion(place);
                    }}
                  >
                    {place}
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
        <Flex
          position="relative"
          w="full"
          maxW="full"
          transition="all 0.3s ease-out"
          {...restProps}
        >
          <Input
            w="full"
            type="text"
            placeholder={t("Search Place")}
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
            color="neutral.800"
          />
        </Flex>
      </Flex>
      {searchOpen && searchText && (
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
            <TabList>
              {types.map((type) => (
                <Tab key={type}>{t(placesText[type])}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {types.map((type) => (
                <TabPanel key={type} px="0" py="0" h="70vh" overflow="auto">
                  <Flex flexDirection="column">
                    {Array.isArray(places) &&
                      places.map((place) => (
                        <PlaceCard
                          onClick={() => {
                            onSearch();
                          }}
                          isHorizontal={!isDesktop}
                          key={place?.title}
                          place={{ type, ...place }}
                        />
                      ))}
                  </Flex>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>

          {/* <Box
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
            /> */}
        </>
      )}
    </Flex>
  );
};

export default Search;
