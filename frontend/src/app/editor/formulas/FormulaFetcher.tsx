import { FC, useEffect } from "react";
import { useParams } from "react-router";

import { useLazyQuery } from "@apollo/client";
import { formulaQuery, FormulaQueryParams } from "./_gql/queries";
import { FormulaQueryRes } from "@app/_types/dbTypes";

import { useDispatch } from "react-redux";
import { setFormulaLoadId } from "./_state/formulaDisplaySlice";
import { setFormulaData } from "./_state/formulaDataSlice";

import FormulaInfosPage from "./FormulaInfosPage";
import NotFound from "@editor/NotFound";

const FormulaFetcher: FC = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [loadFormulaData, { error }] = useLazyQuery<FormulaQueryRes>(formulaQuery, {
    onCompleted: ({ formulas }) => {
      if (formulas.rows[0]) {
        dispatch(setFormulaLoadId(formulas.rows[0].id!));
        dispatch(setFormulaData(formulas.rows[0]));
      }
    },
  });

  useEffect(() => {
    const formulaId = isNaN(+params.id) ? 0 : +params.id;
    const mainParams: FormulaQueryParams = {
      variables: {
        id: formulaId,
      },
    };
    loadFormulaData(mainParams);
  }, [params, loadFormulaData]);

  if (error || isNaN(+params.id)) {
    return <NotFound />;
  }

  return <FormulaInfosPage />;
};

export default FormulaFetcher;
