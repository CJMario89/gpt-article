import {
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { getPrefectureInfo, getPrefectures } from "backend-service/get";
import { Seo } from "component/blog";
import RegionBlock from "component/blog/region-block";
import { useGetPrefectures } from "hooks/db";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useMemo } from "react";

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

export const getStaticPaths = async () => {
  const locations = await Promise.all(
    regions.map(async (region) => {
      const _prefectures = await getPrefectures({ region });
      const prefectures = ["All", ..._prefectures];
      return prefectures.map((prefecture) => ({ region, prefecture }));
    })
  );
  return {
    paths: locations.flat(1).map(({ region, prefecture }) => ({
      params: {
        region,
        prefecture,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { region, prefecture } = params;
  const prefectureInfo = await getPrefectureInfo({ region, prefecture });
  return { props: { region, prefecture, prefectureInfo } };
};

const Index = ({ region, prefecture, prefectureInfo }) => {
  const t = useTranslations();
  const { push, locale } = useRouter();
  const { data: _prefectures = [] } = useGetPrefectures({ region });
  const prefectures = useMemo(() => ["All", ..._prefectures], [_prefectures]);
  return (
    <>
      <Seo
        title={prefectureInfo?.title}
        description={prefectureInfo?.description}
        imageUrl={prefectureInfo?.imageUrl}
      />
      <Flex
        w="full"
        flexDirection="column"
        mt={{ base: "0", lg: "8" }}
        position="relative"
      >
        <Container
          maxW="container.lg"
          as={Flex}
          px={{ base: "2", md: "4" }}
          flexDirection="column"
          rowGap="2"
        >
          <Tabs
            index={regions.indexOf(region)}
            onChange={(index) => {
              push(
                `/explore/${regions[index]}/All`,
                `/explore/${regions[index]}/All`,
                { locale }
              );
            }}
            isLazy
          >
            <TabList
              bgColor="primary.50"
              mb="1em"
              overflowX="auto"
              borderBottomWidth="1px"
              borderColor="primary.100"
            >
              {regions.map((region) => (
                <Tab key={`${region}-t`} mb="0" px={{ base: "3", lg: "5" }}>
                  {t(region)}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {regions.map((region) => (
                <TabPanel key={`${region}-tp`} p="0">
                  <Tabs
                    index={prefectures.indexOf(prefecture)}
                    onChange={(index) => {
                      push(
                        `/explore/${region}/${prefectures[index]}`,
                        `/explore/${region}/${prefectures[index]}`,
                        { locale }
                      );
                    }}
                    isLazy
                  >
                    <TabList
                      bgColor="primary.50"
                      mb="1em"
                      overflowX="auto"
                      borderBottomWidth="1px"
                      borderColor="primary.100"
                    >
                      {prefectures.map((prefecture) => (
                        <Tab
                          key={`${prefecture}-t`}
                          mb="0"
                          px={{ base: "3", lg: "5" }}
                        >
                          {prefecture === "All" ? t("All") : t(prefecture)}
                        </Tab>
                      ))}
                    </TabList>
                    <TabPanels>
                      {prefectures.map((prefecture) => (
                        <TabPanel key={`${prefecture}-tp`} p="0">
                          <RegionBlock
                            type="city"
                            region={region}
                            prefecture={
                              prefecture === "All" ? null : prefecture
                            }
                          />
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </Tabs>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Container>
      </Flex>
    </>
  );
};

export default Index;
