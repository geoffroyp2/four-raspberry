import { combineReducers } from "redux";

import record from "./dataReducers/recordSlice";
import reference from "./dataReducers/referenceSlice";
import piece from "./dataReducers/pieceSlice";
import formula from "./dataReducers/formulaSlice";
import dbData from "./dataReducers/dbDataSlice";
import engineData from "./dataReducers/engineDataSlice";

import generalDisplay from "./displayStateReducers/generalDisplaySlice";
import recordDisplay from "./displayStateReducers/recordDisplaySlice";
import referenceDisplay from "./displayStateReducers/referenceDisplaySlice";

export default combineReducers({
  record,
  reference,
  piece,
  formula,
  dbData,
  engineData,
  generalDisplay,
  recordDisplay,
  referenceDisplay,
});
