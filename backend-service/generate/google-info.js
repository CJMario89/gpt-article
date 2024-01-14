import {
  infoInstance,
  categoryInstance,
  imageInstance,
} from "backend-service/common";

const headers = new Headers({
  "X-Goog-Api-Key": process.env.PLACE_APIKEY,
  // "X-Goog-FieldMask":
  //   "places.types,places.displayName,places.rating,places.userRatingCount,places.googleMapsUri,places.googleMapsUri,places.websiteUri,places.location,places.photos",
  "X-Goog-FieldMask": "*",
});

export const getGoogleInfo = async ({ place }) => {
  const rawResponse = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        textQuery: `Japan ${place.prefecture} ${place.city}`,
        languageCode: "en",
      }),
    }
  );
  const response = await rawResponse.json();
  const googlePlace = response.places[0];
  await insertCity(googlePlace, place, "", "city");
  const rawSpots = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        languageCode: "en",
        maxResultCount: 20,
        rankPreference: "POPULARITY",
        includedTypes: [
          "national_park",
          "tourist_attraction",
          "park",
          "museum",
          "shopping_mall",
          "spa",
          "aquarium",
          "amusement_center",
          "amusement_park",
          "hiking_area",
          "marina",
          "zoo",
        ],
        excludedTypes: [
          "car_dealer",
          "fitness_center",
          "restaurant",
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
          "sports_complex",
          "gym",
          "coffee_shop",
        ],
        locationRestriction: {
          circle: {
            center: {
              latitude:
                (googlePlace?.viewport?.high?.latitude +
                  googlePlace?.viewport?.low?.latitude) /
                2,
              longitude:
                (googlePlace?.viewport?.high?.longitude +
                  googlePlace?.viewport?.low?.longitude) /
                2,
              // latitude: googlePlace?.location?.latitude,
              // longitude: googlePlace?.location?.longitude,
            },
            // radius: 50000,
            radius:
              Math.ceil(
                Math.sqrt(Number(place.area.replace(/,/g, ""))) * 1000
              ) ?? 5000,
          },
        },
      }),
    }
  );
  const spotsInfo = await rawSpots.json();
  const spots = spotsInfo.places ?? [];
  const allSpots = (await infoInstance({ type: "spot" }).select("spot")).map(
    ({ spot }) => spot
  );
  await Promise.all(
    spots
      ?.filter((spot) => Number(spot?.userRatingCount) > 100)
      .map(async (data) => {
        const name = data?.displayName?.text?.replace(/ /g, "-");
        const reviews = data.reviews;
        if (reviews && name) {
          try {
            await insertSpot(data, place, allSpots.includes(name));
          } catch (e) {
            console.log("catched");
            console.log(e);
          }
        }
        return;
      })
  );
};

async function insertCity(googlePlace, place) {
  const location = `${googlePlace?.location?.latitude},${googlePlace?.location?.longitude}`;
  const viewport = `${googlePlace?.viewport?.low?.latitude},${googlePlace?.viewport?.low?.longitude}
&${googlePlace?.viewport?.high?.latitude},${googlePlace?.viewport?.high?.longitude}`;
  const googleWebsite = googlePlace?.websiteUri;
  const googleMapUrl = googlePlace?.googleMapsUri;
  const prefecture = place.prefecture;
  const cityJapanese = place.cityJapanese;
  const population = place.population;
  const area = place.area;
  const density = place.density;
  const founded = place.founded;
  const website = place.cityLink;

  await infoInstance({ type: "city" }).insert({
    city: place.city,
    location,
    viewport,
    googleMapUrl,
    googleWebsite,
    prefecture,
    population,
    cityJapanese,
    area,
    density,
    founded,
    website,
  });

  if (Array.isArray(googlePlace.photos) && googlePlace.photos.length > 0) {
    const photoInfos = googlePlace.photos.map((photoInfo) => ({
      prefecture,
      city: place.city,
      image: photoInfo.name,
      referenceLink: photoInfo.authorAttributions[0].uri.replace(
        "//",
        "https://"
      ),
      referenceName: photoInfo?.authorAttributions?.[0]?.displayName,
    }));
    //const photo = await fetchPhoto(photoInfo.name);
    await imageInstance({ type: "city" }).insert(photoInfos);
  }
}

