import { getArticle, search } from "backend-service/get";
import { Blog } from "component/blog";

const regions = [
  "Hokkaido",
  "Tohoku",
  "Kanto",
  "Chubu",
  "Kansai",
  "Chugoku",
  "Shikoku",
  "Kyushu",
  "Okinawa",
];

export const getStaticPaths = async () => {
  return {
    paths: regions.map((region) => ({
      params: {
        region,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { region } = params;

  const prefecturesIn = (
    await search({
      type: "prefecture",
      region,
      limit: 12,
      page: 1,
    })
  )?.places;

  const info = await getArticle({
    type: "prefecture",
    region,
    prefecture: "All",
  });
  return {
    props: { info, prefecturesIn },
  };
};

const index = ({ info = {}, prefecturesIn }) => {
  return <Blog info={info} prefecturesIn={prefecturesIn} />;
};

export default index;
