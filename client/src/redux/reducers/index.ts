import { combineReducers } from "redux";
// import graphListReducer from "./+old/graphSlice";
// import UIControlsReducer from "./UIControlsSlice";
// import EngineStatusReducer from "./+old/engineStatusSlice";
import recordReducer from "./recordSlice";
import referenceReducer from "./referenceSlice";
import pieceReducer from "./pieceSlice";
import formulaReducer from "./formulaSlice";
import dbDataReducer from "./dbDataSlice";
import displayStateReducer from "./displayState";

export default combineReducers({
  recordReducer,
  referenceReducer,
  pieceReducer,
  formulaReducer,
  dbDataReducer,
  displayStateReducer,
});