async function insertSpot(googlePlace, place, isUpdate) {
  const name = googlePlace?.displayName?.text
    ?.replace(/ /g, "-")
    .replace(/\//g, "-");
  const spotData = {
    prefecture: place.prefecture,
    city: place.city,
    spot: name,
    location: `${googlePlace?.location?.latitude},${googlePlace?.location?.longitude}`,
    viewport: `${googlePlace?.viewport?.low?.latitude},${googlePlace?.viewport?.low?.longitude}
&${googlePlace?.viewport?.high?.latitude},${googlePlace?.viewport?.high?.longitude}`,
    googleMapUrl: googlePlace.googleMapsUri,
    googleRating: googlePlace.rating,
    googleRatingCount: googlePlace.userRatingCount,
    googleWebsite: googlePlace.websiteUri,
    editorialSummary: googlePlace?.editorialSummary?.text,
    primaryType:
      googlePlace?.primaryTypeDisplayName?.text ?? googlePlace?.primaryType,
    internationalPhoneNumber: googlePlace.internationalPhoneNumber,
    adrFormatAddress: googlePlace.adrFormatAddress,
    weekdayDescriptions:
      googlePlace?.regularOpeningHours?.weekdayDescriptions?.join("&"),
    reviews: googlePlace.reviews.map((review) => review?.text?.text).join("&"),
    goodForChildren: googlePlace.goodForChildren ?? false,
    goodForGroups: googlePlace.goodForGroups ?? false,
    allowsDogs: googlePlace.allowsDogs ?? false,
    restroom: googlePlace.restroom ?? false,
    wheelchairAccessibleEntrance:
      googlePlace?.accessibilityOptions?.wheelchairAccessibleEntrance ?? false,
    parkingLot: googlePlace?.parkingOptions ? true : false,
    reservable: googlePlace?.reservable ?? false,
    servesBreakfast: googlePlace?.servesBreakfast ?? false,
    servesBrunch: googlePlace?.servesBrunch ?? false,
    servesLunch: googlePlace?.servesLunch ?? false,
    servesDinner: googlePlace?.servesDinner ?? false,
    servesBeer: googlePlace?.servesBeer ?? false,
    priceLevel: googlePlace?.priceLevel,
    payment: `${googlePlace?.paymentOptions?.acceptsCreditCards ? 1 : 0},${
      googlePlace?.paymentOptions?.acceptsNfc ? 1 : 0
    }`,
    takeout: googlePlace?.takeout ?? false,
    delivery: googlePlace?.delivery ?? false,
    dineIn: googlePlace?.dineIn ?? false,
    servesVegetarianFood: googlePlace?.servesVegetarianFood ?? false,
  };
  const imageData = googlePlace?.photos?.map((photoInfo) => {
    const photo = photoInfo ? photoInfo.name : null;
    return {
      prefecture: place.prefecture,
      city: place.city,
      spot: name,
      image: photo,
      referenceLink: photo
        ? photoInfo.authorAttributions?.[0]?.uri?.replace("//", "https://")
        : null,
      referenceName: photo
        ? photoInfo?.authorAttributions?.[0]?.displayName
        : null,
    };
  });
  try {
    //test:  two near places and use big radius to update
    if (isUpdate) {
      await infoInstance({ type: "spot" })
        .where({ spot: name })
        .update(spotData);

      //delete all spot in image data
      await imageInstance({ type: "spot" }).where({ spot: name }).delete();

      await imageInstance({ type: "spot" }).insert(imageData);
    } else {
      await infoInstance({ type: "spot" }).insert(spotData);
      await imageInstance({ type: "spot" }).insert(imageData);
    }

    const categories = googlePlace?.types;
    if (categories) {
      const data = categories.map((category) => ({
        category,
        prefecture: place.prefecture,
        city: place.city,
        spot: name,
      }));
      if (isUpdate) {
        await Promise.all(
          data.map(async (data) => {
            await categoryInstance()
              .where({ spot: name, category: data.category })
              .update(data);
          })
        );
      } else {
        await categoryInstance().insert(data);
      }
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

//await fetchPhoto(photoInfo.name)
async function fetchPhoto(name) {
  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/${name}/media?maxHeightPx=4800&maxWidthPx=4800&key=${process.env.PLACE_APIKEY}`
    );
    const placePhotoArrayBuffer = await response.arrayBuffer();
    const placePhotoBuffer = Buffer.from(placePhotoArrayBuffer);
    return placePhotoBuffer;
  } catch (e) {
    console.log(e);
    return null;
  }
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
