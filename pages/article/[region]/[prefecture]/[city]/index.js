import {
  getAllPlaces,
  getArticle,
  getNearPlaces,
  search,
} from "backend-service/get";
import { Blog } from "component/blog";

export const getStaticPaths = async ({ locales }) => {
  const cities = await getAllPlaces({ type: "city" });
  return {
    paths: cities.flatMap(({ region, prefecture, city }) => {
      return locales.map((locale) => ({
        params: {
          region,
          prefecture,
          city,
        },
        locale,
      }));
    }),
    fallback: true,
  };
};

export const getStaticProps = async ({ params, locale }) => {
  const { region, prefecture, city } = params;
  const nearCities = await getNearPlaces({
    type: "city",
    prefecture,
    city,
    limit: 8,
    page: 1,
    locale,
  });
  const spotsIn = (
    await search({
      type: "spot",
      region,
      prefecture,
      city,
      limit: 8,
      page: 1,
      locale,
    })
  )?.places;
  const info = await getArticle({
    type: "city",
    region,
    prefecture,
    city,
    locale,
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
