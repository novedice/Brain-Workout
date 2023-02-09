/* eslint-disable @typescript-eslint/default-param-last */
import { IToken } from '../../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

export const TokenReducer = (
  state = initialState,
  action: PayloadAction<IToken>
) => {
  switch (action.type) {
    case 'UPDATE': {
      return action.payload;
    }
  }
  return state;
};
