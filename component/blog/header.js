import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import SearchDrawer from "./search-drawer";
import Link from "component/NextLink";
import LogoSvg from "assets/logo.svg";
import Explore from "assets/explore.svg";
import HeartFill from "assets/heart-fill.svg";
import SearchIcon from "assets/search.svg";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

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
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const lastScrollY = useRef(0);
  const headerRef = useRef(null);
  const t = useTranslations();
  const navbarLinks = [
    {
      name: t("Explore"),
      href: "/explore/Hokkaido/All",
      icon: <Explore {...navbarIconProps} />,
      onClick: () => {},
    },
    {
      name: t("Favorites"),
      href: "/favorites",
      icon: <HeartFill {...navbarIconProps} />,
      onClick: () => {},
    },
    {
      name: t("Search"),
      href: `${router.asPath}`,
      icon: <SearchIcon {...navbarIconProps} />,
      onClick: () => {
        onOpen();
      },
    },
  ];
  useEffect(() => {
    const toggleHeader = (e) => {
      if (e.deltaY > 30) {
        headerRef.current.style.top = "-84px";
      }
      if (e.deltaY < -10) {
        headerRef.current.style.top = "0px";
      }
      if (typeof e.deltaY === "undefined") {
        const currentScrollPosition =
          window.scrollY || document.documentElement.scrollTop;
        const delta = currentScrollPosition - lastScrollY.current;

        lastScrollY.current = currentScrollPosition;
        if (delta > 10) {
          headerRef.current.style.top = "-84px";
        }
        if (delta < -10) {
          headerRef.current.style.top = "0px";
        }
      }
      if (window.scrollY < 100) headerRef.current.style.top = "0px";
    };
    addEventListener("wheel", toggleHeader);
    addEventListener("scroll", toggleHeader);
    return () => {
      removeEventListener("wheel", toggleHeader);
      removeEventListener("scroll", toggleHeader);
    };
  }, []);
  return (
    <>
      <Box h="84px" />
      <Flex
        id="header"
        ref={headerRef}
        position="fixed"
        top="0"
        left="0"
        w="full"
        flexDirection="column"
        boxShadow="0 0 10px 0 rgba(100, 100, 100, 0.5), 0 0 5px 0 rgba(100, 100, 100, 0.5)"
        zIndex={1000}
        bgColor="white"
        transition="all 0.3s ease-in-out"
      >
        <Flex
          w="full"
          margin="0 auto"
          p={{ base: "2", md: "4" }}
          columnGap="16"
          alignItems="center"
          justifyContent="space-between"
          zIndex={1000}
          background="transparent"
          maxW="container.lg"
        >
          <Link href="/">
            <LogoSvg color="primary.700" w="22" h="12" ml="4" />
          </Link>
          <Flex
            position={{ base: "fixed", lg: "relative" }}
            bgColor={{ base: "white", lg: "transparent" }}
            bottom="0"
            left="0"
            w="full"
            pr={{ base: "0", lg: "24" }}
            py={{ base: "1", lg: "0" }}
            justifyContent={{ base: "center", lg: "flex-end" }}
            boxShadow={{
              base: "0 0 10px 0 rgba(100, 100, 100, 0.5), 0 0 5px 0 rgba(100, 100, 100, 0.5)",
              lg: "none",
            }}
          >
            <Flex
              w="full"
              maxW={{ base: "300px", lg: "72" }}
              p={{ base: "2", lg: "0" }}
              justifyContent={{ base: "space-between", lg: "space-between" }}
              alignItems={{ base: "flex-start", lg: "center" }}
            >
              {navbarLinks.map((link, index) => {
                return (
                  <Link key={index} href={link.href} onClick={link.onClick}>
                    <Flex
                      alignItems="center"
                      flexDirection="column"
                      rowGap="0.5"
                    >
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
      </Flex>
    </>
  );
};

export default Header;
