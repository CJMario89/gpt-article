import { articleInstance, categoryInstance } from "backend-service/common";

const headers = new Headers({
  "X-Goog-Api-Key": process.env.PLACE_APIKEY,
  "X-Goog-FieldMask":
    "places.types,places.displayName,places.rating,places.userRatingCount,places.googleMapsUri,places.googleMapsUri,places.websiteUri,places.location,places.photos",
});

export const getGoogleInfo = async ({ place }) => {
  const rawResponse = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        textQuery: `${place.prefecture} ${place.city}`,
        languageCode: "en",
      }),
    }
  );
  const response = await rawResponse.json();
  console.log(response);
  const googlePlace = response.places[0];
  await insertCity(googlePlace, place, "", "city");
  const rawSpots = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        languageCode: "en",
        maxResultCount: 10,
        rankPreference: "POPULARITY",
        includedTypes: [
          "national_park",
          "tourist_attraction",
          "park",
          "museum",
          "shopping_mall",
          "restaurant",
          "spa",
          "aquarium",
        ],
        excludedTypes: [
          "car_dealer",
          "car_rental",
          "car_repair",
          "car_wash",
          "electric_vehicle_charging_station",
          "gas_station",
          "parking",
          "lodging",
          "rest_stop",
          "train_station",
          "school",
          "hospital",
          "local_government_office",
          "event_venue",
          "transit_station",
          "coffee_shop",
        ],
        locationRestriction: {
          circle: {
            center: {
              latitude: googlePlace?.location?.latitude,
              longitude: googlePlace?.location?.longitude,
            },
            radius: 5000.0,
          },
        },
      }),
    }
  );
  const spotsInfo = await rawSpots.json();
  spotsInfo.filter((spotInfo) => Number(spotInfo.userRatingCount) > 1000);
};

async function insertCity(googlePlace, place) {
  const location = `${googlePlace?.location?.latitude},${googlePlace?.location?.longitude}`;
  const google_rating = googlePlace?.rating;
  const google_rating_count = googlePlace?.userRatingCount;
  const google_website = googlePlace?.websiteUri;
  const google_map_url = googlePlace?.googleMapsUri;
  const prefecture = place.prefecture;
  const city_japanese = place.cityJapanese;
  const population = place.population;
  const area = place.area;
  const density = place.density;
  const founded = place.founded;
  const website = place.cityLink;

  await articleInstance({ type: "city" }).insert({
    country: "Japan",
    city: place.city,
    location,
    google_map_url,
    google_rating,
    google_rating_count,
    google_website,
    prefecture,
    population,
    city_japanese,
    area,
    density,
    founded,
    website,
  });

  if (Array.isArray(googlePlace.photos) && googlePlace.photos.length > 0) {
    const photoInfo = googlePlace.photos[0];
    console.log(googlePlace.photos);
    const photo = await fetchPhoto(photoInfo.name);
    console.log(photo);
    await articleInstance({ type: "city" })
      .where({ city: place.city })
      .update({
        image: photo,
        image_reference_link: photoInfo.authorAttributions[0].uri.replace(
          "//",
          "https://"
        ),
        image_reference_name: photoInfo.authorAttributions[0].displayName,
      });
  }

  const categories = googlePlace?.types;

  if (categories) {
    const data = categories.map((category) => ({ category, city: place.city }));
    await categoryInstance({ type: "city" }).insert(data);
  }
}

async function fetchPhoto(name) {
  const response = await fetch(
    `https://places.googleapis.com/v1/${name}/media?maxHeightPx=4800&maxWidthPx=4800&key=${process.env.PLACE_APIKEY}`
  );
  const placePhotoArrayBuffer = await response.arrayBuffer();
  const placePhotoBuffer = Buffer.from(placePhotoArrayBuffer);
  return placePhotoBuffer;
}

