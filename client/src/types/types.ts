import { store } from '../store';

export interface ImodalState {
  openLogInModal: boolean;
}

export interface ImodalSignUpState {
  openSignUpModal: boolean;
}

export interface ImodalAction {
  type: string;
  // payload? : any;
}

export type AppDispatch = typeof store.dispatch;
