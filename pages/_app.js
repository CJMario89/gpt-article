import { Box, ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "component/blog";
import Footer from "component/blog/footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import theme from "theme";
import { Fonts } from "theme/component";
import { GoogleAnalytics } from "@next/third-parties/google";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.querySelector("#header").style.top = "0px";
  }, [asPath]);
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <QueryClientProvider client={queryClient}>
        <GoogleAnalytics gaId="G-M69F1K65XF" />
        <Header />
        {/* <Box
          position="relative"
          w="full"
          h="100vh"
          zIndex={1}
          pt={{ base: "64px", lg: "84px" }}
          id="container"
          style={{ WebkitOverflowScrolling: "touch" }}
        > */}
        <Component {...pageProps} />
        <Footer />
        {/* </Box> */}
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
