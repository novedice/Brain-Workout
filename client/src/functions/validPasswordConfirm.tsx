import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

export const isPasswordsEquial = (
  str1: string,
  str2: string,
  num: number
): { err: ReactElement | string; n: number } => {
  if (str1 !== str2) {
    num += 1;
    return { err: <FormattedMessage id="password_confirm_error" />, n: num };
  }
  return { err: '', n: num };
};
