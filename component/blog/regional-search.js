import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useGetPlaceWithTranslation } from "hooks/db";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { regions } from "utils/constant";

export const ChevronDown = ({ ...props }) => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="3"
      height="3"
      fill="currentColor"
      className="bi bi-chevron-down"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
      />
    </Icon>
  );
};

const RegionalSearch = ({
  onSearch,
  textStlyeProps,
  menuItemStyleProps,
  menuButtonBgStyleProps,
  menuListStyleProps,
  buttonBgStyleProps,
  ...restProps
}) => {
  const t = useTranslations();
  const { push, locale } = useRouter();
  const [region, setRegion] = useState({ label: t("All"), value: "All" });
  const [prefecture, setPrefecture] = useState({
    label: t("All"),
    value: "All",
  });
  const [city, setCity] = useState({ label: t("All"), value: "All" });
  // const [spot, setSpot] = useState("All");
  const { data: prefectures = [] } = useGetPlaceWithTranslation({
    region: region.value,
    enabled: Boolean(region.value) && region.value !== "All",
  });
  const { data: cities = [] } = useGetPlaceWithTranslation({
    prefecture: prefecture.value,
    enabled: Boolean(prefecture.value) && prefecture.value !== "All",
  });

  const placesMenu = [
    {
      name: t("Region"),
      place: region,
      places: regions.map((region) => ({
        translation: t(region),
        value: region,
      })),
      setPlace: (place) => {
        setRegion(place);
        setPrefecture({ label: t("All"), value: "All" });
        setCity({ label: t("All"), value: "All" });
      },
      disable: false,
    },
    {
      name: t("Prefecture"),
      place: prefecture,
      places: prefectures,
      setPlace: (place) => {
        setPrefecture(place);
        setCity({ label: t("All"), value: "All" });
      },
      disable: region?.value === "All",
    },
    {
      name: t("City"),
      place: city,
      places: cities,
      setPlace: (place) => {
        setCity(place);
      },
      disable: prefecture?.value === "All",
    },
    // {
    //   name: "Spot",
    //   place: spot,
    //   places: spots,
    //   setPlace: (place) => {
    //     setSpot(place);
    //   },
    //   disable: city === "All",
    //   onChange: () => {},
    // },
  ];

  const currentSearch = useMemo(() => {
    if (region === "All") return;
    if (prefecture === "All") return `${region?.value}/All`;
    if (city === "All") return `${region?.value}/${prefecture?.value}`;
    return `${region?.value}/${prefecture?.value}/${city?.value}`;
  }, [region, prefecture, city]);
  return (
    <Flex gap="4" flexWrap="wrap" {...restProps}>
      {placesMenu.map((placeMenu) => (
        <Flex key={placeMenu.name} alignItems="center" columnGap="2">
          <Text {...textStlyeProps} opacity={placeMenu.disable ? "0.5" : "1"}>
            {placeMenu.name}:{" "}
          </Text>
          <Menu placement="bottom">
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  variant="outline"
                  isDisabled={placeMenu.disable}
                  rightIcon={<ChevronDown />}
                  {...textStlyeProps}
                  {...menuButtonBgStyleProps}
                >
                  {placeMenu.place?.value === "All"
                    ? t("All")
                    : placeMenu.place?.label}
                </MenuButton>
                <MenuList
                  display={isOpen ? "block" : "none"}
                  maxH="80vh"
                  overflowY="scroll"
                  overflowX="hidden"
                  {...menuListStyleProps}
                  {...textStlyeProps}
                >
                  {placeMenu.places.map((place) => (
                    <MenuItem
                      key={place?.translation}
                      onClick={() => {
                        placeMenu.setPlace({
                          label: place?.translation,
                          value: place?.value,
                        });
                      }}
                      {...menuItemStyleProps}
                      {...textStlyeProps}
                    >
                      {place?.translation}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>
        </Flex>
      ))}
      <Button
        variant="solid"
        bgColor="primary.300"
        onClick={() => {
          push(`/explore/${currentSearch}`, `/explore/${currentSearch}`, {
            locale,
          });
          if (typeof onSearch === "function") {
            onSearch();
          }
        }}
        {...buttonBgStyleProps}
        isDisabled={!currentSearch}
      >
        {t("Search")}
      </Button>
    </Flex>
  );
};

export default RegionalSearch;
