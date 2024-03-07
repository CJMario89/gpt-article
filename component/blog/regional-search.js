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
import { useGetCities, useGetPrefectures } from "hooks/db";
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

const RegionalSearch = ({ onSearch, isLight, ...restProps }) => {
  const { push } = useRouter();
  const [region, setRegion] = useState("All");
  const [prefecture, setPrefecture] = useState("All");
  const [city, setCity] = useState("All");
  // const [spot, setSpot] = useState("All");

  const { data: prefectures = [] } = useGetPrefectures({ region });
  const { data: cities = [] } = useGetCities({ prefecture });
  // const { data: spots = [] } = useGetSpots({ prefecture, city });
  const placesMenu = [
    {
      name: "Region",
      place: region,
      places: regions,
      setPlace: (place) => {
        setRegion(place);
        setPrefecture("All");
        setCity("All");
        // setSpot("All");
      },
      disable: false,
    },
    {
      name: "Prefecture",
      place: prefecture,
      places: prefectures,
      setPlace: (place) => {
        setPrefecture(place);
        setCity("All");
        // setSpot("All");
      },
      disable: region === "All",
    },
    {
      name: "City",
      place: city,
      places: cities,
      setPlace: (place) => {
        setCity(place);
        // setSpot("All");
      },
      disable: prefecture === "All",
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

  const textStlyeProps = {
    color: isLight ? "neutral.50" : "neutral.700",
  };

  const menuButtonBgStyleProps = {
    ...(isLight
      ? {
          _hover: {
            bgColor: "primary.800",
          },
          _active: {
            bgColor: "primary.800",
          },
        }
      : {}),
  };

  const menuListStyleProps = {
    ...(isLight
      ? {
          bgColor: "primary.900",
          _hover: {
            bgColor: "primary.900",
          },
          _active: {
            bgColor: "primary.900",
          },
        }
      : {}),
  };

  const menuItemStyleProps = {
    ...(isLight
      ? {
          bgColor: "primary.900",
          _hover: {
            bgColor: "primary.800",
          },
          _active: {
            bgColor: "primary.800",
          },
        }
      : {}),
  };

  const buttonBgStyleProps = {
    ...(isLight
      ? {
          variant: "outline",
          bgColor: "primary.900",
          border: "0.5px solid",
          borderColor: "neutral.200",
          color: "neutral.50",
          _hover: {
            bgColor: "primary.700",
            _disabled: {
              bgColor: "primary.800",
            },
          },
          _active: {
            bgColor: "primary.800",
          },
        }
      : {}),
  };

  const currentSearch = useMemo(() => {
    if (region === "All") return;
    if (prefecture === "All") return `${region}/All`;
    if (city === "All") return `${region}/${prefecture}`;
    return `${region}/${prefecture}/${city}`;
  }, [region, prefecture, city]);
  return (
    <Flex gap="4" flexWrap="wrap" {...restProps}>
      {placesMenu.map((placeMenu) => (
        <Flex key={placeMenu.name} alignItems="center" columnGap="2">
          <Text {...textStlyeProps} opacity={placeMenu.disable ? "0.5" : "1"}>
            {placeMenu.name}:{" "}
          </Text>
          <Menu placement={isLight ? "right" : "auto"}>
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
                  {placeMenu.place}
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
                      key={place}
                      onClick={() => {
                        placeMenu.setPlace(place);
                      }}
                      {...menuItemStyleProps}
                      {...textStlyeProps}
                    >
                      {place}
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
          push(`/explore/${currentSearch}`);
          if (typeof onSearch === "function") {
            onSearch();
          }
        }}
        {...buttonBgStyleProps}
        isDisabled={!currentSearch}
      >
        Search
      </Button>
    </Flex>
  );
};

export default RegionalSearch;
