import { extendTheme } from "@chakra-ui/react";
import { Button, Heading, Tag } from "./component";
import { styles } from "./styles";

const theme = extendTheme({
  components: {
    Button,
    Heading,
    Tag,
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
  colors: {
    neutral: {
      50: "#FCFAFC",
      100: "#EDECED",
      200: "#DEDCDE",
      300: "#C0C6C9",
      400: "#A6A4A6",
      500: "#747274",
      600: "#4E494E",
      700: "#333133",
      800: "#262326",
      900: "#211821",
    },
    darkTheme: {
      50: "#3C363C",
      100: "#393339",
      200: "#363136",
      300: "#322F32",
      400: "#2F2A2F",
      500: "#2C252C",
      600: "#2A222A",
      700: "#261F26",
      800: "#211421",
      900: "#161116",
    },
    primary: {
      50: "#FFEBEE",
      100: "#FFCDD2",
      200: "#EF9A9A",
      300: "#E57373",
      400: "#EF5350",
      500: "#F44336",
      600: "#E53935",
      700: "#D32F2F",
      800: "#C62828",
      900: "#B71C1C",
    },
  },
});

export default theme;
