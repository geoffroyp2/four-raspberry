import { store } from "../store";

import { loadReference } from "@redux/dataReducers/referenceSlice";
import { loadRecord } from "@redux/dataReducers/recordSlice";
import { loadPiece } from "@redux/dataReducers/pieceSlice";
import { loadFormula } from "@redux/dataReducers/formulaSlice";
import { TabIDType } from "@redux/displayStateReducers/generalDisplaySlice";

/**
 * calls refreshTab() for every tab
 */

export const refreshAllTabs = () => {
  refreshTab("Reference");
  refreshTab("Record");
  refreshTab("Piece");
  refreshTab("Formula");
};

/**
 * refresh the infos in the part of the store relating to the specified tab
 * @param tab the specific tab to refresh, defaults to current selected tab
 */

export const refreshTab = (tab?: TabIDType) => {
  const tabToRefresh = tab || store.getState().generalDisplay.currentTab;

  switch (tabToRefresh) {
    case "Reference": {
      const references = store.getState().dbData.reference;
      const currentReference = store.getState().reference.selected;
      store.dispatch(loadReference(references[currentReference._id]));
      break;
    }

    case "Record": {
      const records = store.getState().dbData.record;
      const currentRecord = store.getState().record.selected;
      store.dispatch(loadRecord(records[currentRecord._id]));
      break;
    }

    case "Piece": {
      const pieces = store.getState().dbData.piece;
      const currentPiece = store.getState().piece.selected;
      store.dispatch(loadPiece(pieces[currentPiece._id]));
      break;
    }

    case "Formula": {
      const formulas = store.getState().dbData.formula;
      const currentFormula = store.getState().formula.selected;
      store.dispatch(loadFormula(formulas[currentFormula._id]));
      break;
    }

    default:
      break;
  }
};
