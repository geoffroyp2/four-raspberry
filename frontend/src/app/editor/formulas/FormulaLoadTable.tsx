import { FC, useCallback, useEffect, useMemo } from "react";

import { useLazyQuery } from "@apollo/client";
import { formulaPageQuery } from "./_gql/queries";
import { PageQueryParams } from "@editor/_gql/types";
import { Formula, FormulaQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectFormulaLoadList, setFormulaLoadList } from "./_state/formulaDataSlice";
import {
  selectFormulaLoadAmount,
  selectFormulaLoadId,
  selectFormulaLoadPage,
  setFormulaLoadId,
  setFormulaLoadPage,
  setFormulaTotalAmount,
} from "./_state/formulaDisplaySlice";

import NotFound from "@editor/NotFound";
import LoadTable from "@components/tables/LoadTable";
import TableHeader from "@components/tables/TableHeader";
import TableRow from "@components/tables/TableRow";

import { dateToDisplayString } from "@app/_utils/dateFormat";

const FormulaLoadTable: FC = () => {
  const dispatch = useDispatch();

  const formulaId = useSelector(selectFormulaLoadId);
  const currentLoadPage = useSelector(selectFormulaLoadPage);
  const currentLoadAmount = useSelector(selectFormulaLoadAmount);
  const currentLoadList = useSelector(selectFormulaLoadList);

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setFormulaLoadId(id));
    },
    [dispatch]
  );

  const [loadFormulaPage, { loading, error }] = useLazyQuery<FormulaQueryRes>(formulaPageQuery, {
    onCompleted: ({ formulas }) => {
      if (currentLoadPage !== 0 && formulas.rows.length === 0) {
        // if current page has no result
        dispatch(setFormulaLoadPage(0));
      } else {
        dispatch(setFormulaLoadList(formulas.rows));
        dispatch(setFormulaTotalAmount(formulas.count));
      }
    },
  });

  useEffect(() => {
    const variables: PageQueryParams = {
      variables: {
        page: currentLoadPage,
        amount: currentLoadAmount,
      },
    };
    loadFormulaPage(variables);
  }, [currentLoadPage, currentLoadAmount, loadFormulaPage]);

  const rows = useMemo(() => {
    const formulas: Formula[] = [];
    if (loading) {
      for (let i = currentLoadList.length; i < currentLoadAmount; ++i) {
        formulas.push({});
      }
    } else {
      for (let i = 0; i < currentLoadList.length; ++i) {
        formulas.push(currentLoadList[i]);
      }
      for (let i = currentLoadList.length; i < currentLoadAmount; ++i) {
        formulas.push({});
      }
    }

    return formulas.map((formula, idx) => (
      <TableRow
        key={`load-table-row-${idx}`}
        rowContent={[formula.name ?? "-", formula.target?.name ?? "-", dateToDisplayString(formula.createdAt, true)]}
        selected={formula.id === formulaId}
        id={formula.id ?? 0}
        disabled={formula.id === undefined}
        handleSelect={() => handleSelectRow(formula.id ?? 0)}
        hoverEffect
      />
    ));
  }, [currentLoadList, currentLoadAmount, handleSelectRow, formulaId, loading]);

  if (error) return <NotFound />;

  return (
    <LoadTable>
      <TableHeader columnNames={["Nom", "Courbe de Référence", "Créé le"]} />
      <tbody>{rows}</tbody>
    </LoadTable>
  );
};

export default FormulaLoadTable;
