import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

export const isNameValid = (
  str: string,
  n: number
): { err: ReactElement | string; n: number } => {
  if (str.trim().length < 3) {
    console.log('nameEr in func', str);
    n += 1;
    return { err: <FormattedMessage id="name_error" />, n: n };
  }
  return { err: '', n: n };
};
