import { extendTheme } from "@chakra-ui/react";
import { Button } from "./component";
import { styles } from "./styles";
const theme = extendTheme({
  components: {
    Button,
  },
  styles,
});

export default theme;
