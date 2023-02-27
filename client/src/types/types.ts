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

export type StatusGameType = 'Started' | 'Finished' | 'Wait' | 'Paused';

export type WorkoutStageType =
  | 'Wait'
  | 'FirstStarted'
  | 'FirstFinished'
  | 'SecondStarted'
  | 'SecondFinished';
