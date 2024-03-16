import { infoInstance, instance } from "backend-service/common";
import { translateText } from "./translate";

// const target = "zh-TW";
// const targetInstance = "PlaceInfoZhTW";
const target = "ja-JP";
const targetInstance = "PlaceInfoJaJP";
const amount = 1;
export const batchTranslate = async () => {
  await regionTranslate();
  await prefectureTranslate();
  await cityTranslate();
  await spotTranslate();
  // await spotTranslateX();
};

const regionTranslate = async () => {
  const _places = await infoInstance({ type: "prefecture" })
    .where("prefecture", "All")
    .select("id", "region", "title", "description", "content");
  const donePlaces = await instance(targetInstance).select("placeId");
  const places = _places.filter((place) => {
    return !donePlaces.some(
      (donePlace) => donePlace.placeId === `${place.region}-${place.id}`
    );
  });
  console.log(places.length, "places length");
  for (let i = 0; i < places.length; i++) {
    const { id, region, title, description, content } = places[i];
    const place = region;
    const [placeTrans, titleTrans, descriptionTrans, contentTrans] =
      await Promise.all([
        translateText(appendJapanWord(place, place), target),
        translateText(appendJapanWord(title, place), target),
        translateText(appendJapanWord(description, place), target),
        translateText(appendJapanWord(content, place), target),
      ]);
    const _place = removeJapanWord(placeTrans);
    const _title = replaceJapanWord(titleTrans, _place, placeTrans);
    const _description = replaceJapanWord(descriptionTrans, _place, placeTrans);
    const _content = replaceJapanWord(contentTrans, _place, placeTrans);
    await instance(targetInstance).insert({
      placeId: `${place}-${id}`,
      region: _place,
      title: _title,
      description: _description,
      content: _content,
    });
  }
};

const prefectureTranslate = async () => {
  const _places = await infoInstance({ type: "prefecture" })
    .whereNot("prefecture", "All")
    .select("id", "prefecture", "title", "description", "content");
  const donePlaces = await instance(targetInstance).select("placeId");
  const places = _places.filter((place) => {
    return !donePlaces.some(
      (donePlace) => donePlace.placeId === `${place.prefecture}-${place.id}`
    );
  });
  console.log(places.length, "places length");
  for (let i = 0; i < places.length; i++) {
    const { id, prefecture, title, description, content } = places[i];
    const place = prefecture;
    const [placeTrans, titleTrans, descriptionTrans, contentTrans] =
      await Promise.all([
        translateText(appendJapanWord(place, place), target),
        translateText(appendJapanWord(title, place), target),
        translateText(appendJapanWord(description, place), target),
        translateText(appendJapanWord(content, place), target),
      ]);
    const _place = removeJapanWord(placeTrans);
    const _title = replaceJapanWord(titleTrans, _place, placeTrans);
    const _description = replaceJapanWord(descriptionTrans, _place, placeTrans);
    const _content = replaceJapanWord(contentTrans, _place, placeTrans);
    await instance(targetInstance).insert({
      placeId: `${place}-${id}`,
      prefecture: _place,
      title: _title,
      description: _description,
      content: _content,
    });
  }
};

const cityTranslate = async () => {
  const _places = await infoInstance({ type: "city" }).select(
    "id",
    "city",
    "title",
    "description",
    "content"
  );
  const donePlaces = await instance(targetInstance).select("placeId");
  const places = _places.filter((place) => {
    return !donePlaces.some(
      (donePlace) => donePlace.placeId === `${place.city}-${place.id}-city`
    );
  });
  console.log(places.length, "places length");
  for (let i = 0; i < places.length; i++) {
    const { id, city, title, description, content } = places[i];
    const place = city;
    const [placeTrans, titleTrans, descriptionTrans, contentTrans] =
      await Promise.all([
        translateText(appendJapanWord(place, place), target),
        translateText(appendJapanWord(title, place), target),
        translateText(appendJapanWord(description, place), target),
        translateText(appendJapanWord(content, place), target),
      ]);
    const _place = removeJapanWord(placeTrans);
    const _title = replaceJapanWord(titleTrans, _place, placeTrans);
    const _description = replaceJapanWord(descriptionTrans, _place, placeTrans);
    const _content = replaceJapanWord(contentTrans, _place, placeTrans);
    await instance(targetInstance).insert({
      placeId: `${place}-${id}-city`,
      city: _place,
      title: _title,
      description: _description,
      content: _content,
    });
  }
};

const spotTranslate = async () => {
  const _places = await infoInstance({ type: "spot" }).select(
    "id",
    "city",
    "spot",
    "title",
    "description",
    "content"
  );
  const donePlaces = await instance(targetInstance).select("placeId");
  const places = _places.filter((place) => {
    return !donePlaces.some(
      (donePlace) => donePlace.placeId === `${place.spot}-${place.id}-spot`
    );
  });
  console.log(places.length, "places length");
  for (let i = 0; i < places.length; i++) {
    const { id, city, spot, title, description, content } = places[i];
    const place = spot;
    const [placeTrans, titleTrans, descriptionTrans, contentTrans] =
      await Promise.all([
        translateText(place, target),
        translateText(appendJapanWord(title, city), target),
        translateText(appendJapanWord(description, city), target),
        translateText(appendJapanWord(content, city), target),
      ]);
    const _place = removeJapanWord(placeTrans);
    // const _title = replaceJapanWord(titleTrans, _place, placeTrans);
    // const _description = replaceJapanWord(descriptionTrans, _place, placeTrans);
    // const _content = replaceJapanWord(contentTrans, _place, placeTrans);
    await instance(targetInstance).insert({
      placeId: `${place}-${id}-spot`,
      spot: _place,
      title: titleTrans,
      description: descriptionTrans,
      content: contentTrans,
    });
  }
};

const spotTranslateX = async () => {
  const places = await infoInstance({ type: "spot" }).select(
    "id",
    "spot",
    "weekdayDescriptions"
  );

  for (let i = 0; i < places.length; i++) {
    const { id, spot, weekdayDescriptions } = places[i];
    if (!weekdayDescriptions) continue;
    const [weekdayDescriptionsTrans] = await Promise.all([
      // translateText(adrFormatAddress, target),
      translateText(weekdayDescriptions, target),
    ]);
    await instance(targetInstance)
      .where({ placeId: `${spot}-${id}-spot` })
      .update({
        ...(weekdayDescriptionsTrans
          ? { openTime: weekdayDescriptionsTrans }
          : {}),
      });
  }
};

const appendJapanWord = (text, place) => {
  const regex = new RegExp(place, "g");
  return text.replace(regex, `${place},Japan`);
};

const removeJapanWord = (text) => {
  // const regex = new RegExp(`日本`, "g");
  const regex = new RegExp(`,Japan`, "g");
  return text.replace(regex, "");
};

const replaceJapanWord = (text, place, placeJapan) => {
  const regex = new RegExp(placeJapan, "g");
  return text.replace(regex, place);
};
