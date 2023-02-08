/* eslint-disable @typescript-eslint/default-param-last */
import { IUser } from '../../types/interfaces';
// import { ImodalAction } from '../../types/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  nickName: '',
  language: 'en',
  loggedIn: false,
};
// (state= initialState, action: ImodalAction)
export const UserReducer = (
  state = initialState,
  action: PayloadAction<IUser>
) => {
  switch (action.type) {
    case 'UPDATE': {
      return action.payload;
    }
  }
  return state;
};
