import { getAllPlaces, getArticle, getNearPlaces } from "backend-service/get";
import { Blog } from "component/blog";

export const getStaticPaths = async () => {
  const spots = await getAllPlaces({ type: "spot" });
  return {
    paths: spots.map(({ region, prefecture, city, spot }) => ({
      params: {
        region,
        prefecture,
        city,
        spot,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { region, prefecture, city, spot } = params;
  const nearCities = await getNearPlaces({
    type: "city",
    prefecture,
    city,
    limit: 8,
    page: 1,
  });
  const nearSpots = await getNearPlaces({
    type: "spot",
    city,
    spot,
    limit: 8,
    page: 1,
  });
  const nearRestuarants = await getNearPlaces({
    type: "restuarant",
    city,
    spot,
    limit: 8,
    page: 1,
  });
  const info = await getArticle({
    type: "spot",
    region,
    prefecture,
    city,
    spot,
  });
  return {
    props: { info, spot, nearCities, nearSpots, nearRestuarants },
    revalidate: 30000000,
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
