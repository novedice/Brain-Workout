import { combineReducers } from 'redux';
import { LoggedInReducer } from './LoggedInReducer';
import { LogInReducer } from './LogInReducer';
import { SignUpReducer } from './SignUpReducer';
import { TokenReducer } from './TokenReducer';
import { UserReducer } from './UserReducer';
import { ResultsReducer } from './ResultsReducer';
import { FavoriteCategoriesReducer } from './FavoriteCategoriesReducer';

export const rootReducer = combineReducers({
  logInModal: LogInReducer,
  signUpModal: SignUpReducer,
  userInfo: UserReducer,
  tokenInfo: TokenReducer,
  loggedInInfo: LoggedInReducer,
  resultsInfo: ResultsReducer,
  favoriteCategoriesInfo: FavoriteCategoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
