import {
  getAllPlaces,
  getArticle,
  getNearPlaces,
  search,
} from "backend-service/get";
import { Blog } from "component/blog";

export const getStaticPaths = async ({ locales }) => {
  const prefectures = await getAllPlaces({ type: "prefecture" });
  return {
    paths: prefectures.flatMap(({ region, prefecture }) => {
      return locales.map((locale) => ({
        params: {
          region,
          prefecture,
        },
        locale,
      }));
    }),
    fallback: true,
  };
};

export const getStaticProps = async ({ params, locale }) => {
  const { region, prefecture } = params;
  const nearPrefectures = await getNearPlaces({
    type: "prefecture",
    prefecture,
    limit: 4,
    page: 1,
    locale,
  });

  const citiesIn = (
    await search({
      type: "city",
      region,
      prefecture,
      limit: 8,
      page: 1,
      locale,
    })
  )?.places;

  const info = await getArticle({
    type: "prefecture",
    region,
    prefecture,
    locale,
  });
  return {
    props: { info, nearPrefectures, citiesIn },
  };
};

const index = ({ info = {}, nearPrefectures, citiesIn }) => {
  return (
    <Blog info={info} nearPrefectures={nearPrefectures} citiesIn={citiesIn} />
  );
};

export default index;
