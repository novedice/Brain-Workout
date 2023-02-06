import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";

export const rootReducer = combineReducers({
  openModal: modalReducer 
})

export type RootState = ReturnType<typeof rootReducer>