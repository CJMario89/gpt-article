import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const usePage = () => {
  const [page, setPage] = useState(1);
  const { asPath } = useRouter();
  useEffect(() => {
    setPage(1);
  }, [asPath]);
  return [page, setPage];
};

export default usePage;
