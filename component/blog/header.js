import { Flex, Link, Text, useDisclosure } from "@chakra-ui/react";
import SearchDrawer from "./search-drawer";
import NextLink from "next/link";
import LogoSvg from "assets/logo.svg";
import Explore from "assets/explore.svg";
import HeartFill from "assets/heart-fill.svg";
import SearchIcon from "assets/search.svg";
import { useRouter } from "next/router";

const navbarIconProps = {
  w: { base: "4", lg: "4" },
  h: { base: "4", lg: "4" },
  color: "primary.700",
};

const navbarTextProps = {
  color: "primary.700",
  fontSize: { base: "sm", lg: "md" },
  fontWeight: "semibold",
};

const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const navbarLinks = [
    {
      name: "Explore",
      href: "/explore/Hokkaido/All",
      icon: <Explore {...navbarIconProps} />,
      onClick: () => {},
    },
    {
      name: "Favorite",
      href: "/favorite",
      icon: <HeartFill {...navbarIconProps} />,
      onClick: () => {},
    },
    {
      name: "Search",
      // href: `/${router.asPath}/#search`,
      href: `/${router.asPath}`,
      icon: <SearchIcon {...navbarIconProps} />,
      onClick: () => {
        onOpen();
      },
    },
  ];
  return (
    <Flex
      id="header"
      position="fixed"
      top="0"
      left="0"
      w="full"
      flexDirection="column"
      // borderBottom="2px solid"
      // borderColor="primary.700"
      zIndex={10}
      bgColor="white"
      boxShadow="0 0 10px 0 #EDECED, 0 0 5px 0 #A6A4A6"
    >
      <Flex
        w="full"
        margin="0 auto"
        p={{ base: "2", md: "4" }}
        columnGap="16"
        alignItems="center"
        justifyContent="space-between"
        zIndex={10}
        background="transparent"
        maxW="container.lg"
      >
        <Link as={NextLink} href="/">
          <LogoSvg color="primary.700" w="22" h="12" ml="4" />
        </Link>
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          position={{ base: "fixed", lg: "relative" }}
          bgColor={{ base: "white", lg: "transparent" }}
          bottom="0"
          left="0"
          columnGap="8"
          w="full"
          pr="8"
          justifyContent={{ base: "flex-start", lg: "flex-end" }}
        >
          <Flex
            columnGap={{ base: "8", lg: "8" }}
            w="full"
            p={{ base: "2", lg: "0" }}
            justifyContent={{ base: "flex-start", lg: "flex-end" }}
            alignItems={{ base: "flex-start", lg: "center" }}
          >
            {navbarLinks.map((link, index) => {
              return (
                <Link
                  key={index}
                  as={NextLink}
                  href={link.href}
                  prefetch="false"
                  onClick={link.onClick}
                >
                  <Flex alignItems="center" flexDirection="column" rowGap="0.5">
                    {link.icon}
                    <Text {...navbarTextProps}>{link.name}</Text>
                  </Flex>
                </Link>
              );
            })}
            <SearchDrawer onClose={onClose} isOpen={isOpen} />
          </Flex>
        </Flex>
      </Flex>

      {/* <Flex position="relative">
        <Box w="full" height="300px" position="absolute">
          <Image
            style={{
              width: "100%",
              opacity: "0.3",
              filter: "brightness(1.1)",
              height: "100%",
              objectFit: "cover",
              objectPosition: "bottom",
            }}
            src={headerBanner1}
            alt=""
          />
        </Box>
      </Flex> */}
    </Flex>
  );
};

export default Header;
