import { legacy_createStore, applyMiddleware ,combineReducers} from "redux";
import  {thunk}  from "redux-thunk";
import { Reducer } from "./AuthReducer/reducer";
import { EventReducer } from "./EventReducer/reducer";

const rootReducer= combineReducers({Reducer,EventReducer})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));