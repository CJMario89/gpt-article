import { Container, Flex, Heading, Input } from "@chakra-ui/react";
import {
  Pagination,
  PlaceCard,
  PlaceCardSkeleton,
  RegionBlock,
} from "component/blog";
import RouterTab from "component/blog/router-tab";
import { SearchIcon } from "component/blog/search";
import { useGetSearch } from "hooks/db";
import { useState } from "react";
import { jsonlize } from "utils/jsonlize";

// export const getStaticPaths = async () => {
//   const cities = await getAllPlaces({ type: "city" });
//   return {
//     paths: cities.map(({ prefecture, city }) => ({
//       params: {
//         prefecture,
//         city,
//       },
//     })),
//     fallback: true,
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   const { prefecture, city } = params;
//   const article = await getArticle({ type: "city", prefecture, city });
//   return {
//     props: { article: jsonlize(article), prefecture, city },
//   };
// };
export const getServerSideProps = async ({ params }) => {
  const { region, prefecture, city } = params;
  return { props: { region, prefecture, city } };
};

//SEO, share, other function

const Index = ({ region, prefecture, city }) => {
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const { fetchNextPage, data, isLoading, isFetchingNextPage } = useGetSearch({
    type: "spot",
    region,
    prefecture,
    city,
    text,
    limit: 4,
  });
  const index =
    data?.pageParams.indexOf(page) > 0 ? data?.pageParams.indexOf(page) : 0;
  const places = data?.pages[index]?.places;
  const totalPage = data?.pages[0]?.totalPage;

  return (
    <Container
      as={Flex}
      maxW="container.xl"
      p="8"
      flexDirection="column"
      alignItems="flex-start"
      rowGap="4"
    >
      <RouterTab region={region} prefecture={prefecture} city={city} />
      <Heading as="h2" alignSelf="flex-start">
        {city}
      </Heading>
      <Flex position="relative" w="full">
        <Input
          type="text"
          pl="8"
          pr="6"
          placeholder="Search City"
          background="rgba(245, 245, 245, 0.2)"
          border="2px solid #eeeeee"
          onInput={(e) => {
            setText(e.target.value);
          }}
        />
        <SearchIcon
          position="absolute"
          left="12px"
          top="50%"
          transform="translateY(-50%)"
          color="neutral.800"
        />
      </Flex>
      {places &&
        !isLoading &&
        !isFetchingNextPage &&
        places.map((place) => {
          return (
            <PlaceCard
              key={place?.spot}
              place={{ type: "spot", region, ...place }}
            />
          );
        })}
      <PlaceCardSkeleton isLoading={isLoading || isFetchingNextPage} />
      {totalPage > 0 && (
        <Pagination
          currentPage={page}
          totalPages={data?.pages[0]?.totalPage}
          onSelect={(p) => {
            if (data?.pageParams.indexOf(p) < 0) {
              fetchNextPage({ pageParam: p });
            }
            setPage(p);
            scrollTo({ top: "0px", behavior: "smooth" });
          }}
        />
      )}
    </Container>
  );
};

export default Index;