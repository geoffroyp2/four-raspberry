import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chemical, Formula, Piece, Record, Reference } from "@sharedTypes/dbModelTypes";
import { RootState } from "../../store";

type dbDataType = {
  record: { [id: string]: Record };
  reference: { [id: string]: Reference };
  piece: { [id: string]: Piece };
  formula: { [id: string]: Formula };
  chemical: { [id: string]: Chemical };
};

const initialState: dbDataType = {
  record: {},
  reference: {},
  piece: {},
  formula: {},
  chemical: {},
};

const dbDataSlice = createSlice({
  name: "dbData",
  initialState,
  reducers: {
    loadAllData: (
      state,
      action: PayloadAction<{
        record: Record[];
        reference: Reference[];
        piece: Piece[];
        formula: Formula[];
        chemical: Chemical[];
      }>
    ) => {
      action.payload.record.forEach((x) => {
        state.record[x._id] = x;
      });
      action.payload.reference.forEach((x) => {
        state.reference[x._id] = x;
      });
      action.payload.piece.forEach((x) => {
        state.piece[x._id] = x;
      });
      action.payload.formula.forEach((x) => {
        state.formula[x._id] = x;
      });
      action.payload.chemical.forEach((x) => {
        state.chemical[x._id] = x;
      });
    },

    updateRecord: (state, action: PayloadAction<Record>) => {
      state.record[action.payload._id] = action.payload;
    },

    updateReference: (state, action: PayloadAction<Reference>) => {
      state.reference[action.payload._id] = action.payload;
    },

    updatePiece: (state, action: PayloadAction<Piece>) => {
      state.piece[action.payload._id] = action.payload;
    },

    updateFormula: (state, action: PayloadAction<Formula>) => {
      state.formula[action.payload._id] = action.payload;
    },

    updateChemical: (state, action: PayloadAction<Chemical>) => {
      state.chemical[action.payload._id] = action.payload;
    },

    deleteRecord: (state, action: PayloadAction<string>) => {
      delete state.record[action.payload];
    },

    deleteReference: (state, action: PayloadAction<string>) => {
      delete state.reference[action.payload];
    },

    deletePiece: (state, action: PayloadAction<string>) => {
      delete state.piece[action.payload];
    },

    deleteFormula: (state, action: PayloadAction<string>) => {
      delete state.formula[action.payload];
    },

    deleteChemical: (state, action: PayloadAction<string>) => {
      delete state.chemical[action.payload];
    },
  },
});

export const {
  loadAllData,

  updateRecord,
  updateReference,
  updatePiece,
  updateFormula,
  updateChemical,

  deleteRecord,
  deleteReference,
  deletePiece,
  deleteFormula,
  deleteChemical,
} = dbDataSlice.actions;

export const dbDataRecord = (state: RootState) => state.dbData.record;
export const dbDataReference = (state: RootState) => state.dbData.reference;
export const dbDataPiece = (state: RootState) => state.dbData.piece;
export const dbDataFormula = (state: RootState) => state.dbData.formula;
export const dbDataChemical = (state: RootState) => state.dbData.chemical;

export default dbDataSlice.reducer;
