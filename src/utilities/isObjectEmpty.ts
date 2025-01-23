export const isObjectEmpty = (obj: object | Record<string, any>): boolean => {
  return Object.keys(obj).length === 0;
};
