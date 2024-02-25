import {
  getAllPlaces,
  getArticle,
  getNearPlaces,
  search,
} from "backend-service/get";
import { Blog } from "component/blog";

export const getStaticPaths = async () => {
  const cities = await getAllPlaces({ type: "city" });
  return {
    paths: cities.map(({ region, prefecture, city }) => ({
      params: {
        region,
        prefecture,
        city,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { region, prefecture, city } = params;
  const nearCities = await getNearPlaces({
    type: "city",
    prefecture,
    city,
    limit: 8,
    page: 1,
  });

  const spotsIn = (
    await search({
      type: "spot",
      region,
      prefecture,
      city,
      limit: 8,
      page: 1,
    })
  )?.places;
  const info = await getArticle({
    type: "city",
    region,
    prefecture,
    city,
  });
  return {
    props: { info, nearCities, spotsIn },
  };
};

//SEO, share, other function
//image cache control
//what attract people
//backend structure
//frontend structure
//product structure
const index = ({ info = {}, nearCities, spotsIn }) => {
  return <Blog info={info} nearCities={nearCities} spotsIn={spotsIn} />;
};

export default index;
