import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const RouterLink = ({ href, place, ...restProps }) => {
  return (
    <Link
      as={NextLink}
      fontSize="sm"
      color="neutral.600"
      href={href}
      prefetch={false}
      {...restProps}
    >
      {place}
    </Link>
  );
};

const RouterTab = ({ region, prefecture, city, spot }) => {
  return (
    <Flex columnGap="2">
      <RouterLink href={`/explore/${region}/All`} place={region} />
      <Text color="neutral.600">{`>`}</Text>
      <RouterLink
        href={`/explore/${region}/${prefecture}`}
        place={prefecture}
      />
      {!!city && (
        <>
          <Text color="neutral.600">{`>`}</Text>
          <RouterLink
            href={`/explore/${region}/${prefecture}/${city}`}
            place={city}
            color={spot ? "neutral.600" : "neutral.900"}
            fontWeight={spot ? "normal" : "semibold"}
          />
        </>
      )}
      {!!spot && (
        <>
          <Text color="neutral.600">{`>`}</Text>
          <RouterLink
            href={`/explore/${region}/${prefecture}/${city}/${spot}`}
            place={spot}
            color="neutral.900"
            fontWeight="semibold"
          />
        </>
      )}
    </Flex>
  );
};

export default RouterTab;
