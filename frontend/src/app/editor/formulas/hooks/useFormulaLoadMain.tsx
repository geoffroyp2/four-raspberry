import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { formulaQuery, FormulaQueryParams } from "../_gql/queries";
import { FormulaQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { setFormulaData } from "../_state/formulaDataSlice";
import { selectFormulaMainLoadId, setFormulaMainLoadId } from "../_state/formulaDisplaySlice";

const useFormulaLoadMain = () => {
  const dispatch = useDispatch();
  const formulaId = useSelector(selectFormulaMainLoadId);

  const [loadFormulaData, status] = useLazyQuery<FormulaQueryRes>(formulaQuery, {
    onCompleted: ({ formulas }) => {
      if (formulas.rows[0]) {
        if (formulaId !== formulas.rows[0].id) dispatch(setFormulaMainLoadId(formulas.rows[0].id!));
        dispatch(setFormulaData(formulas.rows[0]));
      }
    },
  });

  useEffect(() => {
    const mainParams: FormulaQueryParams = {
      variables: {
        id: formulaId ?? 0,
      },
    };
    loadFormulaData(mainParams);
  }, [formulaId, loadFormulaData]);

  return status;
};

export default useFormulaLoadMain;
