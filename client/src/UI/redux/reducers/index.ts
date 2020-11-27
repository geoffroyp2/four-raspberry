import { combineReducers } from "redux";
import graphListReducer from "./graphSlice";
import UIControlsReducer from "./UIControlsSlice";

export default combineReducers({ graphListReducer, UIControlsReducer });
