import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import useRecordLoadPage from "../hooks/useRecordLoadPage";
import { Record } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordLoadList } from "../_state/recordDataSlice";
import {
  selectRecordLoadAmount,
  selectRecordLoadPage,
  selectRecordPageAmount,
  setRecordLoadPage,
  selectRecordSortParam,
  selectRecordSortDirection,
  setRecordSortDirection,
  setRecordSortParam,
  selectRecordPreviewLoadId,
  setRecordPreviewLoadId,
} from "../_state/recordDisplaySlice";

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

const RecordLoadTable: FC<Props> = ({ buttons }) => {
  const dispatch = useDispatch();
  const { loading, error } = useRecordLoadPage();
  const [Rows, setRows] = useState<ReactNode[]>([]);

  const recordId = useSelector(selectRecordPreviewLoadId);
  const loadList = useSelector(selectRecordLoadList);
  const loadAmount = useSelector(selectRecordLoadAmount);
  const loadPage = useSelector(selectRecordLoadPage);
  const pageAmount = useSelector(selectRecordPageAmount);
  const sortParam = useSelector(selectRecordSortParam);
  const sortDirection = useSelector(selectRecordSortDirection);

  const handleSetPage = useCallback(
    (page: number) => {
      dispatch(setRecordLoadPage(page));
    },
    [dispatch]
  );

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setRecordPreviewLoadId(id));
    },
    [dispatch]
  );

  const handleSort = (param: typeof sortParam) => {
    if (param === sortParam) {
      dispatch(setRecordLoadPage(0));
      dispatch(setRecordSortDirection(sortDirection === "ASC" ? "DESC" : "ASC"));
    } else {
      dispatch(setRecordLoadPage(0));
      dispatch(setRecordSortDirection("ASC"));
      dispatch(setRecordSortParam(param));
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

    const records: Record[] = [];
    for (let i = 0; i < loadList.length; ++i) records.push(loadList[i]);
    for (let i = loadList.length; i < loadAmount; ++i) records.push({});
    setRows(
      records.map((record, idx) => (
        <TableRow
          key={`load-table-row-${idx}`}
          rowContent={[
            record.name ?? "-",
            record.target?.name ?? "-",
            record.oven ?? "-",
            // dateToDisplayString(record.createdAt, true),
            dateToDisplayString(record.updatedAt, true),
          ]}
          selected={record.id === recordId}
          id={record.id ?? 0}
          disabled={record.id === undefined}
          handleSelect={() => handleSelectRow(record.id ?? 0)}
          hoverEffect
        />
      ))
    );
  }, [loading, loadList, loadAmount, recordId, Rows.length, handleSelectRow]);

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
            getColumn("Courbe de Référence", "target"),
            getColumn("Four", "oven"),
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

export default RecordLoadTable;
