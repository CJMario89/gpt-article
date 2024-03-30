import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

const LoadingBar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <Box
      className="loading-bar"
      position="fixed"
      top="0"
      left="0"
      w="full"
      h="1"
      bg="linear-gradient(90deg, #FFC593 0%, #BC7198 100%)"
      bgSize="200% 100%"
      bgPosition="0% 0%"
      bgRepeat="no-repeat"
      style={{
        backgroundSize: loading ? "200% 100%" : "0% 100%",
        backgroundPosition: loading ? "100% 0%" : "0% 0%",
      }}
      zIndex="9999"
      transition="all 0.2s ease-in-out"
    />
  );
};

export default LoadingBar;
