import { combineReducers } from "redux";

import record from "./dataReducers/recordSlice";
import reference from "./dataReducers/referenceSlice";
import piece from "./dataReducers/pieceSlice";
import formula from "./dataReducers/formulaSlice";
import dbData from "./dataReducers/dbDataSlice";

import generalDisplay from "./displayStateReducers/generalDisplaySlice";
import recordDisplay from "./displayStateReducers/recordDisplaySlice";

export default combineReducers({
  record,
  reference,
  piece,
  formula,
  dbData,
  generalDisplay,
  recordDisplay,
});
