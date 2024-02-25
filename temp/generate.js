import { Button, Flex } from "@chakra-ui/react";

const Generate = () => {
  const url = `/api/post/`;
  const generateActions = [
    {
      title: "City and Spot",
      uri: "batch-generate-japan",
    },
    {
      title: "City seo",
      uri: "batch-generate-city-seo",
    },
    {
      title: "City region",
      uri: "batch-generate-region",
    },
    {
      title: "Spot article",
      uri: "batch-generate-article",
    },
    //Restuarant article
    //image
  ];
  return (
    <Flex
      columnGap="4"
      w="full"
      h="full"
      position="fixed"
      top="0px"
      left="0px"
      bg="black"
      zIndex={10}
    >
      {generateActions.map((action) => {
        return (
          <Button
            key={action.title}
            bg={"transparent"}
            border="none"
            onClick={async () => {
              const data = await fetch(url + action.uri);
              console.log(await data.json());
            }}
          >
            {action.title}
          </Button>
        );
      })}

      {/* <Button>Restuarant article</Button> */}
      {/* <Button>Image</Button> */}
    </Flex>
  );
};

export default Generate;
