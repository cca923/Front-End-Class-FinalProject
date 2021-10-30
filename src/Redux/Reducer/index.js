import { combineReducers } from "redux";
import identityReducer from "./identityReducer";
import signPageReducer from "./signPageReducer";

const allReducers = combineReducers({
  identity: identityReducer,
  signPage: signPageReducer,
});

export default allReducers;
