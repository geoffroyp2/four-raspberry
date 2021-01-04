import { store } from "../store";

import {
  LoadTableContentType,
  setCurrentTab,
  setLoadTableContent,
  setLoadTableShow,
  TabIDType,
} from "@redux/displayStateReducers/generalDisplaySlice";
import { setReferenceInfosEditMode, setReferencePointEditMode } from "@redux/displayStateReducers/referenceDisplaySlice";
import { setRecordInfosEditMode, setRecordPointEditMode } from "@redux/displayStateReducers/recordDisplaySlice";
import { setPieceInfosEditMode } from "@redux/displayStateReducers/pieceDisplaySlice";
import { setFormulaInfosEditMode } from "@redux/displayStateReducers/formulaDisplaySlice";

import { rollbackReferenceChanges } from "@redux/dataReducers/referenceSlice";
import { rollbackRecordChanges } from "@redux/dataReducers/recordSlice";
import { rollbackPieceChanges } from "@redux/dataReducers/pieceSlice";
import { rollbackFormulaChanges } from "@redux/dataReducers/formulaSlice";

/**
 * changes tab and handles associated UI states
 * @param tab destination tab
 */

export const changeTab = (tab: TabIDType) => {
  cancelChanges();
  store.dispatch(setCurrentTab(tab));
};

/**
 * shows the load table
 * @param content the table content
 */

export const showLoadTable = (content: LoadTableContentType) => {
  cancelChanges();
  store.dispatch(setLoadTableContent(content));
  store.dispatch(setLoadTableShow(true));
};

/**
 * reverts unsaved changes in a specific tab
 * @param tab optionnal: tab to cancel changes to, defaults to selected tab
 */

export const cancelChanges = (tab?: TabIDType) => {
  const state = store.getState();
  const tabToRefresh = tab || state.generalDisplay.currentTab;

  switch (tabToRefresh) {
    case "Reference":
      if (state.referenceDisplay.infosEditMode || state.referenceDisplay.pointEditMode) {
        store.dispatch(rollbackReferenceChanges());
        store.dispatch(setReferenceInfosEditMode(false));
        store.dispatch(setReferencePointEditMode(false));
      }
      break;

    case "Record":
      if (state.recordDisplay.infosEditMode || state.recordDisplay.pointEditMode) {
        store.dispatch(rollbackRecordChanges());
        store.dispatch(setRecordInfosEditMode(false));
        store.dispatch(setRecordPointEditMode(false));
      }
      break;

    case "Piece":
      if (state.pieceDisplay.infosEditMode) {
        store.dispatch(rollbackPieceChanges());
        store.dispatch(setPieceInfosEditMode(false));
      }
      break;

    case "Formula":
      if (state.formulaDisplay.infosEditMode) {
        store.dispatch(rollbackFormulaChanges());
        store.dispatch(setFormulaInfosEditMode(false));
      }
      break;

    default:
      break;
  }
};
