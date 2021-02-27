import { store } from "@app/store";
import { sendGQLQuery } from "@network/GQLClient";
import { FormulaQueryRes } from "@baseTypes/database/GQLResTypes";

import { batch } from "react-redux";
import { setFormulaData, setFormulaLoadList, setFormulaNeedsRefresh } from "../_state/formulaDataSlice";
import { setFormulaLoadPage, setFormulaTotalAmount } from "../_state/formulaDisplaySlice";

import { getFormulaFieldsQuery, getFormulaPageRequest } from "./dataRequests";

export const loadFormula = async (id: number) => {
  const res = await sendGQLQuery<FormulaQueryRes>(getFormulaFieldsQuery(id));
  if (res) {
    batch(() => {
      store.dispatch(setFormulaData(res.formulas.rows[0]));
      store.dispatch(setFormulaNeedsRefresh(false));
    });
  }
};

export const loadFormulaList = async (page: number, amount: number) => {
  const res = await sendGQLQuery<FormulaQueryRes>(getFormulaPageRequest({ page, amount }));
  if (res) {
    if (page !== 0 && res.formulas.rows.length === 0) {
      // if current page has no result
      store.dispatch(setFormulaLoadPage(0));
    } else {
      batch(() => {
        store.dispatch(setFormulaTotalAmount(res.formulas.count));
        store.dispatch(setFormulaLoadList(res.formulas.rows));
      });
    }
  }
};
