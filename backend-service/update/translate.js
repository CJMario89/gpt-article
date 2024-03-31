// const projectId = "digital-arcade-412504";//close

// import translateModule from "@google-cloud/translate";
// const Translate = translateModule.v2.Translate;
// // Instantiates a client
// const translateInstance = new Translate({
//   projectId,
//   key: process.env.PLACE_APIKEY,
// });

export const translateText = async (text, target = "zh-TW") => {
  // const [translation] = await translateInstance.translate(text, target);
  return text + target;
};
