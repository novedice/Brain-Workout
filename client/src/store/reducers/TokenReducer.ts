/* eslint-disable @typescript-eslint/default-param-last */
import { IToken } from '../../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UPDATE_TOKEN } from '../../constants';

const initialState = {
  token: '',
};

export const TokenReducer = (
  state = initialState,
  action: PayloadAction<IToken>
) => {
  switch (action.type) {
    case UPDATE_TOKEN: {
      return action.payload;
    }
  }
  return state;
};
