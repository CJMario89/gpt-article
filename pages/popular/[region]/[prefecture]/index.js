import {
  Container,
  Flex,
  useMediaQuery,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { getPopularPlaces } from "backend-service/get";
import { PlaceCard, Seo } from "component/blog";
import { useTranslations } from "next-intl";

// export const getStaticPaths = async ({ locales }) => {
//   const prefectures = await getAllPlaces({ type: "prefecture" });
//   return {
//     paths: prefectures.flatMap(({ region, prefecture }) => {
//       return locales.map((locale) => ({
//         params: {
//           region,
//           prefecture,
//         },
//         locale,
//       }));
//     }),
//     fallback: true,
//   };
// };

export const getServerSideProps = async ({ params, locale }) => {
  const { prefecture } = params;
  const spots = await getPopularPlaces({
    type: "prefecture",
    place: prefecture,
    locale,
    limit: 30,
  });
  return {
    props: {
      prefecture,
      spots,
    },
  };
};

const Index = ({ spots = [] }) => {
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const t = useTranslations();
  const seo = {
    title: t("SEO title", { place: spots[0]?.prefecture }),
    description: t("SEO description", {
      place: spots[0]?.prefecture,
      spots: spots?.map((spot) => spot?.spot).join(", "),
    }),
  };

  return (
    <Container
      as={Flex}
      maxW="container.lg"
      p={{ base: "4", lg: "8" }}
      py={{ base: "2", lg: "8" }}
      flexDirection="column"
      alignItems="flex-start"
      rowGap="4"
    >
      <Seo {...seo} imageUrl={spots?.[1]?.imageUrl} />
      <Heading as="h1" color="primary.700" fontSize="2xl">
        {t(`Top 30 Spots in {place}`, {
          place: spots[0]?.prefecture,
        })}
      </Heading>
      <Divider bgColor="primary.700" my="2" />
      {spots.map((spot, i) => {
        return (
          <Flex key={i} w="full" position="relative" justifyContent="center">
            <Heading
              as="h2"
              color="primary.700"
              bottom={isDesktop ? "180px" : "220px"}
              position="absolute"
              left={isDesktop ? "-8" : "4"}
              zIndex="1"
            >
              {i + 1}.
            </Heading>
            <PlaceCard
              isHorizontal={!isDesktop}
              place={{ ...spot, type: "spot" }}
            />
          </Flex>
        );
      })}
    </Container>
  );
};

export default Index;
