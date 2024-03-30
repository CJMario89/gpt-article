import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "component/blog";
import Footer from "component/blog/footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import getTheme from "theme";
import "styles/globals.css";
import LoadingBar from "component/loading-progress";

const queryClient = new QueryClient();

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: await import(`locales/${ctx.locale}.json`),
    },
  };
};

function MyApp({ Component, pageProps, props }) {
  const router = useRouter();
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.querySelector("#header").style.top = "0px";
  }, [router.asPath]);
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Asia/Tokyo"
      messages={props.messages}
    >
      <ChakraProvider theme={getTheme(router.locale)}>
        <QueryClientProvider client={queryClient}>
          <GoogleAnalytics gaId="G-M69F1K65XF" />
          <LoadingBar />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </QueryClientProvider>
      </ChakraProvider>
    </NextIntlClientProvider>
  );
}

export default MyApp;
