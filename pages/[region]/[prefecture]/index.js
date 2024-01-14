import {
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import RegionBlock from "component/blog/region-block";
import { useGetPrefectures } from "hooks/db";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

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

// export const getStaticPaths = async () => {
//   return {
//     paths: regions.map((region) => ({
//       params: {
//         region,
//       },
//     })),
//     fallback: true,
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   const { region } = params;
//   return { props: { region } };
// };

export const getServerSideProps = async ({ params }) => {
  const { region } = params;
  return { props: { region } };
};

const Index = ({ region }) => {
  const { push } = useRouter();
  const { data: _prefectures = [] } = useGetPrefectures({ region });
  const [prefectureIndex, setPrefectureIndex] = useState(0);
  const prefectures = useMemo(() => ["All", ..._prefectures], [_prefectures]);
  const prefecture = useMemo(() => {
    return prefectures[prefectureIndex];
  }, [prefectureIndex, prefectures]);
  return (
    <Flex w="full" flexDirection="column" mt="12">
      <Container
        maxW="container.lg"
        as={Flex}
        px={{ base: "2", md: "4" }}
        flexDirection="column"
        rowGap="4"
      >
        <Tabs
          variant="enclosed"
          defaultIndex={regions.indexOf(region)}
          onChange={(index) => {
            push(`/${regions[index]}/All`);
          }}
          isLazy
        >
          <TabList mb="1em" overflowX="auto">
            {regions.map((region) => (
              <Tab key={region} mb="0">
                {region}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {regions.map((region) => (
              <TabPanel key={region}>
                <Tabs
                  p="0"
                  variant="enclosed"
                  defaultIndex={prefectures.indexOf(prefecture)}
                  onChange={(index) => {
                    push(`/${region}/${prefectures[index]}`);
                  }}
                  isLazy
                >
                  <TabList mb="1em" overflowX="auto">
                    {prefectures.map((prefecture) => (
                      <Tab key={prefecture} mb="0">
                        {prefecture}
                      </Tab>
                    ))}
                  </TabList>
                  <TabPanels>
                    {prefectures.map((prefecture) => (
                      <TabPanel key={prefecture}>
                        <RegionBlock
                          region={region}
                          prefecture={prefecture === "All" ? null : prefecture}
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
  );
};

export default Index;
