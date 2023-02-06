import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk' 
// import { createStore } from "redux";
// import { modalReducer } from "./reducers/modalReducer";
import { rootReducer } from "./reducers";

export const store = createStore(rootReducer, applyMiddleware(thunk)) 
// export const store = createStore(modalReducer) 