import {
  Button,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from "@chakra-ui/react";
import { PlaceCard } from "component/blog";
import useFavoritePlaces from "hooks/use-favorite-places";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";

const options = ["prefecture", "city", "spot"];

const Favorites = () => {
  const { favoritePlace } = useFavoritePlaces();
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const t = useTranslations();
  const placesText = {
    prefecture: t("Prefecture"),
    city: t("City"),
    spot: t("Spot"),
  };
  const noPlacesText = {
    prefecture: t("No prefecture in favorites yet"),
    city: t("No city in favorites yet"),
    spot: t("No spot in favorites yet"),
  };
  const defaultIndex = useMemo(() => {
    if (!favoritePlace) {
      return 0;
    }
    return (
      Object.values(favoritePlace).findIndex((value) => value.length > 0) || 0
    );
  }, [favoritePlace]);
  const exploreLink = {
    prefecture: "/explore/region",
    city: "/explore/Hokkaido/All",
    spot: "/explore/Hokkaido/All",
  };
  return (
    <Container
      maxW="container.lg"
      as={Flex}
      px="4"
      flexDirection="column"
      rowGap="4"
      minH="50vh"
    >
      <Tabs defaultValue={defaultIndex} isLazy pt="4">
        <TabList
          bgColor="primary.50"
          mb="1em"
          overflowX="auto"
          borderBottomWidth="1px"
          borderColor="primary.100"
        >
          {options.map((option) => (
            <Tab key={option} mb="0" px="5">
              {placesText[option]}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {options.map((option) => (
            <TabPanel key={option}>
              <Flex
                w="full"
                flexDirection="column"
                alignItems="center"
                rowGap={{ base: "4", md: "6" }}
              >
                {Array.isArray(favoritePlace?.[option]) &&
                favoritePlace?.[option].length > 0 ? (
                  favoritePlace?.[option]?.map((place) => {
                    return (
                      <PlaceCard
                        key={place.name}
                        isHorizontal={isDesktop ? false : true}
                        place={{ ...place }}
                      />
                    );
                  })
                ) : (
                  <Flex flexDirection="column" gap="6" mt="12">
                    <Heading as="h3">{noPlacesText[option]}</Heading>
                    <Button
                      variant="solid"
                      bgColor="primary.300"
                      _hover={{ bgColor: "primary.400" }}
                      alignSelf="center"
                      p="4"
                      as={Link}
                      href={exploreLink[option]}
                      prefetch={false}
                    >
                      {t("Explore")}
                    </Button>
                  </Flex>
                )}
              </Flex>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Favorites;
