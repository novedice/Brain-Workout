export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export const isUpperLetters = (str: string) => {
  let res = false;
  for (let char of str) {
    if (ALPHABET.toUpperCase().includes(char)) {
      res = true;
      break;
    }
  }
  return res;
};

export const isLowerLetters = (str: string) => {
  let res1 = false;
  for (let char of str) {
    if (ALPHABET.toLowerCase().includes(char)) {
      res1 = true;
      break;
    }
  }
  return res1;
};
