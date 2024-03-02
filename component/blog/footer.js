import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import LogoSvg from "assets/logo.svg";
import MailSvg from "assets/mail.svg";
import Link from "component/NextLink";
import RegionalSearch from "./regional-search";

const linkStyle = {
  color: "neutral.50",
  // fontWeight: "semibold",
  fontSize: "sm",
};

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

const prefectures = [
  { region: "Chubu", prefecture: "Fukui" },
  { region: "Tohoku", prefecture: "Aomori" },
  { region: "Tohoku", prefecture: "Iwate" },
  { region: "Kanto", prefecture: "Ibaraki" },
  { region: "Chubu", prefecture: "Gifu" },
  { region: "Shikoku", prefecture: "Ehime" },
  { region: "Kyushu", prefecture: "Kumamoto" },
  { region: "Tohoku", prefecture: "Akita" },
  { region: "Shikoku", prefecture: "Kōchi" },
  { region: "Kyushu", prefecture: "Saga" },
  { region: "Kanto", prefecture: "Tokyo" },
  { region: "Kanto", prefecture: "Kanagawa" },
  { region: "Okinawa", prefecture: "Okinawa" },
  { region: "Hokkaido", prefecture: "Hokkaido" },
  { region: "Chubu", prefecture: "Shizuoka" },
  { region: "Kansai", prefecture: "Mie" },
  { region: "Kansai", prefecture: "Osaka" },
  { region: "Chugoku", prefecture: "Kagawa" },
  { region: "Kansai", prefecture: "Kyoto" },
  { region: "Chubu", prefecture: "Toyama" },
  { region: "Tohoku", prefecture: "Fukushima" },
  { region: "Kyushu", prefecture: "Kagoshima" },
  { region: "Kanto", prefecture: "Saitama" },
  { region: "Kansai", prefecture: "Nara" },
  { region: "Kanto", prefecture: "Gunma" },
  { region: "Chugoku", prefecture: "Hiroshima" },
  { region: "Chubu", prefecture: "Aichi" },
  { region: "Chubu", prefecture: "Ishikawa" },
  { region: "Chugoku", prefecture: "Okayama" },
  { region: "Kyushu", prefecture: "Fukuoka" },
  { region: "Kansai", prefecture: "Wakayama" },
  { region: "Chugoku", prefecture: "Shimane" },
  { region: "Shikoku", prefecture: "Tokushima" },
  { region: "Chugoku", prefecture: "Yamaguchi" },
  { region: "Kansai", prefecture: "Hyōgo" },
  { region: "Chubu", prefecture: "Nagano" },
  { region: "Kyushu", prefecture: "Ōita" },
  { region: "Tohoku", prefecture: "Miyagi" },
  { region: "Kanto", prefecture: "Chiba" },
  { region: "Chugoku", prefecture: "Tottori" },
  { region: "Kyushu", prefecture: "Miyazaki" },
  { region: "Chubu", prefecture: "Yamanashi" },
  { region: "Tohoku", prefecture: "Yamagata" },
  { region: "Chubu", prefecture: "Niigata" },
  { region: "Kansai", prefecture: "Shiga" },
  { region: "Kyushu", prefecture: "Nagasaki" },
];

const Regions = () => {
  return (
    <Flex
      flexDirection="column"
      gap="3"
      borderBottom="1px solid"
      borderColor="neutral.50"
      pb="4"
      w={{ base: "100%", md: "100%" }}
    >
      <Heading w="full" color="neutral.200" as="h3">
        Region
      </Heading>
      <Flex gap="2" flexWrap="wrap">
        {regions.map((region) => {
          return (
            <Link
              // as={NextLink}
              key={region}
              href={`/article/${region}`}
              // prefetch={false}
              {...linkStyle}
            >
              {region}
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

const Prefectures = () => {
  return (
    <Flex
      flexDirection="column"
      gap="3"
      borderBottom="1px solid"
      borderColor="neutral.50"
      pb="4"
      w={{ base: "100%", md: "100%" }}
    >
      <Heading w="full" as="h3" color="neutral.200">
        Prefecture
      </Heading>
      <Flex gap="2" flexWrap="wrap">
        {prefectures.map(({ prefecture, region }) => {
          return (
            <Link
              key={region}
              href={`/article/${region}/${prefecture}`}
              // prefetch={false}
              {...linkStyle}
            >
              {prefecture}
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

const Claims = () => {
  return (
    <Flex gap="6" alignItems="center" mt="auto">
      <LogoSvg color="neutral.50" w="22" h="12" />
      <Link href="/privacy-policy" {...linkStyle} color="neutral.50">
        Privacy Policy
      </Link>
      <Link href="/term-of-use" {...linkStyle} color="neutral.50">
        Terms of use
      </Link>
    </Flex>
  );
};

const Contact = () => {
  return (
    <Flex gap="4" flexDirection="column" mt="auto">
      <Heading w="full" as="h3" color="neutral.200">
        Contact
      </Heading>
      <Link
        href="mailto:japantoursite@gmail.com"
        {...linkStyle}
        color="neutral.50"
      >
        <Flex alignItems="center" gap="2">
          <MailSvg w="5" h="5" />
          <Text color="neutral.50" fontSize="sm">
            japantoursite@gmail.com
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};

const Footer = () => {
  return (
    <Flex
      w="full"
      flexDirection="column"
      bgColor="primary.900"
      mt="16"
      pt="8"
      pb={{ base: "55px", md: "0" }}
    >
      <Container
        maxW="container.lg"
        as={Flex}
        flexDirection="column"
        rowGap="8"
      >
        <Flex flexDirection={{ base: "column", md: "row" }} w="full" gap="12">
          <Flex flexDirection="column" gap="8" flex="1" w="full">
            <Regions />
            <Prefectures />
          </Flex>
          <Flex flexDirection="column" gap="8" flex="1" w="full">
            <RegionalSearch isLight />
            <Contact />
            <Claims />
          </Flex>
        </Flex>
      </Container>
      <Text color="neutral.50" fontSize="sm" alignSelf="center" pt="8" pb="4">
        © 2020-2024 japantour.site
      </Text>
    </Flex>
  );
};

export default Footer;
