/* eslint-disable @typescript-eslint/default-param-last */
import { IUser } from '../../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CHANGE_LANGUAGE, UPDATE_USER } from '../../constants';

const initialState = {
  id: 0,
  nickname: '',
  language: 'en',
  loggedIn: false,
};
export const UserReducer = (
  state = initialState,
  action: PayloadAction<IUser>
) => {
  switch (action.type) {
    case UPDATE_USER: {
      return action.payload;
    }
    case CHANGE_LANGUAGE: {
      state.language = state.language === 'en' ? 'rus' : 'en';
      return state;
    }
    case 'LOGGINUSER': {
      state.loggedIn = true;
      return state;
    }
  }
  return state;
};
