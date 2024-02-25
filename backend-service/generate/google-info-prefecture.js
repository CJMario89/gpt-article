import { instance } from "backend-service/common";

const headers = new Headers({
  "X-Goog-Api-Key": process.env.PLACE_APIKEY,
  // "X-Goog-FieldMask":
  //   "places.types,places.displayName,places.rating,places.userRatingCount,places.googleMapsUri,places.googleMapsUri,places.websiteUri,places.location,places.photos",
  "X-Goog-FieldMask": "*",
});

export const getGooglePrefectureInfo = async ({ place }) => {
  const rawResponse = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        textQuery: `Japan ${
          place.prefecture === "All" ? place.region : place.prefecture
        }`,
        languageCode: "en",
      }),
    }
  );
  const response = await rawResponse.json();
  const googlePlace = response.places[0];
  await insertPrefecture(googlePlace, place);
};

async function insertPrefecture(googlePlace, place) {
  const location = `${googlePlace?.location?.latitude},${googlePlace?.location?.longitude}`;
  const googleMapUrl = googlePlace?.googleMapsUri;
  const prefecture = place.prefecture;
  const region = place.region;

  await instance("PrefectureInfo").where({ region, prefecture }).update({
    location,
    googleMapUrl,
  });

  if (Array.isArray(googlePlace.photos) && googlePlace.photos.length > 0) {
    const photoInfos = googlePlace.photos.map((photoInfo) => ({
      prefecture,
      region,
      image: photoInfo.name,
      referenceLink: photoInfo.authorAttributions[0].uri.replace(
        "//",
        "https://"
      ),
      referenceName: photoInfo?.authorAttributions?.[0]?.displayName,
    }));
    //const photo = await fetchPhoto(photoInfo.name);
    await instance("PrefectureImage").insert(photoInfos);
  }
}
