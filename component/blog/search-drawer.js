import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Search from "./search";
import RegionalSearch from "./regional-search";

const SearchDrawer = ({ onClose, isOpen }) => {
  return (
    <Drawer placement="top" size="xl" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Heading as="h2">Search</Heading>
          <DrawerCloseButton mt="1" />
        </DrawerHeader>
        <DrawerBody>
          <Flex flexDirection="column" rowGap="4">
            <Heading as="h3">Regional Search</Heading>
            <RegionalSearch onSearch={onClose} zIndex={1} />
            <Heading as="h3">Text Search</Heading>
            <Search onSearch={onClose} />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDrawer;
