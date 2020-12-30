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
import { ResDataType } from "@sharedTypes/dbAPITypes";
import { store } from "@src/redux/store";

export const updateStore = (data: ResDataType) => {
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
};

export const deleteInStore = (id: string, type: "chemical" | "formula" | "piece" | "record" | "reference") => {
  switch (type) {
    case "chemical":
      store.dispatch(deleteChemical(id));
      break;
    case "formula":
      store.dispatch(deleteFormula(id));
      break;
    case "piece":
      store.dispatch(deletePiece(id));
      break;
    case "record":
      store.dispatch(deleteRecord(id));
      break;
    case "reference":
      store.dispatch(deleteReference(id));
      break;
  }
};
