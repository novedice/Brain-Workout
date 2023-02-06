import { ImodalAction, ImodalState } from "../../types/types";

// const SHOW_MODAL = 'SHOW_MODAL';
// const HIDE_MODAL = 'HIDE_MODAL';

const initialState: ImodalState = {
  openModal: false
}

// eslint-disable-next-line @typescript-eslint/default-param-last
export const modalReducer = (state= initialState, action: ImodalAction) => {
  switch (action.type) {
    case 'SHOW_MODAL': 
      return {openModal: true}
    case 'HIDE_MODAL': 
      return {openModal: false}
    default: return state; 
  }
} 