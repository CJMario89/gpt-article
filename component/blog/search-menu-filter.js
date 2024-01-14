import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useGetCities, useGetPrefectures, useGetSpots } from "hooks/db";
import { useState } from "react";
import { regions } from "utils/constant";

export const ChevronDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-chevron-down"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );
};

const SearchFilterMenu = ({ ...restProps }) => {
  const [region, setRegion] = useState("All");
  const [prefecture, setPrefecture] = useState("All");
  const [city, setCity] = useState("All");
  const [spot, setSpot] = useState("All");

  const { data: prefectures = [] } = useGetPrefectures({ region });
  const { data: cities = [] } = useGetCities({ prefecture });
  const { data: spots = [] } = useGetSpots({ prefecture, city });
  const placesMenu = [
    { name: "Region", place: region, places: regions, setPlace: setRegion },
    {
      name: "Prefecture",
      place: prefecture,
      places: prefectures,
      setPlace: setPrefecture,
    },
    { name: "City", place: city, places: cities, setPlace: setCity },
    { name: "Spot", place: spot, places: spots, setPlace: setSpot },
  ];
  return (
    <Flex columnGap="4" {...restProps}>
      {placesMenu.map((placeMenu) => (
        <Flex key={placeMenu.name} alignItems="center" columnGap="4">
          <Text>{placeMenu.name}: </Text>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  variant="outline"
                  rightIcon={<ChevronDown />}
                >
                  {placeMenu.place}
                </MenuButton>
                <MenuList display={isOpen ? "block" : "none"}>
                  {placeMenu.places.map((place) => (
                    <MenuItem
                      key={place}
                      onClick={() => {
                        placeMenu.setPlace(place);
                      }}
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
    </Flex>
  );
};

export default SearchFilterMenu;
