import { Flex, Text } from "@chakra-ui/react";
import Link from "component/NextLink";
import { useTranslations } from "next-intl";

const RouterLink = ({ href, place, ...restProps }) => {
  const t = useTranslations();
  return (
    <Link
      fontSize="sm"
      color="neutral.600"
      href={href}
      prefetch={false}
      _hover={{ color: "primary.700" }}
      {...restProps}
    >
      {place === "All" ? t("All") : place}
    </Link>
  );
};

const RouterTab = ({ region, prefecture, city, spot, index }) => {
  return (
    <Flex columnGap="4" mt="1" mb="2" flexWrap="wrap" rowGap="2">
      <RouterLink href={`/explore/${index?.region}/All`} place={region} />
      <Text color="neutral.600">{`>`}</Text>
      <RouterLink
        href={`/explore/${index?.region}/${index?.prefecture}`}
        place={prefecture}
      />
      {!!city && (
        <>
          <Text color="neutral.600">{`>`}</Text>
          <RouterLink
            href={`/explore/${index?.region}/${index?.prefecture}/${index?.city}`}
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
            href={`/explore/${index?.region}/${index?.prefecture}/${index?.city}/${index?.spot}`}
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
