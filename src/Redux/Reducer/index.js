import { combineReducers } from "redux";
import identityReducer from "./identityReducer";
import signPageReducer from "./signPageReducer";
import identityDataReducer from "./identityDataReducer";
import liveDataReducer from "./liveDataReducer";

const allReducers = combineReducers({
  identity: identityReducer,
  signPage: signPageReducer,
  identityData: identityDataReducer,
  liveData: liveDataReducer,
});

export default allReducers;
