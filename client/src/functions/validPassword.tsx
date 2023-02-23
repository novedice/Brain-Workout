import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';
import { isLowerLetters, isUpperLetters } from './isLetter';
import { isContainNumber } from './isNumber';

export const isValidPassword = (
  str: string,
  num: number
): { err: ReactElement | string; n: number } => {
  let res1;
  let res2;
  let res3;
  let res4;
  if (str.length < 8) {
    res1 = <FormattedMessage id="password_er_first" />;
    num += 1;
  }
  if (!isLowerLetters(str)) {
    res2 = <FormattedMessage id="password_er_second" />;
    num += 1;
  }
  if (!isUpperLetters(str)) {
    res3 = <FormattedMessage id="password_er_third" />;
    num += 1;
  }
  if (!isContainNumber(str)) {
    res4 = <FormattedMessage id="password_er_forth" />;
    num += 1;
  }

  return res1 || res2 || res3 || res4
    ? {
        err: (
          <>
            <p>
              {res1}
              {res2}
              {res3}
              {res4}
            </p>
          </>
        ),
        n: num,
      }
    : { err: '', n: num };
};
