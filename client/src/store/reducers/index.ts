import { combineReducers } from 'redux';
import { LoggedInReducer } from './LoggedInReducer';
import { LogInReducer } from './LogInReducer';
import { SignUpReducer } from './SignUpReducer';
import { TokenReducer } from './TokenReducer';
import { UserReducer } from './UserReducer';
import { ResultsReducer } from './ResultsReducer';

export const rootReducer = combineReducers({
  logInModal: LogInReducer,
  signUpModal: SignUpReducer,
  userInfo: UserReducer,
  tokenInfo: TokenReducer,
  loggedInInfo: LoggedInReducer,
  resultsInfo: ResultsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
