import { useEffect, useState } from "react";
import useLocalStorageState from "./use-local-storage-state";

const initValue = {
  prefecture: [],
  city: [],
  spot: [],
};

const key = "favorite-places";
const useFavoritePlaces = (place) => {
  const { type = "", name = "", ...info } = place ?? {};
  const [favoritePlace, setFavoritePlace] = useLocalStorageState(
    key,
    initValue
  );
  const [isFavorited, setIsFavorited] = useState(false);
  useEffect(() => {
    if (!favoritePlace[type]) {
      setIsFavorited(false);
    } else {
      setIsFavorited(favoritePlace[type]?.some((place) => place.name === name));
    }
  }, [favoritePlace, name, type]);

  const addFavoritePlace = () => {
    if (isFavorited) return;
    setFavoritePlace((favoritePlace) => {
      const newPlace = favoritePlace?.[type] ? favoritePlace : initValue;
      if (newPlace[type]?.some((place) => place.name === name)) return newPlace;
      newPlace[type].push({ name, type, ...info });
      return newPlace;
    });
  };
  const removeFavoritePlace = () => {
    setFavoritePlace((favoritePlace) => {
      const newPlace = favoritePlace?.[type] ? favoritePlace : initValue;
      newPlace[type] = newPlace[type].filter((place) => {
        return place.name !== name;
      });

      return newPlace;
    });
  };

  return {
    isFavorited,
    favoritePlace,
    addFavoritePlace,
    removeFavoritePlace,
    clearFavoritePlaces: () => {
      setFavoritePlace(initValue);
    },
  };
};

export default useFavoritePlaces;
