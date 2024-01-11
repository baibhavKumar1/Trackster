import { legacy_createStore, applyMiddleware ,combineReducers} from "redux";
import  {thunk}  from "redux-thunk";
import { reducer as AuthReducer } from "./AuthReducer/reducer";
import { reducer as EventReducer } from "./EventReducer/reducer";

const rootReducer= combineReducers({AuthReducer,EventReducer})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));