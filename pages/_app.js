import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "component/blog";
import { useEffect } from "react";
import theme from "theme";
import { Fonts } from "theme/component";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
