import { getArticle, getNearPlaces } from "backend-service/get";
import { Blog } from "component/blog";

// export const getStaticPaths = async ({ locales }) => {
//   const spots = await getAllPlaces({ type: "spot" });
//   return {
//     paths: spots.flatMap(({ region, prefecture, city, spot }) => {
//       return locales.map((locale) => ({
//         params: {
//           region,
//           prefecture,
//           city,
//           spot,
//         },
//         locale,
//       }));
//     }),
//     fallback: true,
//   };
// };

export const getServerSideProps = async ({ params, locale }) => {
  const { region, prefecture, city, spot } = params;
  const nearCities = await getNearPlaces({
    type: "city",
    prefecture,
    city,
    limit: 8,
    page: 1,
    locale,
  });
  const nearSpots = await getNearPlaces({
    type: "spot",
    city,
    spot,
    limit: 8,
    page: 1,
    locale,
  });
  const nearRestuarants = await getNearPlaces({
    type: "restuarant",
    city,
    spot,
    limit: 8,
    page: 1,
    locale,
  });
  const info = await getArticle({
    type: "spot",
    region,
    prefecture,
    city,
    spot,
    locale,
  });
  return {
    props: { info, spot, nearCities, nearSpots, nearRestuarants },
  };
};

//SEO, share, other function
//image cache control
//what attract people
//backend structure
//frontend structure
//product structure
const index = ({ info = {}, nearCities, nearSpots, nearRestuarants }) => {
  return (
    <Blog
      info={info}
      nearCities={nearCities}
      nearSpots={nearSpots}
      nearRestuarants={nearRestuarants}
    />
  );
};

export default index;
