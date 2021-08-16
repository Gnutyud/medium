import { useState, useEffect } from 'react';

const useLocalStorage = (initialState, key) => {
  const getValueFromLocalStorage = () => {
    const storage = localStorage.getItem(key);
    console.log('storage: ', storage);
    if (storage) return JSON.parse(storage).value;
    return initialState;
  };

  const [value, setValue] = useState(getValueFromLocalStorage());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
