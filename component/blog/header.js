import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import headerBanner1 from "assets/header-banner1.png";
import { SearchIcon } from "./search";
import SearchDrawer from "./search-drawer";

const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex w="full" position="relative" flexDirection="column" zIndex={10}>
      <Flex
        w="full"
        margin="0 auto"
        p={{ base: "2", md: "4" }}
        columnGap="8"
        alignItems="center"
        justifyContent="space-between"
        zIndex={10}
        background="transparent"
      >
        <Heading as="h6" px="4" color="neutral.800">
          Japan Traveler
        </Heading>
        <Flex flexDirection="column" rowGap="4">
          <Button
            bg="none"
            border="none"
            _hover={{ background: "neutral.100" }}
            borderRadius="xl"
            onClick={() => onOpen()}
          >
            <SearchIcon
              position="absolute"
              left="12px"
              top="50%"
              transform="translateY(-50%)"
              color="neutral.800"
            />
          </Button>
          <SearchDrawer onClose={onClose} isOpen={isOpen} />
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
