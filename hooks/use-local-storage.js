const noopStorage = {
  getItem: () => "",
  setItem: () => null,
  removeItem: () => null,
};

const storage =
  typeof window !== "undefined" ? window.localStorage : noopStorage;

const useStorage = ({ prefix = "japan-tour" } = {}) => {
  const getItem = (key, defaultState = null) => {
    const value = storage.getItem(`${prefix}.${key}`);
    try {
      return value ? JSON.parse(value) : defaultState;
    } catch (error) {
      console.warn(error);
      return defaultState;
    }
  };

  const setItem = (key, value) => {
    if (value === null) {
      storage.removeItem(`${prefix}.${key}`);
    } else {
      try {
        storage.setItem(`${prefix}.${key}`, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeItem = (key) => storage.removeItem(`${prefix}.${key}`);

  return { getItem, setItem, removeItem };
};

export default useStorage;
