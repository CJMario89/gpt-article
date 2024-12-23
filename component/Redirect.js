import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect({ url = "/explore/Hokkaido/All" }) {
  const router = useRouter();
  useEffect(() => {
    router.push(url, url, { locale: router.locale });
  }, [router, url]);
  return <div style={{ height: "100vh" }} />;
}
