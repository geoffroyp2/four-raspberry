import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { Formula } from "@baseTypes/database/GQLResTypes";

import { store } from "@app/store";
import { setNeedRefresh } from "@editor/_shared/setNeedsRefresh";
import { setFormulaData, setFormulaId } from "../_state/formulaDataSlice";

import { allFormulaFields } from "./queryDocuments";
import { gql } from "@apollo/client";
import client from "@network/apolloClient";

export const saveFormulaChanges = async (formulaId: number, newData: Formula) => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "updateFormula",
        args: {
          formulaId,
          ...newData,
        },
        res: allFormulaFields,
      },
    })
  );
  const { data } = await client.mutate<{ updateFormula: Formula }>({ mutation });
  if (data) {
    store.dispatch(setFormulaData(data.updateFormula));
    setNeedRefresh("formula");
  }
};

export const saveIngredientsChanges = async () => {
  // TODO
};

export const createFormula = async () => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "createFormula",
        args: {},
        res: allFormulaFields,
      },
    })
  );
  const { data } = await client.mutate<{ createFormula: Formula }>({ mutation });
  if (data) {
    store.dispatch(setFormulaData(data.createFormula));
    setNeedRefresh("formula");
  }
};

export const deleteFormula = async (formulaId: number) => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "deleteFormula",
        args: { formulaId },
      },
    })
  );
  const { data } = await client.mutate<{ deleteFormula: boolean }>({ mutation });
  if (data) {
    store.dispatch(setFormulaId(0));
    setNeedRefresh();
  }
};
