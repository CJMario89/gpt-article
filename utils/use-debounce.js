import { useRef } from "react";

const useDebounce = () => {
  const timeout = useRef();

  return (callback, delay = 700) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(callback, delay);
  };
};

export default useDebounce;
