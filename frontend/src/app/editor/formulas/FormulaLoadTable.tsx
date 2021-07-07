import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import useFormulaLoadPage from "./hooks/useFormulaLoadPage";
import { Formula } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectFormulaLoadList } from "./_state/formulaDataSlice";
import {
  selectFormulaLoadAmount,
  selectFormulaPreviewLoadId,
  selectFormulaLoadPage,
  selectFormulaPageAmount,
  selectFormulaSortDirection,
  selectFormulaSortParam,
  setFormulaPreviewLoadId,
  setFormulaLoadPage,
  setFormulaSortDirection,
  setFormulaSortParam,
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
  const { loading, error } = useFormulaLoadPage();
  const [Rows, setRows] = useState<ReactNode[]>([]);

  const formulaId = useSelector(selectFormulaPreviewLoadId);
  const loadList = useSelector(selectFormulaLoadList);
  const loadAmount = useSelector(selectFormulaLoadAmount);
  const loadPage = useSelector(selectFormulaLoadPage);
  const pageAmount = useSelector(selectFormulaPageAmount);
  const sortParam = useSelector(selectFormulaSortParam);
  const sortDirection = useSelector(selectFormulaSortDirection);

  const handleSetPage = useCallback(
    (page: number) => {
      dispatch(setFormulaLoadPage(page));
    },
    [dispatch]
  );

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setFormulaPreviewLoadId(id));
    },
    [dispatch]
  );

  const handleSort = (param: typeof sortParam) => {
    if (param === sortParam) {
      dispatch(setFormulaLoadPage(0));
      dispatch(setFormulaSortDirection(sortDirection === "ASC" ? "DESC" : "ASC"));
    } else {
      dispatch(setFormulaLoadPage(0));
      dispatch(setFormulaSortDirection("ASC"));
      dispatch(setFormulaSortParam(param));
    }
  };

  // Populate rows
  useEffect(() => {
    if (loading) {
      if (Rows.length === 0) {
        setRows(
          [...Array(loadAmount)].map((e, idx) => (
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
    for (let i = 0; i < loadList.length; ++i) formulas.push(loadList[i]);
    for (let i = loadList.length; i < loadAmount; ++i) formulas.push({});
    setRows(
      formulas.map((formula, idx) => (
        <TableRow
          key={`load-table-row-${idx}`}
          rowContent={[
            formula.name ?? "-",
            formula.target?.name ?? "-",
            // dateToDisplayString(formula.createdAt, true),
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
  }, [loading, loadList, loadAmount, formulaId, Rows.length, handleSelectRow]);

  const getColumn = (name: string, param: typeof sortParam) => {
    return {
      name,
      onClick: () => handleSort(param),
      isSortParam: sortParam === param,
      sortDirection: sortDirection,
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
            // getColumn("Créé le", "createdAt"),
            getColumn("Dernière modification", "updatedAt"),
          ]}
        />
        <tbody>{Rows}</tbody>
      </LoadTable>
      <LoadTableFooter
        pagination={<Pagination currentPage={loadPage} pageAmount={pageAmount} handleSetPage={handleSetPage} small />}
        buttons={buttons}
      />
    </>
  );
};

export default FormulaLoadTable;
