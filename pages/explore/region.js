import { Container, Flex, Heading, Input } from "@chakra-ui/react";
import SearchIcon from "assets/search.svg";
import { Pagination, PlaceCard, PlaceCardSkeleton } from "component/blog";
import { useGetSearch } from "hooks/db";
import { useState } from "react";

const Index = () => {
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const { fetchNextPage, data, isLoading, isFetchingNextPage } = useGetSearch({
    type: "prefecture",
    text,
    limit: 4,
  });
  const index =
    data?.pageParams.indexOf(page) > 0 ? data?.pageParams.indexOf(page) : 0;
  const places = data?.pages[index]?.places;
  const totalPage = data?.pages[0]?.totalPage;
  console.log(data);
  return (
    <Container
      as={Flex}
      maxW="container.lg"
      p="8"
      flexDirection="column"
      alignItems="flex-start"
      rowGap="4"
    >
      <Heading as="h2" alignSelf="flex-start">
        Explore Prefecture
      </Heading>
      <Flex position="relative" w="full">
        <Input
          type="text"
          pl="8"
          pr="6"
          placeholder="Search prefecture"
          background="rgba(245, 245, 245, 0.2)"
          onInput={(e) => {
            setPage(1);
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
              place={{ type: "prefecture", ...place }}
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