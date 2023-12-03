import { extendTheme } from "@chakra-ui/react";
import { Button, Heading } from "./component";
import { styles } from "./styles";

const theme = extendTheme({
  components: {
    Button,
    Heading,
  },
  styles,
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  breakpoints: {
    base: "0px",
    md: "500px",
    lg: "768px",
    xl: "1100px",
  },
});

export default theme;
