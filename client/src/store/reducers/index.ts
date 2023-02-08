import { combineReducers } from 'redux';
import { LogInReducer } from './LogInReducer';
import { SignUpReducer } from './SignUpReducer';
import { TokenReducer } from './TokenReducer';
import { UserReducer } from './UserReducer';

export const rootReducer = combineReducers({
  logInModal: LogInReducer,
  signUpModal: SignUpReducer,
  userInfo: UserReducer,
  tokenInfo: TokenReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
