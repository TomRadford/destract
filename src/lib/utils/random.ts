export const getRandom = (array: string[]) => array[Math.round(Math.random() * (array.length - 1))];
