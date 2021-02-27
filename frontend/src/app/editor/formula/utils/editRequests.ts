import { sendGQLQuery } from "@network/GQLClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { Formula } from "@baseTypes/database/GQLResTypes";

import { store } from "@app/store";
import { setNeedRefresh } from "@editor/_shared/setNeedsRefresh";
import { setFormulaData, setFormulaId } from "../_state/formulaDataSlice";

import { allFormulaFields } from "./dataRequests";

export const saveFormulaChanges = async (formulaId: number, newData: Formula) => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "updateFormula",
      args: {
        formulaId,
        ...newData,
      },
      res: allFormulaFields,
    },
  });
  const res = await sendGQLQuery<{ updateFormula: Formula }>(request);
  if (res) {
    setNeedRefresh("formula");
    store.dispatch(setFormulaData(res.updateFormula));
  }
};

export const createFormula = async () => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "createFormula",
      args: {},
      res: allFormulaFields,
    },
  });
  const res = await sendGQLQuery<{ createFormula: Formula }>(request);
  if (res) {
    setNeedRefresh("formula");
    store.dispatch(setFormulaData(res.createFormula));
  }
};

export const deleteFormula = async (formulaId: number) => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "deleteFormula",
      args: { formulaId },
    },
  });
  const res = await sendGQLQuery<{ deleteFormula: boolean }>(request);
  if (res) {
    setNeedRefresh("formula");
    store.dispatch(setFormulaId(0));
  }
};
