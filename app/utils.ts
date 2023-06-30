export const zeroPad = (i: number) => {
  if (i < 10) {
    return `0${i}`;
  }
  return `${i}`;
};

const ENABLE_LOGS = true;

export const log: typeof console.log = (message, ...optionalParams) =>
  ENABLE_LOGS && console.log(message, ...optionalParams);
