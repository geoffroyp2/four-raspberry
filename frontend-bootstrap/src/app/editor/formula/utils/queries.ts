import { store } from "@app/store";
import { ChemicalQueryRes, FormulaQueryRes } from "@baseTypes/database/GQLResTypes";

import { batch } from "react-redux";
import { setFormulaData, setFormulaId, setFormulaLoadList, setFormulaNeedsRefresh } from "../_state/formulaDataSlice";
import { setFormulaLoadPage, setFormulaTotalAmount } from "../_state/formulaDisplaySlice";

import { getFormulaFieldsQuery, getFormulaPageRequest, getChemicalPageRequest } from "./queryDocuments";
import client from "@network/apolloClient";
import { setChemicalLoadPage, setChemicalTotalAmount } from "../_state/chemicalDisplaySlice";
import { setChemicalLoadList } from "../_state/chemicalDataSlice";

export const loadFormula = async (id: number) => {
  const { data } = await client.query<FormulaQueryRes>({ query: getFormulaFieldsQuery(id) });

  // If id was not valid
  if (store.getState().formulaData.formulaId !== 0 && data.formulas.count === 0) {
    store.dispatch(setFormulaId(0));
    return;
  }

  if (data) {
    batch(() => {
      store.dispatch(setFormulaData(data.formulas.rows[0]));
      store.dispatch(setFormulaNeedsRefresh(false));
    });
  }
};

export const loadFormulaList = async (page: number, amount: number) => {
  const { data } = await client.query<FormulaQueryRes>({ query: getFormulaPageRequest({ page, amount }) });
  if (data) {
    if (page !== 0 && data.formulas.rows.length === 0) {
      // if current page has no result
      store.dispatch(setFormulaLoadPage(0));
    } else {
      batch(() => {
        store.dispatch(setFormulaTotalAmount(data.formulas.count));
        store.dispatch(setFormulaLoadList(data.formulas.rows));
      });
    }
  }
};

export const loadChemicalList = async (page: number, amount: number) => {
  const { data } = await client.query<ChemicalQueryRes>({ query: getChemicalPageRequest({ page, amount }) });
  if (data) {
    if (page !== 0 && data.chemicals.rows.length === 0) {
      // if current page has no result
      store.dispatch(setChemicalLoadPage(0));
    } else {
      batch(() => {
        store.dispatch(setChemicalTotalAmount(data.chemicals.count));
        store.dispatch(setChemicalLoadList(data.chemicals.rows));
      });
    }
  }
};
