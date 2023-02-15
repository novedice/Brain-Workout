import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

export const isNameValid = (str: string): ReactElement | string => {
  if (str.trim().length < 3) {
    return <FormattedMessage id="name_error" />;
  }
  return '';
};
