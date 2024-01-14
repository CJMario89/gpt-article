import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
} from "@chakra-ui/react";
import SearchFilterMenu from "./search-menu-filter";
import Search from "./search";

const SearchDrawer = ({ onClose, isOpen }) => {
  return (
    <Drawer placement="top" size="xl" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Heading as="h3">Search</Heading>
        </DrawerHeader>
        <DrawerBody>
          <Flex flexDirection="column" rowGap="4">
            <SearchFilterMenu zIndex={1} />
            <Search />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDrawer;
