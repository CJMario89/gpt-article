export const styles = {
  global: {
    // styles for the `body`
    body: {
      bg: "white",
      color: "black",
    },
    // styles for the `a`
    a: {
      color: "teal.500",
      _hover: {
        textDecoration: "underline",
      },
    },
    "::-webkit-scrollbar": {
      w: "1",
      h: "1",
      borderRadius: "xl",
      bgColor: "neutral.50",
    },
    "::-webkit-scrollbar-thumb": {
      bgColor: "primary.300",
    },
  },
};
