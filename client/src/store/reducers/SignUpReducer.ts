import { HIDE_MODAL} from "../../constants";
import { ImodalAction, ImodalSignUpState } from "../../types/types";



const initialState: ImodalSignUpState = {
  openSignUpModal: false
}

// eslint-disable-next-line @typescript-eslint/default-param-last
export const SignUpReducer = (state= initialState, action: ImodalAction) => {
  switch (action.type) {
    case 'SHOW_SIGNUP': 
      return {openSignUpModal: true}
    case HIDE_MODAL: 
      return {openSignUpModal: false}
    default: return state; 
  }
} 