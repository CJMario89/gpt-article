import {
  Divider,
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
import { useTranslations } from "next-intl";

const SearchDrawer = ({ onClose, isOpen }) => {
  const t = useTranslations();
  return (
    <Drawer placement="top" size="xl" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Heading as="h2">{t("Search")}</Heading>
          <DrawerCloseButton mt="1" />
        </DrawerHeader>
        <DrawerBody>
          <Flex flexDirection="column" rowGap="4">
            <Heading as="h3">{t("Regional Search")}</Heading>
            <RegionalSearch onSearch={onClose} zIndex={1} />
            <Divider />
            <Heading as="h3">{t("Text Search")}</Heading>
            <Search onSearch={onClose} />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDrawer;
