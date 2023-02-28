/* eslint-disable @typescript-eslint/default-param-last */
import { PayloadAction } from '@reduxjs/toolkit';
import {
  ADD_CATEGORY,
  UPDATE_CATEGORIES,
  DELETE_CATEGORY,
} from '../../constants';

export const FavoriteCategoriesReducer = (
  state: string[] = [],
  action: PayloadAction<string[]>
) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      return [...state, action.payload[0]];
    }
    case UPDATE_CATEGORIES: {
      return action.payload;
    }
    case DELETE_CATEGORY: {
      return state.filter((category) => category !== action.payload[0]);
    }

    default:
      return state;
  }
};
