import {MMKV} from 'react-native-mmkv';

export const localStorage = new MMKV({
  id: 'generated_form',
  encryptionKey: 'generated_form',
});

export default localStorage;

export const localStorageSetObject = (
  key: string,
  value: Record<string, any>,
) => localStorage.set(key, JSON.stringify(value));

export const localStorageGetObject = (key: string) => {
  const data = localStorage.getString(key);
  if (!data) {
    return undefined;
  }
  try {
    return JSON.parse(data) as Record<string, any>;
  } catch (error) {
    return undefined;
  }
};
