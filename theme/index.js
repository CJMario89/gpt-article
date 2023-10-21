import { extendTheme } from "@chakra-ui/react";
import { Button, Heading } from "./component";
import { styles } from "./styles";
const theme = extendTheme({
  components: {
    Button,
    Heading,
  },
  styles,
});

export default theme;
