import { createStore } from "redux";
import allReducers from "../Reducer";
// console.log(allReducers);

export const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
