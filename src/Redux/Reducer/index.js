import { combineReducers } from "redux";
import identityReducer from "./identityReducer";
import signPageReducer from "./signPageReducer";
import signStatusReducer from "./signStatusReducer";
import identityDataReducer from "./identityDataReducer";

const allReducers = combineReducers({
  identity: identityReducer,
  signPage: signPageReducer,
  signStatus: signStatusReducer,
  identityData: identityDataReducer,
});

export default allReducers;
