import { Button, Flex, Input, Text } from "@chakra-ui/react";

const index = () => {
  return (
    <form onSubmit={() => {}}>
      <Flex w="50" flexDirection="column" rowGap="5">
        <Text>ACCOUNT</Text>
        <Input name="account" type="text" />
        <Text>PASSWORD</Text>
        <Input name="password" type="text" />
        <Button type="submit">Login</Button>
      </Flex>
    </form>
  );
};

export default index;
