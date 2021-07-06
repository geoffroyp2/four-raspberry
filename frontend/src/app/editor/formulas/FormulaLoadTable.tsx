import { FC, ReactNode, useCallback, useEffect, useState } from "react";

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
  selectFormulaNameSearch,
  selectFormulaPageAmount,
  selectFormulaSortDirection,
  selectFormulaSortParam,
  setFormulaLoadId,
  setFormulaLoadPage,
  setFormulaSortDirection,
  setFormulaSortParam,
  setFormulaTotalAmount,
} from "./_state/formulaDisplaySlice";

import NotFound from "@editor/NotFound";
import LoadTable from "@components/tables/LoadTable";
import TableHeader from "@components/tables/TableHeader";
import TableRow from "@components/tables/TableRow";
import Pagination from "@components/tables/Pagination";
import LoadTableFooter from "@components/tables/LoadTableFooter";

import { dateToDisplayString } from "@app/_utils/dateFormat";

type Props = {
  buttons?: ReactNode;
};

const FormulaLoadTable: FC<Props> = ({ buttons }) => {
  const dispatch = useDispatch();

  const [Rows, setRows] = useState<ReactNode[]>([]);
  const formulaId = useSelector(selectFormulaLoadId);
  const currentLoadPage = useSelector(selectFormulaLoadPage);
  const currentLoadAmount = useSelector(selectFormulaLoadAmount);
  const currentLoadList = useSelector(selectFormulaLoadList);
  const formulaLoadPage = useSelector(selectFormulaLoadPage);
  const formulaPageAmount = useSelector(selectFormulaPageAmount);
  const formulaNameSearch = useSelector(selectFormulaNameSearch);
  const formulaSortParam = useSelector(selectFormulaSortParam);
  const formulaSortDirection = useSelector(selectFormulaSortDirection);

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
    if (formulaNameSearch !== null) variables.variables["name"] = formulaNameSearch;
    loadFormulaPage(variables);
  }, [currentLoadPage, currentLoadAmount, formulaNameSearch, loadFormulaPage]);

  const handleSetFormulaPage = useCallback(
    (page: number) => {
      dispatch(setFormulaLoadPage(page));
    },
    [dispatch]
  );

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setFormulaLoadId(id));
    },
    [dispatch]
  );

  const handleSort = (param: typeof formulaSortParam) => {
    if (param === formulaSortParam) {
      dispatch(setFormulaSortDirection(formulaSortDirection === "ASC" ? "DESC" : "ASC"));
    } else {
      dispatch(setFormulaSortParam(param));
    }
  };

  useEffect(() => {
    if (loading) {
      if (Rows.length === 0) {
        setRows(
          [...Array(currentLoadAmount)].map((e, idx) => (
            <TableRow
              key={`load-table-row-${idx}`}
              rowContent={["", "", ""]}
              selected={false}
              id={0}
              disabled={true}
              handleSelect={() => {}}
            />
          ))
        );
      }
      return;
    }

    const formulas: Formula[] = [];
    for (let i = 0; i < currentLoadList.length; ++i) formulas.push(currentLoadList[i]);
    for (let i = currentLoadList.length; i < currentLoadAmount; ++i) formulas.push({});
    setRows(
      formulas.map((formula, idx) => (
        <TableRow
          key={`load-table-row-${idx}`}
          rowContent={[
            formula.name ?? "-",
            formula.target?.name ?? "-",
            dateToDisplayString(formula.createdAt, true),
            dateToDisplayString(formula.updatedAt, true),
          ]}
          selected={formula.id === formulaId}
          id={formula.id ?? 0}
          disabled={formula.id === undefined}
          handleSelect={() => handleSelectRow(formula.id ?? 0)}
          hoverEffect
        />
      ))
    );
  }, [loading, currentLoadList, currentLoadAmount, formulaId, Rows.length, handleSelectRow]);

  const getColumn = (name: string, param: typeof formulaSortParam) => {
    return {
      name,
      onClick: () => handleSort(param),
      isSortParam: formulaSortParam === param,
      sortDirection: formulaSortDirection,
    };
  };

  if (error) return <NotFound />;

  return (
    <>
      <LoadTable>
        <TableHeader
          columns={[
            getColumn("Nom", "name"),
            getColumn("Courbe de référence", "target"),
            getColumn("Créé le", "createdAt"),
            getColumn("Dernière modification", "updatedAt"),
          ]}
        />
        <tbody>{Rows}</tbody>
      </LoadTable>
      <LoadTableFooter
        pagination={
          <Pagination currentPage={formulaLoadPage} pageAmount={formulaPageAmount} handleSetPage={handleSetFormulaPage} small />
        }
        buttons={buttons}
      />
    </>
  );
};

export default FormulaLoadTable;
