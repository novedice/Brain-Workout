import { HIDE_MODAL, SHOW_MODAL } from '../../constants';
import { ImodalAction, ImodalState } from '../../types/types';

const initialState: ImodalState = {
  openLogInModal: false,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const LogInReducer = (state = initialState, action: ImodalAction) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { openLogInModal: true };
    case HIDE_MODAL:
      return { openLogInModal: false };
    default:
      return state;
  }
};
