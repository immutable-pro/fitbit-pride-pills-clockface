export const zeroPad = (i: number) => {
  if (i < 10) {
    return `0${i}`;
  }
  return `${i}`;
};
