import { LOGOUT, LOGGIN } from '../../constants';
import { ImodalAction } from '../../types/types';

interface ILogState {
  loggedIn: boolean;
}

const initialState: ILogState = {
  loggedIn: false,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const LoggedInReducer = (state = initialState, action: ImodalAction) => {
  switch (action.type) {
    case LOGGIN:
      return { loggedIn: true };
    case LOGOUT:
      return { loggedIn: false };
    default:
      return state;
  }
};
