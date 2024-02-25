import {
  getAllPlaces,
  getArticle,
  getNearPlaces,
  search,
} from "backend-service/get";
import { Blog } from "component/blog";

export const getStaticPaths = async () => {
  const prefectures = await getAllPlaces({ type: "prefecture" });
  return {
    paths: prefectures.map(({ region, prefecture }) => ({
      params: {
        region,
        prefecture,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { region, prefecture } = params;
  const nearPrefectures = await getNearPlaces({
    type: "prefecture",
    prefecture,
    limit: 4,
    page: 1,
  });

  const citiesIn = (
    await search({
      type: "city",
      region,
      prefecture,
      limit: 8,
      page: 1,
    })
  )?.places;

  const info = await getArticle({
    type: "prefecture",
    region,
    prefecture,
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
