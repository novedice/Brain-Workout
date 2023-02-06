import { combineReducers } from "redux";
import { LogInReducer} from "./LogInReducer";
import { SignUpReducer } from "./SignUpReducer";

export const rootReducer = combineReducers({
  logInModal: LogInReducer,
  signUpModal: SignUpReducer
})

export type RootState = ReturnType<typeof rootReducer>