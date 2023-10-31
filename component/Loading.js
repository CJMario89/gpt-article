import Image from "next/image";
import loadingSVG from "assets/loading-black.svg";

const Loading = () => {
  return <Image src={loadingSVG} width="20" alt="" />;
};

export default Loading;
