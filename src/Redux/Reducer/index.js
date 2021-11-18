import { combineReducers } from "redux";
import identityReducer from "./identityReducer";
import signPageReducer from "./signPageReducer";
import identityDataReducer from "./identityDataReducer";
import liveDataReducer from "./liveDataReducer";
import liveStatusReducer from "./liveStatusReducer";
import signLoadingReducer from "./signLoadingReducer";

const allReducers = combineReducers({
  identity: identityReducer,
  signPage: signPageReducer,
  identityData: identityDataReducer,
  liveData: liveDataReducer,
  liveStatus: liveStatusReducer,
  signLoading: signLoadingReducer,
});

export default allReducers;
