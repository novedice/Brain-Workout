/* eslint-disable @typescript-eslint/default-param-last */
import { PayloadAction } from '@reduxjs/toolkit';
import {
  ADD_RESULT,
  // CREATE_NEW_RESULT,
  UPDATE_ALL_RESULTS,
} from '../../constants';
import { IResData } from '../../types/interfaces';

// const initialState: IResults[] = [];

export const ResultsReducer = (
  state: IResData[] = [],
  action: PayloadAction<{ gameId: number; createdAt: Date; value: number }[]>
) => {
  switch (action.type) {
    case ADD_RESULT: {
      return [...state, action.payload[0]];

      // let newResult = true;
      // for (let gameResult of state) {
      //   if (gameResult.gameId === action.payload.gameId) {
      //     gameResult.results.push(action.payload.result);
      //     newResult = false;
      //     break;
      //   }
      // }
      // if (newResult) {
      //   state.push({
      //     gameId: action.payload.gameId,
      //     gameName: action.payload.gameName,
      //     results: [action.payload.result],
      //   });
      //   return state;
      // }
    }
    case UPDATE_ALL_RESULTS: {
      return action.payload;
    }

    default:
      return state;
  }
};
