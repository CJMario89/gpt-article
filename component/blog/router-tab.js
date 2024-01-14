import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const RouterTab = ({ region, prefecture, city, spot }) => {
  return (
    <Flex columnGap="2">
      <Link as={NextLink} color="neutral.400" href={`/${region}/All`}>
        {region}
      </Link>
      <Text color="neutral.400">{`>`}</Text>
      <Link as={NextLink} color="neutral.400" href={`/${region}/${prefecture}`}>
        {prefecture}
      </Link>
      {!!city && (
        <>
          <Text color="neutral.400">{`>`}</Text>
          <Link
            as={NextLink}
            color="neutral.400"
            href={`/${region}/${prefecture}/${city}`}
          >
            {city}
          </Link>
        </>
      )}
      {!!spot && (
        <>
          <Text color="neutral.400">{`>`}</Text>
          <Link
            as={NextLink}
            color="neutral.800"
            href={`/${region}/${prefecture}/${city}/${spot}`}
          >
            {spot}
          </Link>
        </>
      )}
    </Flex>
  );
};

export default RouterTab;
