import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import titleReducer from "./titleReducer";

export default combineReducers({
  searchReducer,
  titleReducer
});