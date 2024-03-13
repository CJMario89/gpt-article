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

export const getRestuarantInfo = async ({ place }) => {
  const location = place.viewport.replace(/\n/g, "");
  const [low, high] = location.split("&");
  const [latitudeL, longitudeL] = low.split(",");
  const [latitudeH, longitudeH] = high.split(",");
  const rawSpots = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        languageCode: "en",
        maxResultCount: 20,
        rankPreference: "POPULARITY",
        includedTypes: ["restaurant"],
        excludedTypes: [
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
          "shopping_mall",
          "car_dealer",
          "fitness_center",
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
              latitude: (Number(latitudeL) + Number(latitudeH)) / 2,
              longitude: (Number(longitudeL) + Number(longitudeH)) / 2,
            },
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
      ?.filter(
        (spot) => Number(spot?.userRatingCount) > 50 && Number(spot?.rating) > 4
      )
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

async function insertSpot(googlePlace, place, isUpdate) {
  const name = googlePlace?.displayName?.text?.replace(/ /g, "-");
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
    articleType: "restuarant",
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
