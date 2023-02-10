import { combineReducers } from 'redux';
import { LoggedInReducer } from './LoggedInReducer';
import { LogInReducer } from './LogInReducer';
import { SignUpReducer } from './SignUpReducer';
import { TokenReducer } from './TokenReducer';
import { UserReducer } from './UserReducer';

export const rootReducer = combineReducers({
  logInModal: LogInReducer,
  signUpModal: SignUpReducer,
  userInfo: UserReducer,
  tokenInfo: TokenReducer,
  loggedInInfo: LoggedInReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
