import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';
import { isLowerLetters, isUpperLetters } from './isLetter';
import { isContainNumber } from './isNumber';

export const isValidPassword = (str: string): ReactElement | string => {
  let res1;
  let res2;
  let res3;
  let res4;
  if (str.length < 8) {
    res1 = <FormattedMessage id="password_er_first" />;
  }
  if (!isLowerLetters(str)) {
    res2 = <FormattedMessage id="password_er_second" />;
  }
  if (!isUpperLetters(str)) {
    res3 = <FormattedMessage id="password_er_third" />;
  }
  if (!isContainNumber(str)) {
    res4 = <FormattedMessage id="password_er_forth" />;
  }

  return res1 || res2 || res3 || res4 ? (
    <>
      <p>
        {res1}
        {res2}
        {res3}
        {res4}
      </p>
    </>
  ) : (
    ''
  );
};
