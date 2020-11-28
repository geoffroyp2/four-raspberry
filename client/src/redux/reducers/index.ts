import { combineReducers } from "redux";
import graphListReducer from "./graphSlice";
import UIControlsReducer from "./UIControlsSlice";
import EngineStatusReducer from "./engineStatusSlice";

export default combineReducers({ graphListReducer, UIControlsReducer, EngineStatusReducer });
