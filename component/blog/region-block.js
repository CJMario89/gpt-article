import { Flex, Input, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useGetSearch } from "hooks/db";
import { useState } from "react";
import PlaceCard from "./place-card";
import Pagination from "./pagination";
import { SearchIcon } from "./search";
import PlaceCardSkeleton from "./place-card-skeleton";

const RegionBlock = ({ type, region, prefecture }) => {
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");

  const { fetchNextPage, data, isLoading, isFetchingNextPage } = useGetSearch({
    type: "city",
    region,
    prefecture,
    text,
    limit: 4,
  });
  const index =
    data?.pageParams.indexOf(page) > 0 ? data?.pageParams.indexOf(page) : 0;
  const places = data?.pages[index]?.places;
  const totalPage = data?.pages[0]?.totalPage;

  return (
    <Flex
      w="full"
      flexDirection="column"
      alignItems="center"
      rowGap={{ base: "4", md: "8" }}
    >
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
          color="#neutral.800"
        />
      </Flex>
      {places &&
        !isLoading &&
        !isFetchingNextPage &&
        places.map((place) => {
          return (
            <PlaceCard key={place.city} place={{ type, region, ...place }} />
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
    </Flex>
  );
};

export default RegionBlock;
