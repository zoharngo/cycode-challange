import { useState } from 'react';

function returnInitialState(storageKey, initialValue) {
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(storageKey);
    // Parse stored json or if none return an empty object
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // If error also return an empty object
    console.log(error);
    return {};
  }
}

export default function useLocalStorage(storageKey, initialValue = {}) {
  const [storedValue, setStoredValue] = useState(returnInitialState(storageKey, initialValue));

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(storageKey, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
}
