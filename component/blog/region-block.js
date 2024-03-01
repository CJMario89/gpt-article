import { Flex, Input, useMediaQuery } from "@chakra-ui/react";
import { useGetSearch } from "hooks/db";
import { useState } from "react";
import PlaceCard from "./place-card";
import Pagination from "./pagination";
import PlaceCardSkeleton from "./place-card-skeleton";
import SearchIcon from "assets/search.svg";
import { useRouter } from "next/router";
import usePage from "hooks/use-page";

const RegionBlock = ({ type, region, prefecture }) => {
  const [page, setPage] = usePage();
  const [text, setText] = useState("");
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const { asPath, pathname } = useRouter();
  console.log(asPath, pathname);
  const query = useGetSearch({
    type: "city",
    region,
    prefecture,
    text,
    limit: 4,
  });

  const { fetchNextPage, data, isLoading, isFetchingNextPage } = query;

  const index =
    data?.pageParams.indexOf(page) > 0 ? data?.pageParams.indexOf(page) : 0;
  const places = data?.pages[index]?.places;
  const totalPage = data?.pages[0]?.totalPage;

  return (
    <Flex
      w="full"
      flexDirection="column"
      alignItems="center"
      rowGap={{ base: "4", md: "6" }}
    >
      <Flex position="relative" w="full">
        <Input
          type="text"
          placeholder="Search City"
          onInput={(e) => {
            setPage(1);
            setText(e.target.value);
          }}
        />
        <SearchIcon
          position="absolute"
          left="4"
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
              key={place.city}
              isHorizontal={isDesktop ? false : true}
              place={{ type, region, ...place }}
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
    </Flex>
  );
};

export default RegionBlock;
