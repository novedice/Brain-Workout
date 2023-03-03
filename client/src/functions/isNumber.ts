export const numbers = '1234567890';

export function isContainNumber(str: string) {
  let res = false;
  for (let i = 0; i < str.length; i += 1) {
    if (numbers.includes(str[i])) {
      res = true;
      break;
    }
  }
  return res;
}
