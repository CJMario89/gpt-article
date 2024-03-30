import { Button, Flex, Heading, Input, useMediaQuery } from "@chakra-ui/react";
import { useGetSearch } from "hooks/db";
import { useState } from "react";
import PlaceCard from "./place-card";
import Pagination from "./pagination";
import PlaceCardSkeleton from "./place-card-skeleton";
import SearchIcon from "assets/search.svg";
import usePage from "hooks/use-page";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import useDebounce from "utils/use-debounce";

const RegionBlock = ({ type, region, prefecture }) => {
  const [page, setPage] = usePage();
  const [text, setText] = useState("");
  const debounce = useDebounce();
  const t = useTranslations();
  const { locale } = useRouter();
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const query = useGetSearch({
    type: "city",
    region,
    prefecture,
    text,
    limit: 10,
    locale,
  });

  const { fetchNextPage, data, isFetching, isFetchingNextPage, isFetched } =
    query;

  const index =
    data?.pageParams.indexOf(page) > 0 ? data?.pageParams.indexOf(page) : 0;
  const places = data?.pages[index]?.places;
  const totalPage = data?.pages[0]?.totalPage;

  return (
    <Flex
      w="full"
      flexDirection="column"
      alignItems="center"
      rowGap={{ base: "1", md: "2" }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        style={{ width: "100%" }}
      >
        <Flex position="relative" w="full" gap="2">
          <Input
            type="text"
            placeholder={t("Search Place")}
            onInput={(e) => {
              debounce(() => {
                setPage(1);
                setText(e.target.value);
              }, 700);
            }}
          />
          <SearchIcon
            position="absolute"
            left="4"
            top="50%"
            transform="translateY(-50%)"
            color="neutral.800"
          />
          <Button variant="solid" type="submit">
            {t("Search")}
          </Button>
        </Flex>
      </form>
      {places &&
        !isFetching &&
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
      {!isFetching &&
        isFetched &&
        Array.isArray(places) &&
        places.length === 0 && (
          <Flex
            w="full"
            h="100vh"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Heading as="h3" mt="8">
              {t("No result")}
            </Heading>
          </Flex>
        )}
      <PlaceCardSkeleton isLoading={isFetching || isFetchingNextPage} />
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
