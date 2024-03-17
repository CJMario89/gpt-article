import {
  Button,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import LogoSvg from "assets/logo.svg";
import MailSvg from "assets/mail.svg";
import Link from "component/NextLink";
import RegionalSearch, { ChevronDown } from "./regional-search";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

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

const textStlyeProps = {
  color: "neutral.50",
};

const menuButtonBgStyleProps = {
  _hover: {
    bgColor: "primary.800",
  },
  _active: {
    bgColor: "primary.800",
  },
};

const menuListStyleProps = {
  bgColor: "primary.900",
  _hover: {
    bgColor: "primary.900",
  },
  _active: {
    bgColor: "primary.900",
  },
};

const menuItemStyleProps = {
  bgColor: "primary.900",
  _hover: {
    bgColor: "primary.800",
  },
  _active: {
    bgColor: "primary.800",
  },
};

const buttonBgStyleProps = {
  variant: "outline",
  bgColor: "primary.900",
  border: "0.5px solid",
  borderColor: "neutral.200",
  color: "neutral.50",
  _hover: {
    bgColor: "primary.700",
    _disabled: {
      bgColor: "primary.800",
    },
  },
  _active: {
    bgColor: "primary.800",
  },
};

const languageMaps = [
  { "ja-JP": "Japanese" },
  { "en-US": "English" },
  { "zh-TW": "Traditional Chinese" },
];

const Regions = () => {
  const t = useTranslations();
  return (
    <Flex
      flexDirection="column"
      gap="4"
      borderBottom="1px solid"
      borderColor="neutral.50"
      pb="5"
      w={{ base: "100%", md: "100%" }}
    >
      <Heading w="full" color="neutral.200" as="h3">
        {t("Region")}
      </Heading>
      <Flex gap="2" flexWrap="wrap">
        {Array.isArray(regions) &&
          regions.map((region, i) => {
            return (
              <Link key={region + i} href={`/article/${region}`} {...linkStyle}>
                {t(region)}
              </Link>
            );
          })}
      </Flex>
    </Flex>
  );
};

const Prefectures = () => {
  const t = useTranslations();
  return (
    <Flex
      flexDirection="column"
      gap="4"
      borderBottom="1px solid"
      borderColor="neutral.50"
      pb="5"
      w={{ base: "100%", md: "100%" }}
    >
      <Heading w="full" as="h3" color="neutral.200">
        {t("Prefecture")}
      </Heading>
      <Flex gap="2" flexWrap="wrap">
        {Array.isArray(prefectures) &&
          prefectures.map(({ prefecture, region, i }) => {
            return (
              <Link
                key={prefecture + region + i}
                href={`/article/${region}/${prefecture}`}
                {...linkStyle}
              >
                {t(prefecture)}
              </Link>
            );
          })}
      </Flex>
    </Flex>
  );
};

const Claims = () => {
  const t = useTranslations();
  return (
    <Flex gap="6" alignItems="center" mt="auto">
      <LogoSvg color="neutral.50" w="22" h="12" />
      <Link href="/privacy-policy" {...linkStyle} color="neutral.50">
        {t("Privacy Policy")}
      </Link>
      <Link href="/terms-of-use" {...linkStyle} color="neutral.50">
        {t("Terms of Use")}
      </Link>
    </Flex>
  );
};

const Language = () => {
  const t = useTranslations();
  const router = useRouter();
  return (
    <Flex gap="4" flexDirection="column" mt="auto">
      <Heading w="full" as="h3" color="neutral.200">
        {t("Language")}
      </Heading>
      <Menu placement="right">
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              variant="outline"
              rightIcon={<ChevronDown />}
              alignSelf="flex-start"
              {...textStlyeProps}
              {...menuButtonBgStyleProps}
            >
              {t(
                languageMaps.find((lang) => lang[router.locale])[router.locale]
              )}
            </MenuButton>
            <MenuList
              display={isOpen ? "block" : "none"}
              maxH="80vh"
              overflowY="scroll"
              overflowX="hidden"
              {...menuListStyleProps}
              {...textStlyeProps}
            >
              {languageMaps.map((language) => {
                const [key, value] = Object.entries(language)[0];
                return (
                  <MenuItem
                    key={key}
                    onClick={() => {
                      router.push(router.asPath, router.asPath, {
                        locale: key,
                      });
                    }}
                    {...menuItemStyleProps}
                    {...textStlyeProps}
                  >
                    {t(value)}
                  </MenuItem>
                );
              })}
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};

const Contact = () => {
  const t = useTranslations();
  return (
    <Flex gap="4" flexDirection="column" mt="auto">
      <Heading w="full" as="h3" color="neutral.200">
        {t("Contact")}
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
  const t = useTranslations();
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
            <Flex flexDirection="column" gap="4">
              <Heading as="h3" color="neutral.200">
                {t("Search")}
              </Heading>
              <RegionalSearch
                menuButtonBgStyleProps={menuButtonBgStyleProps}
                menuItemStyleProps={menuItemStyleProps}
                menuListStyleProps={menuListStyleProps}
                buttonBgStyleProps={buttonBgStyleProps}
                textStlyeProps={textStlyeProps}
              />
            </Flex>
            <Language />
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
