import { store } from "@app/store";
import { FormulaQueryRes } from "@baseTypes/database/GQLResTypes";

import { batch } from "react-redux";
import { setFormulaData, setFormulaLoadList, setFormulaNeedsRefresh } from "../_state/formulaDataSlice";
import { setFormulaLoadPage, setFormulaTotalAmount } from "../_state/formulaDisplaySlice";

import { getFormulaFieldsQuery, getFormulaPageRequest } from "./queryDocuments";
import client from "@network/apolloClient";

export const loadFormula = async (id: number) => {
  const { data } = await client.query<FormulaQueryRes>({ query: getFormulaFieldsQuery(id) });
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
