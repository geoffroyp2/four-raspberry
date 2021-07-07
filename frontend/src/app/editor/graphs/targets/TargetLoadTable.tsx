import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import useTargetLoadPage from "../hooks/useTargetLoadPage";
import { Target } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectTargetLoadList } from "../_state/targetDataSlice";
import {
  selectTargetLoadAmount,
  selectTargetLoadPage,
  selectTargetPageAmount,
  setTargetLoadPage,
  selectTargetSortParam,
  selectTargetSortDirection,
  setTargetSortDirection,
  setTargetSortParam,
  selectTargetPreviewLoadId,
  setTargetPreviewLoadId,
} from "../_state/targetDisplaySlice";

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

const TargetLoadTable: FC<Props> = ({ buttons }) => {
  const dispatch = useDispatch();
  const { loading, error } = useTargetLoadPage();
  const [Rows, setRows] = useState<ReactNode[]>([]);

  const targetId = useSelector(selectTargetPreviewLoadId);
  const loadList = useSelector(selectTargetLoadList);
  const loadAmount = useSelector(selectTargetLoadAmount);
  const loadPage = useSelector(selectTargetLoadPage);
  const pageAmount = useSelector(selectTargetPageAmount);
  const sortParam = useSelector(selectTargetSortParam);
  const sortDirection = useSelector(selectTargetSortDirection);

  const handleSetTargetPage = useCallback(
    (page: number) => {
      dispatch(setTargetLoadPage(page));
    },
    [dispatch]
  );

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setTargetPreviewLoadId(id));
    },
    [dispatch]
  );

  const handleSort = (param: typeof sortParam) => {
    if (param === sortParam) {
      dispatch(setTargetLoadPage(0));
      dispatch(setTargetSortDirection(sortDirection === "ASC" ? "DESC" : "ASC"));
    } else {
      dispatch(setTargetLoadPage(0));
      dispatch(setTargetSortDirection("ASC"));
      dispatch(setTargetSortParam(param));
    }
  };

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

    const targets: Target[] = [];
    for (let i = 0; i < loadList.length; ++i) targets.push(loadList[i]);
    for (let i = loadList.length; i < loadAmount; ++i) targets.push({});
    setRows(
      targets.map((target, idx) => (
        <TableRow
          key={`load-table-row-${idx}`}
          rowContent={[
            target.name ?? "-",
            target.oven ?? "-",
            // dateToDisplayString(target.createdAt, true),
            dateToDisplayString(target.updatedAt, true),
          ]}
          selected={target.id === targetId}
          id={target.id ?? 0}
          disabled={target.id === undefined}
          handleSelect={() => handleSelectRow(target.id ?? 0)}
          hoverEffect
        />
      ))
    );
  }, [loading, loadList, loadAmount, targetId, Rows.length, handleSelectRow]);

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
            getColumn("Four", "oven"),
            // getColumn("Créé le", "createdAt"),
            getColumn("Dernière modification", "updatedAt"),
          ]}
        />
        <tbody>{Rows}</tbody>
      </LoadTable>
      <LoadTableFooter
        pagination={<Pagination currentPage={loadPage} pageAmount={pageAmount} handleSetPage={handleSetTargetPage} small />}
        buttons={buttons}
      />
    </>
  );
};

export default TargetLoadTable;
