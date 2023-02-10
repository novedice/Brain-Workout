import { isLowerLetters, isUpperLetters } from './isLetter';
import { isContainNumber } from './isNumber';

export const isValidPassword = (str: string): string => {
  let res = '';
  if (str.length < 8) {
    res += 'Password length should be at leact 8 characters.';
  }
  if (!isLowerLetters(str)) {
    res += '\nPassword shoud include at least 1 lower letter.';
  }
  if (!isUpperLetters(str)) {
    res += '\nPassword shoud include at least 1 upper letter.';
  }
  if (!isContainNumber(str)) {
    res += '\nPassword shoud contain at least 1 number.';
  }
  return res;
};
