import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { formulaPageQuery, FormulaPageQueryParams } from "../_gql/queries";
import { FormulaQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { setFormulaLoadList } from "../_state/formulaDataSlice";
import {
  selectFormulaLoadAmount,
  selectFormulaLoadPage,
  selectFormulaNameSearch,
  selectFormulaSortDirection,
  selectFormulaSortParam,
  setFormulaLoadPage,
  setFormulaTotalAmount,
} from "../_state/formulaDisplaySlice";

const useFormulaLoadPage = () => {
  const dispatch = useDispatch();

  const currentLoadAmount = useSelector(selectFormulaLoadAmount);
  const currentLoadPage = useSelector(selectFormulaLoadPage);
  const formulaNameSearch = useSelector(selectFormulaNameSearch);
  const formulaSortParam = useSelector(selectFormulaSortParam);
  const formulaSortDirection = useSelector(selectFormulaSortDirection);

  const [loadFormulaPage, status] = useLazyQuery<FormulaQueryRes>(formulaPageQuery, {
    onCompleted: ({ formulas }) => {
      if (currentLoadPage !== 0 && formulas.rows.length === 0) {
        // if current page has no result
        dispatch(setFormulaLoadPage(0));
      } else {
        dispatch(setFormulaLoadList(formulas.rows));
        dispatch(setFormulaTotalAmount(formulas.count));
      }
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const variables: FormulaPageQueryParams = {
      variables: {
        page: currentLoadPage,
        amount: currentLoadAmount,
        sort: {
          sortBy: formulaSortParam,
          order: formulaSortDirection,
        },
      },
    };
    if (formulaNameSearch !== null) variables.variables["name"] = formulaNameSearch;
    loadFormulaPage(variables);
  }, [currentLoadPage, currentLoadAmount, formulaNameSearch, formulaSortParam, formulaSortDirection, loadFormulaPage]);

  return status;
};

export default useFormulaLoadPage;
