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
});

export default theme;
