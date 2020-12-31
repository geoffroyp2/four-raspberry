import {
  deleteChemical,
  deleteFormula,
  deletePiece,
  deleteRecord,
  deleteReference,
  updateChemical,
  updateFormula,
  updatePiece,
  updateRecord,
  updateReference,
} from "@redux/dataReducers/dbDataSlice";

import { loadFormula } from "@redux/dataReducers/formulaSlice";
import { loadPiece } from "@redux/dataReducers/pieceSlice";
import { loadRecord } from "@redux/dataReducers/recordSlice";
import { loadReference } from "@redux/dataReducers/referenceSlice";
import { ResDataType } from "@sharedTypes/dbAPITypes";
import { store } from "@src/redux/store";

import { refreshDataTabs } from "./UIControl";

/**
 * Processes the data coming from the database and updates the stores accordingly
 * @param data data coming from the database
 */

export const updateStore = (data: ResDataType) => {
  console.log(data);

  if (!data) {
    return;
  }

  if (data.chemical) {
    data.chemical.forEach((elem) => {
      store.dispatch(updateChemical(elem));
    });
  }

  if (data.formula) {
    data.formula.forEach((elem) => {
      store.dispatch(updateFormula(elem));
    });
  }

  if (data.piece) {
    data.piece.forEach((elem) => {
      store.dispatch(updatePiece(elem));
    });
  }

  if (data.record) {
    data.record.forEach((elem) => {
      store.dispatch(updateRecord(elem));
    });
  }

  if (data.reference) {
    data.reference.forEach((elem) => {
      store.dispatch(updateReference(elem));
    });
  }

  refreshDataTabs();
};

/**
 * abstraction that handles the deletion of items in the store
 * should be called when an item has been deleted from the database
 * @param id the id of the element to delete
 * @param type the type of element to delete
 */

export const deleteInStore = (id: string, type: "chemical" | "formula" | "piece" | "record" | "reference") => {
  switch (type) {
    case "reference": {
      const references = store.getState().dbData.reference;
      store.dispatch(deleteReference(id));
      store.dispatch(loadReference(references[0] || null));
      break;
    }

    case "record": {
      const records = store.getState().dbData.record;
      store.dispatch(deleteRecord(id));
      store.dispatch(loadRecord(records[0] || null));
      break;
    }

    case "piece": {
      const pieces = store.getState().dbData.piece;
      store.dispatch(deletePiece(id));
      store.dispatch(loadPiece(pieces[0] || null));
      break;
    }

    case "formula": {
      const formulas = store.getState().dbData.formula;
      store.dispatch(deleteFormula(id));
      store.dispatch(loadFormula(formulas[0] || null));
      break;
    }

    case "chemical": {
      store.dispatch(deleteChemical(id));
      break;
    }
  }
};
