import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

export const isPasswordsEquial = (
  str1: string,
  str2: string
): ReactElement | string => {
  if (str1 !== str2) {
    return <FormattedMessage id="password_confirm_error" />;
  }
  return '';
};
