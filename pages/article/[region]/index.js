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

export const getStaticPaths = async ({ locales }) => {
  return {
    paths: regions.flatMap((region) => {
      return locales.map((locale) => ({
        params: {
          region,
        },
        locale,
      }));
    }),
    fallback: true,
  };
};

export const getStaticProps = async ({ params, locale }) => {
  const { region } = params;
  const prefecturesIn = (
    await search({
      type: "prefecture",
      region,
      limit: 12,
      page: 1,
      locale,
    })
  )?.places;
  const info = await getArticle({
    type: "region",
    region,
    prefecture: "All",
    locale,
  });
  return {
    props: { info, prefecturesIn },
    revalidate: 30000000,
  };
};

const index = ({ info = {}, prefecturesIn }) => {
  return <Blog info={info} prefecturesIn={prefecturesIn} />;
};

export default index;
