import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

export const isEmailValid = (
  str: string,
  num: number
): { err: ReactElement | string; n: number } => {
  if (
    str.length < 4 ||
    !str.includes('@') ||
    !str.includes('.') ||
    str.startsWith('@') ||
    str.lastIndexOf('.') < str.lastIndexOf('@')
  ) {
    num += 1;
    return { err: <FormattedMessage id="email_error" />, n: num };
  }
  return { err: '', n: num };
};
