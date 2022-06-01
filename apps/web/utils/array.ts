export const isArray = <Type>(arr: Array<Type>): boolean => Array.isArray(arr);

export const isEmptyArray = <Type>(arr: Array<Type>): boolean => {
  return isArray(arr) && arr.length === 0;
};

export const isNotEmptyArray = <Type>(arr: Array<Type>): boolean => {
  return isArray(arr) && !isEmptyArray(arr);
};
