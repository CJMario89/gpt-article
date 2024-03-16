import { infoInstance, instance } from "backend-service/common";
import { localeInfo } from "./article";

export const getPlacesWithTranslation = async ({
  region,
  prefecture,
  city,
  locale,
}) => {
  if (city) {
    const spots = await infoInstance({ type: "spot" })
      .where({ city })
      .select("id", "spot");
    if (locale !== "en-US" && locale) {
      return Promise.all(
        spots.map(async ({ spot, id }) => {
          const translation = await instance(localeInfo[locale])
            .where("placeId", `${spot}-${id}-spot`)
            .select("spot")
            .first();
          return {
            translation: translation.spot,
            value: spot,
          };
        })
      );
    } else {
      return spots.map(({ spot }) => {
        return {
          translation: spot,
          value: spot,
        };
      });
    }
  } else if (prefecture) {
    const cities = await infoInstance({ type: "city" })
      .where({ prefecture })
      .select("id", "city");
    if (locale !== "en-US" && locale) {
      return Promise.all(
        cities.map(async ({ city, id }) => {
          const translation = await instance(localeInfo[locale])
            .where("placeId", `${city}-${id}-city`)
            .select("city")
            .first();
          return {
            translation: translation.city,
            value: city,
          };
        })
      );
    } else {
      return cities.map(({ city }) => {
        return {
          translation: city,
          value: city,
        };
      });
    }
  } else {
    const prefectures = await infoInstance({ type: "prefecture" })
      .where({ region })
      .andWhereNot("prefecture", "All")
      .select("id", "prefecture");
    if (locale !== "en-US" && locale) {
      return Promise.all(
        prefectures.map(async ({ prefecture, id }) => {
          const translation = await instance(localeInfo[locale])
            .where("placeId", `${prefecture}-${id}`)
            .select("prefecture")
            .first();
          return {
            translation: translation.prefecture,
            value: prefecture,
          };
        })
      );
    } else {
      return prefectures.map(({ prefecture }) => {
        return {
          translation: prefecture,
          value: prefecture,
        };
      });
    }
  }
};
