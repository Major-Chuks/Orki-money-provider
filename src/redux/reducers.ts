import { combineReducers } from "@reduxjs/toolkit";
import user from "./slices/user";
import error from "./slices/error";

const rootReducer = combineReducers({
  user,
  error,
});

export default rootReducer;
