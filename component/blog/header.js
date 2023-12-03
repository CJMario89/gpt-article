import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import headerBanner1 from "assets/header-banner1.png";
import Search from "./search";

const Header = () => {
  return (
    <Flex w="full" position="relative" flexDirection="column">
      <Flex
        w="container.lg"
        margin="0 auto"
        p="4"
        columnGap="8"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading as="h3" px="4">
          CityZenJPN
        </Heading>

        <Search zIndex={10} />
      </Flex>

      <Flex position="relative">
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
        <Flex
          w="full"
          height="300px"
          position="relative"
          zIndex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading as="h1">CityZenJPN</Heading>
          <Heading as="h2">Uncover Urban Wonders</Heading>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
