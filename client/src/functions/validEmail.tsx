import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

export const isEmailValid = (str: string): ReactElement | string => {
  if (
    str.length < 4 ||
    !str.includes('@') ||
    !str.includes('.') ||
    str.startsWith('@') ||
    str.lastIndexOf('.') < str.lastIndexOf('@')
  ) {
    return <FormattedMessage id="email_error" />;
  }
  return '';
};
