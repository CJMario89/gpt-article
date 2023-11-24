import {
  Container,
  Flex,
  Heading,
  Input,
  Skeleton,
  SkeletonText,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Pagination, PlaceCard } from "component/blog";
import { useGetPlacesByParams, useGetSearch } from "hooks/db";
import { useState } from "react";

// export const getStaticPaths = async () => {
//   const countries = await getCountries();
//   return {
//     paths: countries.map(({ country }) => ({
//       params: {
//         country,
//       },
//     })),
//     fallback: true,
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   const { country } = params;
//   const cities = await Promise.all(
//     (
//       await getPlacesByParams({ type: "city", country })
//     ).map((place) => {
//       return jsonlize(place);
//     })
//   );
//   console.log(cities);
//   return { props: { country, cities } };
// };
const country = "Japan";

const RegionBlock = ({ region }) => {
  const [page, setPage] = useState(1);

  const { fetchNextPage, data, isLoading, isFetchingNextPage } =
    useGetPlacesByParams({
      type: "city",
      country,
      region,
      limit: 4,
    });
  // console.log(data);
  const index =
    data?.pageParams.indexOf(page) > 0 ? data?.pageParams.indexOf(page) : 0;
  const places = data?.pages[index]?.places;
  const totalPage = data?.pages[0]?.totalPage;

  return (
    <Flex flexDirection="column" alignItems="center" rowGap="8">
      {places &&
        !isLoading &&
        !isFetchingNextPage &&
        places.map((place) => {
          return (
            <PlaceCard key={place.city} place={{ type: "city", ...place }} />
          );
        })}
      {(isLoading || isFetchingNextPage) &&
        Array.from(Array(4)).map((_, i) => {
          return (
            <Flex key={i} flexDirection="row" w="full" p="8" pb="12">
              <Skeleton
                w="200px"
                h="200px"
                color="gray"
                fadeDuration={1}
                mr="12"
                flexShrink="0"
              />
              <Flex flexDirection="column" w="inherit" rowGap="8" mt="4">
                <SkeletonText />
                <SkeletonText />
              </Flex>
            </Flex>
          );
        })}
      {totalPage > 0 && (
        <Pagination
          currentPage={page}
          totalPages={data?.pages[0]?.totalPage}
          onSelect={(p) => {
            if (data?.pageParams.indexOf(page) < 0) {
              fetchNextPage({ pageParam: p });
            }
            setPage(p);
            scrollTo({ top: "0px", behavior: "smooth" });
          }}
        />
      )}
    </Flex>
  );
};

const Index = () => {
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
  const [region, setRegion] = useState(regions[0]);
  const [searchText, setSearchText] = useState("");
  const { data } = useGetSearch({ type: "city", text: searchText });
  console.log(data?.pages[0]);
  return (
    <Container maxW="container.lg" as={Flex} flexDirection="column" rowGap="4">
      <Heading as="h2">Japan</Heading>
      <Text>Traveling information in Japan</Text>
      <Input
        type="text"
        onInput={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <Tabs isFitted variant="enclosed" isLazy>
        <TabList mb="1em">
          {regions.map((region) => (
            <Tab key={region} onChange={(index) => setRegion(regions[index])}>
              {region}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {regions.map((region) => (
            <TabPanel key={region}>
              <RegionBlock region={region} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      {/* <Flex flexDirection="column">
        {cities.map((city) => {
          return (
            <PlaceCard key={city.city} place={{ type: "city", ...city }} />
          );
        })}
      </Flex> */}
    </Container>
  );
};

export default Index;
