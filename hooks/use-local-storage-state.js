import { useEffect, useState } from "react";
import useStorage from "./use-local-storage";

const useLocalStorageState = (key, defaultState) => {
  const storage = useStorage();
  const [storageValue, setStorageValue] = useState(
    storage.getItem(key, defaultState)
  );
  const setValue = (callback) => {
    const value = storage.getItem(key, defaultState);
    const newData = callback(value);
    storage.setItem(key, newData);
    setStorageValue(newData);
  };
  useEffect(() => {
    setStorageValue(storage.getItem(key, defaultState));
    const onStorageChange = () => {
      setValue((prev) => prev);
    };
    window.addEventListener("storage", onStorageChange);
    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [storageValue, setValue];
};

export default useLocalStorageState;
