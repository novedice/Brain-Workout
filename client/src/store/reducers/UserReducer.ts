/* eslint-disable @typescript-eslint/default-param-last */
import { IUser } from '../../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CHANGE_LANGUAGE, LOGGINUSER, UPDATE_USER } from '../../constants';
import { LOCALES } from '../../i18n/locales';

const initialState: IUser = {
  id: 0,
  nickname: '',
  lang: LOCALES.ENGLISH,
  loggedIn: false,
  email: '',
  alwaysSignIn: true,
};
export const UserReducer = (
  state = initialState,
  action: PayloadAction<IUser>
) => {
  switch (action.type) {
    case UPDATE_USER: {
      state.nickname = action.payload.nickname
        ? action.payload.nickname
        : state.nickname;
      state.email = action.payload.email ? action.payload.email : state.email;
      state.loggedIn = action.payload.loggedIn;
      state.lang = action.payload.lang ? action.payload.lang : state.lang;
      state.alwaysSignIn = action.payload.alwaysSignIn;
      state.id = action.payload.id ? action.payload.id : state.id;

      return state;
    }
    case CHANGE_LANGUAGE: {
      state.lang =
        state.lang === LOCALES.ENGLISH ? LOCALES.RUSSIAN : LOCALES.ENGLISH;
      return state;
    }
    case LOGGINUSER: {
      state.loggedIn = true;
      return state;
    }
    default:
      return state;
  }
};
