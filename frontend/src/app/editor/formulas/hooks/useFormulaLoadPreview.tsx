import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { formulaPreviewQuery, FormulaQueryParams } from "../_gql/queries";
import { FormulaQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { setFormulaPreview } from "../_state/formulaDataSlice";
import { selectFormulaPreviewLoadId } from "../_state/formulaDisplaySlice";

const useFormulaLoadPreview = () => {
  const dispatch = useDispatch();
  const formulaId = useSelector(selectFormulaPreviewLoadId);

  const [loadFormulaPreview, status] = useLazyQuery<FormulaQueryRes>(formulaPreviewQuery, {
    onCompleted: ({ formulas }) => {
      if (formulas.rows[0] && formulas.rows[0].id === formulaId) {
        dispatch(setFormulaPreview(formulas.rows[0]));
      }
    },
  });

  useEffect(() => {
    if (formulaId === null) {
      dispatch(setFormulaPreview({}));
    } else {
      const mainParams: FormulaQueryParams = {
        variables: {
          id: formulaId ?? 0,
        },
      };
      loadFormulaPreview(mainParams);
    }
  }, [formulaId, dispatch, loadFormulaPreview]);

  return status;
};

export default useFormulaLoadPreview;
