import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
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
      <DrawerContent w="full" h="100dvh">
        <DrawerCloseButton mt="1" right={{ base: "1", md: "2" }} />
        <DrawerBody maxW="container.xl" m="0 auto" w="full">
          <Flex flexDirection="column" rowGap="4">
            <Accordion defaultIndex={[0]}>
              <AccordionItem>
                <AccordionButton
                  as={Flex}
                  cursor="pointer"
                  justifyContent="space-between"
                >
                  <Heading as="h4">{t("Regional Search")}</Heading>
                  <AccordionIcon w="6" h="6" />
                </AccordionButton>
                <AccordionPanel>
                  <RegionalSearch onSearch={onClose} zIndex={1} />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton
                  as={Flex}
                  cursor="pointer"
                  justifyContent="space-between"
                >
                  <Heading as="h4">{t("Text Search")}</Heading>
                  <AccordionIcon w="6" h="6" />
                </AccordionButton>
                <AccordionPanel>
                  <Search onSearch={onClose} />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDrawer;
