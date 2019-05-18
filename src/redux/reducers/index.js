import { combineReducers } from "redux";
import courses from "./courseReducers";
import authors from "./authorReducers";

const rootReducer = combineReducers({
  courses,
  authors
});

export default rootReducer;