export const example = [
  {
    types: ["locality", "political"],
    location: {
      latitude: 35.181450600000005,
      longitude: 136.9065571,
    },
    googleMapsUri: "https://maps.google.com/?cid=3068678493933843282",
    displayName: {
      text: "Nagoya",
      languageCode: "en",
    },
    photos: [
      {
        name: "places/ChIJZSN7EJ5wA2ARUrPO6NQilio/photos/AWU5eFgEc57Vb7BhqjRADCnLZAWmyZD8713U3k5qu_JQ19GKCfMmQbJ7dkgNpL1k6iWuhU570fmtyvhJc3A5a4ZjiVQbtoovM54VrokBRez6A78S5l0YFChurg5_2yKtOrDFvrMyGtejnRELlBhK98ujZX2iacofHDrxYIfv",
        widthPx: 1280,
        heightPx: 720,
        authorAttributions: [
          {
            displayName: "Ninja",
            uri: "//maps.google.com/maps/contrib/105569882226520928710",
            photoUri:
              "//lh3.googleusercontent.com/a-/ALV-UjV5KbqF63G6X8OtOkK5rCwFZ6PUF-xgomzblBRhu4Jp0zE=s100-p-k-no-mo",
          },
        ],
      },
      {
        name: "places/ChIJZSN7EJ5wA2ARUrPO6NQilio/photos/AWU5eFgDOQfD1fwGWY0O0DXD_ViFLw0L831wsAFAUtwgbbSoatViM_nDs9jz_YY50EHjvC0TWDCBelvBsH0YGQl-H-9NlNREJSe_bzHeMzAnpUfy43Ba-k96f4pSv_IkrmkvaFWnUYe0SKzk0swIKs4R2MPNz7j8xW1L4jYw",
        widthPx: 2250,
        heightPx: 4000,
        authorAttributions: [
          {
            displayName: "れいちゃん",
            uri: "//maps.google.com/maps/contrib/106148151396197699319",
            photoUri:
              "//lh3.googleusercontent.com/a-/ALV-UjVdBVvMDD35dkjCsBVwFW9sb826RmBHd-c9aNj4EXXQYV9x=s100-p-k-no-mo",
          },
        ],
      },
      {
        name: "places/ChIJZSN7EJ5wA2ARUrPO6NQilio/photos/AWU5eFgXIUawzp2enOOu2LmL44lQ6mvU_101RNkFtc0644Hl9v07Ph6NhJwHQLd020YcebuhrKAsBGs83mWBc-c1f82ZCvjd7C-vCd2MYQXWZSu8tAAC2gYZbkjexOmdmmRTspLFgU5-3nZkwz7ABRyPRKQp1dOB68jYHIdr",
        widthPx: 3840,
        heightPx: 2160,
        authorAttributions: [
          {
            displayName: "伊藤友晴",
            uri: "//maps.google.com/maps/contrib/112584010063878420362",
            photoUri:
              "//lh3.googleusercontent.com/a-/ALV-UjVkkWZRyd-GIDNHa_arJR9JjR-7E9xgPuUpqKjxng1bZA=s100-p-k-no-mo",
          },
        ],
      },
      {
        name: "places/ChIJZSN7EJ5wA2ARUrPO6NQilio/photos/AWU5eFj_rYGyhCBfxsexK6lEASGk6tTfDNl2qgduXDgdSq30G58gFYt0eM2YXdOoVBLjbjYyeyzUqjXRuxCWYeB9V6lbIHhstHYKkOPi6lpbAJ1di35ArmNp4SKljY1f_Ibw95yQ5XymcB6onTt0jQLGjbPzBmSSU7VymwLU",
        widthPx: 3024,
        heightPx: 4032,
        authorAttributions: [
          {
            displayName: "大谷秀幸",
            uri: "//maps.google.com/maps/contrib/118415495314506366881",
            photoUri:
              "//lh3.googleusercontent.com/a-/ALV-UjXixtXPwZfbVUvFHSj2UeSKeruD0b6vqsPeQT5Jaa4DwCZg=s100-p-k-no-mo",
          },
        ],
      },
      {
        name: "places/ChIJZSN7EJ5wA2ARUrPO6NQilio/photos/AWU5eFgr0GgtBxUIVP89TK2tEEYyD5-keZG-eV3EF0h_or1IpB8jhcS0ToM7FNwLnhtp1W1tsr1ljLrMEpBI666F-xTGXMeG2LWv540Ui3x1OdVrKC1FciAfkKrTWlaStNJhNDVdKo--dgPHLDY58pDMM9f6g1V2tM33w60e",
        widthPx: 3024,
        heightPx: 4032,
        authorAttributions: [
          {
            displayName: "大谷秀幸",
            uri: "//maps.google.com/maps/contrib/118415495314506366881",
            photoUri:
              "//lh3.googleusercontent.com/a-/ALV-UjXixtXPwZfbVUvFHSj2UeSKeruD0b6vqsPeQT5Jaa4DwCZg=s100-p-k-no-mo",
          },
        ],
      },
      {
        name: "places/ChIJZSN7EJ5wA2ARUrPO6NQilio/photos/AWU5eFjvKRFRaZbZj5FpEGlwTXdtbFLqMKYgd8Bvolt4abg7eEvWCZKjEH53G2j9ML6nK5easL8F-zHL8jE30Sx3e9dvv-TiLMDPz51sWHi7gWp7DUXQaQ1RDIXCm1uWRTNu8kO1OCP2pqKGOWPPgedOgZzoSlJSpm4tU83O",
        widthPx: 3024,
        heightPx: 4032,
        authorAttributions: [
          {
            displayName: "大谷秀幸",
            uri: "//maps.google.com/maps/contrib/118415495314506366881",
            photoUri:
              "//lh3.googleusercontent.com/a-/ALV-UjXixtXPwZfbVUvFHSj2UeSKeruD0b6vqsPeQT5Jaa4DwCZg=s100-p-k-no-mo",
          },
        ],
      },
      {
        name: "places/ChIJZSN7EJ5wA2ARUrPO6NQilio/photos/AWU5eFhwoa0jFSfN7BtBReRcY9FQf4rSTMJzIMSQQ9k7t18AvjO0HGGQiJUVWNRBYTUmUryTodaVgZy68xYHnmkbKaENhX3MSRMKpFHtY5vmVl6mHVsdzQr9tKuM6movG-g1EYGjTloAG1kk-lGVgyqCutCZmFPBVPI-yR1b",
        widthPx: 3024,
        heightPx: 4032,
        authorAttributions: [
          {
            displayName: "Man Tsang",
            uri: "//maps.google.com/maps/contrib/113562422435632265823",
            photoUri:
              "//lh3.googleusercontent.com/a/ACg8ocKXqsv_0WdndbEZ_5olm4ZihOJfHzZz4RQxpwI_vLNE=s100-p-k-no-mo",
          },
        ],
      },
      {
        name: "places/ChIJZSN7EJ5wA2ARUrPO6NQilio/photos/AWU5eFghiAp4DazsEc8-9vEzbe4r7jLcXFZtk08FDfct-ejpBQHXXhdjzpN91FaGtrbf33brTqVgPGGCfUmmq8Mv4fA2YWBKDNPE57d28SIfjPPJsNGXLSNGXCO1Y4eIAbVDT27boqPB3Yz7g61bI5MbyrTPOkTQhRZPgpX2",
        widthPx: 3024,
        heightPx: 4032,
        authorAttributions: [
          {
            displayName: "大谷秀幸",
            uri: "//maps.google.com/maps/contrib/118415495314506366881",
            photoUri:
              "//lh3.googleusercontent.com/a-/ALV-UjXixtXPwZfbVUvFHSj2UeSKeruD0b6vqsPeQT5Jaa4DwCZg=s100-p-k-no-mo",
          },
        ],
      },
      {
        name: "places/ChIJZSN7EJ5wA2ARUrPO6NQilio/photos/AWU5eFjC_A41LyGWURmCZDFOSv2y3xL_bu1xlL2-6JPooIVi6ebu-mZ29oZPBkWIlRIkk82xqOJRBEgbc8tkcCFgeZv8Tr8y7yoCy1BgjwIA1zXvje_33Iq1iTGEc6BGoq1hN1rx9ZYjHNd9t8CSVy_mNcOHW61y_8KLGLZ2",
        widthPx: 4608,
        heightPx: 2592,
        authorAttributions: [
          {
            displayName: "午後繾綣 Afternoon lingering",
            uri: "//maps.google.com/maps/contrib/114712214738208974484",
            photoUri:
              "//lh3.googleusercontent.com/a-/ALV-UjUy8LtuusDxdxVPl4mC8n01dlsBAg-F8tDpI7tebgdLI5zA=s100-p-k-no-mo",
          },
        ],
      },
      {
        name: "places/ChIJZSN7EJ5wA2ARUrPO6NQilio/photos/AWU5eFgz-hv6xFPZ6PwlBeTBuNNJGDZtBIOYHA8cpIQ1RrYkeiRpTspocrzLUTnJyMBDMo302xj5GBkxxoHGnbUWqR9i4avhKnUOIQi8vDqxCZOcymJxG0B1tBq6NUtLAYdvfpfEbSYFyvyXeNBaFX036C7m5BnxyQOSqKKA",
        widthPx: 4032,
        heightPx: 3024,
        authorAttributions: [
          {
            displayName: "Ilan-Tal",
            uri: "//maps.google.com/maps/contrib/103098473971461602626",
            photoUri:
              "//lh3.googleusercontent.com/a-/ALV-UjWB40sWD3xxQ-Gb0HekAZHY9HodpyGKR4S8XgbqNTHd4lvw=s100-p-k-no-mo",
          },
        ],
      },
    ],
  },
];
